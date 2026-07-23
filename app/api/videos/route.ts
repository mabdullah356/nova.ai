import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const HF_ROUTER_URL = "https://router.huggingface.co/hf-inference/models/Lightricks/LTX-Video-0.9.8-13B-distilled";

async function generateWithGemini(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_KEY;
    if (!apiKey) throw new Error("GEMINI_KEY not configured");

    const ai = new GoogleGenAI({ apiKey });

    const operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        source: { prompt },
        config: { numberOfVideos: 1 },
    });

    let result = operation;
    const maxAttempts = 120;
    let attempts = 0;

    while (!result.done && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        result = await ai.operations.getVideosOperation({ operation: result });
        attempts++;
    }

    if (!result.done) throw new Error("Video generation timed out");
    if (result.error) throw new Error(result.error.message || "Video generation failed");

    const video = result.response?.generatedVideos?.[0]?.video;
    if (!video?.uri) throw new Error("No video generated");

    return video.uri;
}

async function generateWithHuggingFace(prompt: string): Promise<string> {
    const token = process.env.HF_TOKEN;
    if (!token || token === "hf_YOUR_TOKEN_HERE") {
        throw new Error("HF_TOKEN not configured. Get a free token at https://huggingface.co/settings/tokens");
    }

    const response = await fetch(HF_ROUTER_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                num_frames: 49,
                guidance_scale: 6,
                num_inference_steps: 50,
            },
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = "HuggingFace video generation failed";

        try {
            const errorJson = JSON.parse(errorText);
            errorMsg = errorJson.error || errorJson.message || errorMsg;
        } catch {
            if (errorText.includes("<!DOCTYPE")) {
                const match = errorText.match(/<h1>(\d+)<\/h1>\s*<p>(.*?)<\/p>/);
                errorMsg = match
                    ? `${match[1]}: ${match[2].replace(/<[^>]+>/g, "")}`
                    : `HuggingFace API error (${response.status})`;
            } else {
                errorMsg = errorText || errorMsg;
            }
        }

        throw new Error(errorMsg);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("video") && !contentType.includes("octet-stream")) {
        const text = await response.text();
        throw new Error(text || "Unexpected response type from HuggingFace");
    }

    const videoBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(videoBuffer).toString("base64");
    return `data:video/mp4;base64,${base64}`;
}

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
        }

        try {
            const videoUrl = await generateWithGemini(prompt);
            return NextResponse.json({ videoUrl, provider: "gemini" }, { status: 200 });
        } catch (geminiError: any) {
            console.error("Gemini failed, trying HuggingFace:", geminiError?.message);

            try {
                const videoUrl = await generateWithHuggingFace(prompt);
                return NextResponse.json({ videoUrl, provider: "huggingface" }, { status: 200 });
            } catch (hfError: any) {
                console.error("HuggingFace also failed:", hfError?.message);

                const isQuota = geminiError?.message?.includes("RESOURCE_EXHAUSTED") || geminiError?.message?.includes("quota");
                const isHfNotConfigured = hfError?.message?.includes("not configured");

                let userMessage = "Video generation is currently unavailable.";
                if (isQuota && isHfNotConfigured) {
                    userMessage = "Gemini quota exceeded. To enable video generation, add a free HuggingFace token to your .env file (HF_TOKEN). Get one at https://huggingface.co/settings/tokens";
                } else if (isQuota) {
                    userMessage = "Gemini quota exceeded. HuggingFace fallback error: " + hfError?.message;
                } else {
                    userMessage = "Both providers failed. Gemini: " + geminiError?.message;
                }

                return NextResponse.json({ message: userMessage }, { status: 503 });
            }
        }
    } catch (error: any) {
        console.error("Video generation error:", error?.message || error);
        return NextResponse.json(
            { message: error?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
