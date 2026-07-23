import React from "react";
import { OTPSendTemplate } from "../../../components/email-template/OTPSend";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const OTP_EXPIRY_MINUTES = 5;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp: Number(otp), optExp: expiresAt },
    });

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "nova.ai <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email - nova.ai",
      react: React.createElement(OTPSendTemplate, { name: user.name, otp, expiryMinutes: OTP_EXPIRY_MINUTES }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
