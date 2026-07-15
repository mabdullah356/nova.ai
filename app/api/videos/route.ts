import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json()

        if (!prompt) {
            return NextResponse.json({message:"Prompt is required"},{status:400})
        }

        const operation = await ai.models.generateVideos({
            model: "veo-3.1-generate-preview",
            prompt,
        });

        let result = operation;
        while (!result.done) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            result = await ai.operations.get({ operation: result });
        }

        const video = result.response?.generateVideoResponse?.generatedSamples?.[0]?.video;
        if (!video) {
            return NextResponse.json({message:"No video generated"},{status:500})
        }

        return NextResponse.json({ videoUrl: video.uri }, {status:200})

    } catch (error: any) {
        console.error("Video generation error:", error?.message || error);
        const status = error?.status === "RESOURCE_EXHAUSTED" ? 429 : 500;
        return NextResponse.json({message: error?.message || "Internal server error"},{status})   
    }
}
