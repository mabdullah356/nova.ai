import { NextResponse } from "next/server";

const ratioMap: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "16:9": { width: 1024, height: 576 },
    "9:16": { width: 576, height: 1024 },
    "4:3": { width: 1024, height: 768 },
    "3:4": { width: 768, height: 1024 },
};

export async function POST(req: Request) {
    try {
        const { prompt, ratio } = await req.json()

        if (!prompt) {
            return NextResponse.json({message:"Prompt is required"},{status:400})
        }

        const dimensions = ratioMap[ratio] || ratioMap["1:1"]
        const encoded = encodeURIComponent(prompt)
        const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${dimensions.width}&height=${dimensions.height}&nologo=true`

        return NextResponse.json({ imageUrl }, {status:200})

    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Internal server error"},{status:500})   
    }
}
