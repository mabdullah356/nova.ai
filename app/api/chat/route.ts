import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const OPEN_ROUTER_KEY = process.env.OPEN_ROUTER_KEY

    if(!OPEN_ROUTER_KEY){
        return NextResponse.json({message:"OPEN AI KEY not found"},{status:401})
    }

    try {
        const { messages } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({message:"Messages array is required"},{status:400})
        }

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPEN_ROUTER_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "tencent/hy3:free",
                messages: [
                    {
                        role: "system",
                        content: "You are Nova, a helpful AI assistant. If the user asks you to write code, generate an image, generate a video, or anything related to coding, image generation, or video generation, respond with: 'I'm sorry, but I'm not able to help with that. Is there something else I can assist you with?' and nothing else.",
                    },
                    ...messages,
                ],
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({message: data.error?.message || "OpenRouter API error"},{status: res.status})
        }

        const reply = data.choices?.[0]?.message?.content || "No response"

        return NextResponse.json({ reply }, {status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}
