"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  MessageSquareCode,
  Code2,
  ImageIcon,
  Video,
  Presentation,
  ArrowRight,
  Zap,
  Globe,
  Star,
  ChevronRight,
  Brain,
  Cpu,
  Layers,
} from "lucide-react";
import { BorderBeam } from "@/components/magic/BorderBeam";
import { Marquee } from "@/components/magic/Marquee";
import { SparklesText } from "@/components/magic/SparklesText";
import { Particles } from "@/components/magic/Particles";
import { BlurText } from "@/components/magic/BlurText";
import { GlareCard } from "@/components/magic/GlareCard";
import { MagneticButton } from "@/components/magic/MagneticButton";
import { Orb } from "@/components/magic/Orb";
import { SnakeCursor } from "@/components/magic/SnakeCursor";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease },
  }),
};

const features = [
  {
    icon: MessageSquareCode,
    title: "AI Chat",
    desc: "Natural conversations powered by advanced language models.",
  },
  {
    icon: Code2,
    title: "Code Generation",
    desc: "Write, debug, and understand code across any language.",
  },
  {
    icon: ImageIcon,
    title: "Image Creation",
    desc: "Generate stunning visuals from text descriptions.",
  },
  {
    icon: Video,
    title: "Video Generation",
    desc: "Create short videos from prompts with AI models.",
  },
  {
    icon: Presentation,
    title: "Slide Decks",
    desc: "Auto-generate professional presentations instantly.",
  },
];

const marqueeItems = [
  "AI Chat",
  "Code Generation",
  "Image Creation",
  "Video Synthesis",
  "Slide Decks",
  "Free to Use",
  "No Credit Card",
  "Instant Results",
];

const stats = [
  { value: "5+", label: "AI Tools" },
  { value: "100%", label: "Free to Start" },
  { value: "<2s", label: "Response Time" },
  { value: "24/7", label: "Availability" },
];

const steps = [
  {
    step: "01",
    icon: Zap,
    title: "Create your account",
    desc: "Sign up with your email. No credit card required.",
  },
  {
    step: "02",
    icon: Globe,
    title: "Choose a tool",
    desc: "Pick from chat, code, images, video, or slides.",
  },
  {
    step: "03",
    icon: Star,
    title: "Create & export",
    desc: "Generate content and download your results.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <SnakeCursor color="#dc2626" width={4} length={35} speed={0.2} />
      <section className="relative min-h-screen flex items-center justify-center">
        <Orb />
        <Particles count={30} color="#581c87" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-32 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-800/20 bg-purple-900/5 px-4 py-1.5 text-sm font-medium text-purple-800 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-600" />
              </span>
              Now powered by advanced AI models
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
            >
              The future of
              <br />
              <span className="relative inline-block">
                <span className="text-purple-800">
                  <SparklesText text="creation" />
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-purple-800"
                />
              </span>
              {" "}starts here
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-500"
            >
              One platform. Five AI tools. Chat, write code, generate images,
              create videos, and design presentations — all free to start.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <MagneticButton strength={0.2}>
                <Link
                  href="/signup"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-purple-800 px-9 text-sm font-semibold text-white shadow-2xl shadow-purple-800/25 transition-all hover:bg-purple-900 hover:shadow-purple-800/40"
                >
                  Start Creating Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="#features"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-gray-200 bg-white px-9 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                >
                  Explore Features
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400"
            >
              {[
                { icon: Brain, text: "Advanced AI" },
                { icon: Cpu, text: "Lightning Fast" },
                { icon: Layers, text: "All-in-One" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-purple-600" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mx-auto mt-24 max-w-5xl"
          >
            <BorderBeam className="rounded-2xl" duration={6} glowSize={50}>
              <GlareCard className="rounded-2xl">
                <div className="overflow-hidden rounded-2xl bg-white">
                  <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <div className="ml-4 h-2.5 w-40 rounded-full bg-gray-100" />
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-gray-100">
                    {[
                      { icon: MessageSquareCode, label: "Chat" },
                      { icon: Code2, label: "Code" },
                      { icon: ImageIcon, label: "Images" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={6 + i}
                        className="flex flex-col items-center gap-4 p-10"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-800 text-white shadow-lg shadow-purple-800/20">
                          <item.icon className="h-7 w-7" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlareCard>
            </BorderBeam>
          </motion.div>
        </div>
      </section>

      <section className="py-6 border-y border-gray-100">
        <Marquee items={marqueeItems} speed={22} />
      </section>

      <section id="features" className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-800">
              Features
            </p>
            <BlurText
              text="Everything you need"
              className="mt-4 block text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            />
            <p className="mt-5 text-lg text-gray-500">
              Five powerful AI tools, one seamless experience.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={scaleIn}
                custom={i}
              >
                <BorderBeam className="h-full rounded-2xl" duration={5 + i} glowSize={30}>
                  <GlareCard className="h-full rounded-2xl">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="relative h-full rounded-2xl bg-white p-8"
                    >
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-800 text-white shadow-md shadow-purple-800/15">
                        <f.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
                      <ChevronRight className="absolute right-6 top-8 h-4 w-4 text-gray-300 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </motion.div>
                  </GlareCard>
                </BorderBeam>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-800 sm:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm text-gray-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-800">
              How it works
            </p>
            <BlurText
              text="Up and running in seconds"
              className="mt-4 block text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            />
          </motion.div>

          <div className="mx-auto mt-20 grid max-w-4xl gap-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-800 text-white shadow-xl shadow-purple-800/25"
                >
                  <s.icon className="h-7 w-7" />
                </motion.div>
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-purple-400">
                  Step {s.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            custom={0}
          >
            <BorderBeam className="rounded-3xl" duration={5} glowSize={60}>
              <div className="rounded-3xl bg-purple-800 px-8 py-20 text-center sm:px-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  Ready to build?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mx-auto mt-5 max-w-md text-purple-200"
                >
                  Join nova.ai and unlock the full power of artificial intelligence.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <MagneticButton strength={0.15}>
                    <Link
                      href="/signup"
                      className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-white px-9 text-sm font-semibold text-purple-800 shadow-xl transition-all hover:bg-gray-100"
                    >
                      Start for Free
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={0.15}>
                    <Link
                      href="/login"
                      className="inline-flex h-14 items-center gap-2 rounded-full border border-purple-400/50 px-9 text-sm font-semibold text-white transition-all hover:bg-purple-700/50"
                    >
                      Sign In
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>
            </BorderBeam>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Sparkles className="h-4 w-4 text-purple-800" />
            nova.ai
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} nova.ai
          </p>
        </div>
      </footer>
    </div>
  );
}
