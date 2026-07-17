import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {otp , email} = await req.json();
    
    if(!otp){
        return NextResponse.json({message:"Invalid Otp"},{status:400})
    }

    if(!email){
        return NextResponse.json({message:"user email is required"},{status:400})
    };

    try {
        
        const user = await prisma.user.findUnique({where:{email}})

        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        };

        if(user.isVerified){
        return NextResponse.json({message:"user already verified"},{status:200})
    };

        
        if(user.otp !== Number(otp) || (user.optExp && user.optExp < new Date())){
            return NextResponse.json({message:"Invalid or expired OTP"},{status:400})
        };

        const userUpdate = await prisma.user.update({
      where: { email },
      data: {isVerified:true },
    });

    if(!userUpdate){
        return NextResponse.json({message:"Error occur while Otp verification"},{status:400})
    };

    return NextResponse.json({message:"User Verified Successfully"},{status:200})

    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}
