# nova.ai

A full-stack AI-powered multi-tool platform built with Next.js 16, React 19, and TypeScript. Nova provides a unified interface for AI chat, code generation, image creation, video generation, and presentation slide decks.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [API Routes](#api-routes)
- [Architecture](#architecture)
  - [Route Groups](#route-groups)
  - [AI Integration](#ai-integration)
  - [Slides Engine](#slides-engine)
- [Security](#security)
- [Build and Deployment](#build-and-deployment)
- [Linting](#linting)

---

## Features

**AI Chat** -- General-purpose conversational AI assistant. Sends conversation history for multi-turn context. Responses include markdown code block rendering with syntax highlighting.

**AI Code Assistant** -- Specialized coding assistant that returns structured responses with a summary section and a syntax-highlighted code block. Includes one-click copy to clipboard.

**AI Image Generation** -- Generates images from text prompts with support for five aspect ratios: 1:1, 16:9, 9:16, 4:3, and 3:4. Displays a loading state matched to the selected ratio dimensions before revealing the generated image.

**AI Video Generation** -- Generates video clips from text descriptions using Google's Veo 3.1 model. Polls for completion and renders the result in an inline video player.

**AI Slides Generation** -- Generates complete PowerPoint presentations (PPTX) from a topic description. Configurable slide count (5, 7, or 9) and tone (Professional, Educational, Casual, Creative, Persuasive). Each slide includes AI-written content and a uniquely generated image. Downloads as a ready-to-use PPTX file.

**Responsive Dashboard** -- Collapsible sidebar navigation on desktop, full-screen slide-out drawer on mobile. Active route highlighting.

**Landing and Auth Pages** -- Public landing page with header navigation. Login and signup pages with split-screen layout (form + illustration).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| HTTP Client | Axios |
| Code Highlighting | react-syntax-highlighter (Prism) |
| Presentation Generation | PptxGenJS |
| AI (Chat/Code/Slides Content) | OpenRouter API (Tencent HY3) |
| AI (Image Generation) | Pollinations.ai |
| AI (Video Generation) | Google Gemini API (Veo 3.1) |
| Package Manager | npm or Bun |

---

## Project Structure

```
nova.ai/
├── app/
│   ├── layout.tsx                 Root layout (Geist fonts, metadata)
│   ├── globals.css                Global styles (Tailwind import)
│   ├── favicon.ico
│   ├── (root)/                    Public route group
│   │   ├── layout.tsx             Public layout with Header
│   │   ├── home/page.tsx          Landing page
│   │   ├── login/page.tsx         Login page
│   │   └── signup/page.tsx        Signup page
│   ├── (dashboard)/               Authenticated route group
│   │   ├── layout.tsx             Dashboard shell with sidebar
│   │   ├── page.tsx               Dashboard root
│   │   ├── chat/page.tsx          AI Chat interface
│   │   ├── code/page.tsx          AI Code assistant
│   │   ├── image-generation/      AI Image generation
│   │   ├── video-generation/      AI Video generation
│   │   └── slides/page.tsx        AI Slides generation
│   └── api/                       Server-side API routes
│       ├── chat/route.ts          Chat completions
│       ├── code/route.ts          Code completions
│       ├── images/route.ts        Image URL generation
│       ├── slides/route.ts        PPTX file generation
│       └── videos/route.ts        Video generation
├── components/
│   └── Header.tsx                 Public header with nav
├── public/                        Static assets
├── next.config.ts                 Next.js config (images, headers)
├── tsconfig.json                  TypeScript config
├── postcss.config.mjs             PostCSS config (Tailwind)
├── eslint.config.mjs              ESLint config
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or Bun

### Installation

```bash
git clone https://github.com/your-username/nova.ai.git
cd nova.ai
npm install
```

Or with Bun:

```bash
bun install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
OPEN_ROUTER_KEY=your_openrouter_api_key
GEMINI_KEY=your_google_gemini_api_key
```

**OPEN_ROUTER_KEY** -- Required for chat, code, and slides features. Obtain a key from [OpenRouter](https://openrouter.ai/).

**GEMINI_KEY** -- Required for video generation. Obtain a key from [Google AI Studio](https://aistudio.google.com/).

Image generation (Pollinations.ai) does not require an API key.

### Running the Development Server

```bash
npm run dev
```

Or with Bun:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes

All API routes accept POST requests and return JSON responses unless otherwise noted.

### POST /api/chat

Conversational AI chat endpoint.

**Request body:**

```json
{
  "messages": [
    { "role": "user", "content": "What is Next.js?" }
  ]
}
```

**Response:**

```json
{
  "reply": "Next.js is a React framework for production..."
}
```

### POST /api/code

Code generation endpoint. Returns a response structured for the code assistant UI.

**Request body:**

```json
{
  "messages": [
    { "role": "user", "content": "Write a React hook for debouncing" }
  ]
}
```

**Response:**

```json
{
  "reply": "Summary: A custom hook that delays...\n\n```typescript\nimport { useState, useEffect }..."
}
```

### POST /api/images

Returns a Pollinations.ai image URL for the given prompt and aspect ratio.

**Request body:**

```json
{
  "prompt": "A sunset over mountains",
  "ratio": "16:9"
}
```

**Supported ratios:** `1:1`, `16:9`, `9:16`, `4:3`, `3:4`

**Response:**

```json
{
  "imageUrl": "https://image.pollinations.ai/prompt/..."
}
```

### POST /api/slides

Generates and returns a PPTX file as a binary download.

**Request body:**

```json
{
  "topic": "Quarterly Business Review",
  "slideCount": 7,
  "tone": "Professional"
}
```

**Supported tones:** `Professional`, `Educational`, `Casual`, `Creative`, `Persuasive`

**Response:** Binary PPTX file with content type `application/vnd.openxmlformats-officedocument.presentationml.presentation`.

### POST /api/videos

Generates a video using Google Gemini Veo 3.1. This is a long-polling endpoint that waits for video generation to complete.

**Request body:**

```json
{
  "prompt": "A drone shot of a coastal city at golden hour"
}
```

**Response:**

```json
{
  "videoUrl": "https://..."
}
```

---

## Architecture

### Route Groups

The app uses Next.js route groups to separate public and dashboard routes:

- **(root)** -- Public pages (home, login, signup). Uses the `Header` component with navigation links and a "Get Started" CTA.
- **(dashboard)** -- Application pages (chat, code, images, videos, slides). Uses a sidebar layout with responsive mobile drawer.

### AI Integration

The project integrates with three external AI services:

- **OpenRouter** (`tencent/hy3:free` model) -- Powers chat, code, and slides content generation. Each endpoint uses a tailored system prompt to produce output in the expected format.
- **Pollinations.ai** -- Generates images from text prompts. Used directly in the `/api/images` route and within the slides engine for slide background images.
- **Google Gemini API** (Veo 3.1) -- Generates video clips. The API route polls the operation status until completion before returning the video URL.

### Slides Engine

The slides API (`/api/slides`) is the most complex endpoint. It:

1. Sends the topic and configuration to OpenRouter with a detailed system prompt that outputs structured JSON (title, bullets, imagePrompt per slide).
2. Generates a unique image for each slide using Pollinations.ai in parallel.
3. Builds a complete PPTX file using PptxGenJS with tone-specific color schemes, typography, and layout variations for title, content, and closing slides.
4. Returns the binary PPTX file as a downloadable attachment.

---

## Security

The application includes the following security headers configured in `next.config.ts`:

| Header | Value |
|--------|-------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(self), microphone=(self), geolocation=(self) |

API keys are stored in environment variables and accessed only on the server side through Next.js API routes. They are never exposed to the client.

---

## Build and Deployment

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Deploy to Vercel

The project is compatible with Vercel deployment out of the box. Push to a Vercel-connected repository or run:

```bash
npx vercel
```

Ensure environment variables are configured in the Vercel dashboard before deploying.

---

## Linting

```bash
npm run lint
```

The project uses ESLint with `eslint-config-next` (core web vitals + TypeScript rules).
