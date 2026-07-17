import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "nova.ai — AI-Powered Chat, Code, Images, Video & Slides",
    template: "%s | nova.ai",
  },
  description:
    "One platform for AI-powered chat, code generation, image creation, video synthesis, and presentation design. Free to start, no credit card required.",
  keywords: ["AI", "chat", "code generation", "image generation", "video generation", "slides", "nova.ai"],
  openGraph: {
    title: "nova.ai — AI-Powered Chat, Code, Images, Video & Slides",
    description:
      "One platform for AI-powered chat, code generation, image creation, video synthesis, and presentation design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
