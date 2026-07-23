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
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: "You are Nova, an expert coding assistant. When the user asks for code, respond in EXACTLY this two-part format:\n\nPart 1 - Write a brief summary (2-3 lines) explaining what the code does.\n\nPart 2 - Write ONLY the code inside a code block. No extra explanations after the code.\n\nSTRICT FORMAT:\nSummary: <brief explanation>\n\n```<language>\n<code only>\n```\n\nDo NOT add greetings, extra text, or anything after the code block.",
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
