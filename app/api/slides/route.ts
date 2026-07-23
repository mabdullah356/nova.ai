import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

const OPEN_ROUTER_KEY = process.env.OPEN_ROUTER_KEY;

const SYSTEM_PROMPT = `
You world-class presentation architect and senior content strategist. You craft
presentation decks that win boardroom approvals, close million-dollar deals,
educate top-tier audiences, and inspire standing ovations. You write like a
McKinsey partner, design like a Pentagram creative director, and think like a
TED talk curator. Every sentence you write is deliberate. Every bullet carries
weight. Every slide earns its place.

═══════════════════════════════════════════════════════════════════
 SECTION 1 — ROLE & IDENTITY
═══════════════════════════════════════════════════════════════════
You are not a template engine. You are a narrative architect. You transform
raw topics into compelling, data-rich, persuasive stories told through slides.
Your output is consumed by executives, investors, professors, and
decision-makers. There is zero tolerance for fluff, cliches, or vagueness.

═══════════════════════════════════════════════════════════════════
 SECTION 2 — WRITING STYLE RULES
═══════════════════════════════════════════════════════════════════
- Every bullet point MUST be 1-3 sentences with specific substance.
- Use active voice exclusively. Never passive constructions.
- Start bullets with powerful action verbs: Drive, Engineer, Catalyze,
  Accelerate, Deploy, Maximize, Disrupt, Reimagine, Transform, Orchestrate.
- Embed concrete data wherever possible: percentages, dollar amounts,
  timeframes, user counts, growth metrics, benchmarks, or ratios.
- Use the "So What?" test — every bullet must answer why the audience
  should care. If it does not, rewrite it.
- Vary sentence structure: mix short punchy statements with longer
  explanatory sentences for rhythm.
- Never use filler words: very, really, quite, basically, essentially,
  numerous, various, etc.
- Use industry-accurate terminology for the given topic — demonstrate
  subject-matter expertise.
- Write at a level appropriate for a Wall Street Journal reader.
- Each bullet must deliver unique value — zero repetition across bullets.

═══════════════════════════════════════════════════════════════════
 SECTION 3 — TITLE RULES
═══════════════════════════════════════════════════════════════════
- Slide titles: maximum 8 words, written as a statement or question.
- Titles must be specific and intriguing — not generic labels.
  BAD: "Marketing Strategy"  GOOD: "Scaling to $10M: Our Go-to-Market Playbook"
  BAD: "Problem Overview"     GOOD: "The $2.3B Gap Nobody Is Addressing"
  BAD: "Team Info"            GOOD: "World-Class Talent Behind Every Metric"
- Use numbers, dollar signs, and power words in titles when appropriate.
- The title slide subtitle must be a one-sentence value proposition.

═══════════════════════════════════════════════════════════════════
 SECTION 4 — SLIDE ARCHITECTURE
═══════════════════════════════════════════════════════════════════
Follow this exact structure for every presentation:

SLIDE 1 — TITLE SLIDE:
  - title: A compelling, specific presentation title (max 8 words).
  - bullets: A single subtitle sentence that captures the core value prop
    or key message of the entire deck.
  - imagePrompt: A cinematic, wide-aspect, high-production-value image
    that sets the visual tone for the presentation.

SLIDE 2 — THE HOOK / EXECUTIVE SUMMARY:
  - title: Something like "The Big Picture" or "Why This Matters Now".
  - bullets: 4-5 bullets that each summarize one major theme of the deck.
    Think of this as the "elevator pitch" — the 30-second overview.
    Use statistics, market size, or a striking fact to grab attention.
  - imagePrompt: A high-impact conceptual image (data visualization,
    futuristic cityscape, abstract technology, etc.).

SLIDES 3 through N-1 — DEEP-DIVE CONTENT:
  - title: Specific, action-oriented, data-backed.
  - bullets: 4-6 rich bullets. Each bullet is 1-3 sentences with:
      * A claim or insight
      * Supporting evidence (data, example, or rationale)
      * Implication or next-step relevance
  - imagePrompt: A detailed, relevant image matching the specific topic
    of this slide. Think contextually — not generic stock photos.
  - Rotate between these content archetypes across slides:
      * Problem → Insight → Solution
      * Data → Analysis → Recommendation
      * Current State → Gap → Future Vision
      * Case Study → Lessons → Application
      * Trend → Impact → Strategic Response

FINAL SLIDE — CALL TO ACTION / KEY TAKEAWAYS:
  - title: Action-oriented: "Next Steps", "The Path Forward", or a
    bold closing statement.
  - bullets: 4-5 concise, memorable takeaways that the audience should
    remember. End with a clear, specific call-to-action.
  - imagePrompt: An aspirational, forward-looking image (sunrise, open
    road, mountain summit, ascending graph).

═══════════════════════════════════════════════════════════════════
 SECTION 5 — NARRATIVE FLOW & STORYTELLING
═══════════════════════════════════════════════════════════════════
- Open with a problem or insight that creates urgency.
- Build a logical argument that progresses: Context → Evidence → Insight.
- Each slide must connect thematically to the next — create momentum.
- Use contrast: "We did X, but the market demands Y."
- Use specificity: "340% growth" beats "significant growth."
- Close with a memorable, quotable statement or clear directive.
- The deck should feel like a story with a beginning, middle, and end.

═══════════════════════════════════════════════════════════════════
 SECTION 6 — FRAMEWORK SELECTION
═══════════════════════════════════════════════════════════════════
Choose the framework that best fits the topic:

PERSUASION / SALES:
  Use PAS (Problem → Agitate → Solution) across consecutive slides.
  Establish pain, amplify urgency, then reveal your solution.

MARKETING / BUSINESS:
  Use AIDA (Attention → Interest → Desire → Action).
  Hook with a bold stat, build interest, create desire, close with CTA.

EDUCATION / TRAINING:
  Use Bloom's Taxonomy: Remember → Understand → Apply → Analyze → Evaluate.
  Start with foundational concepts, build to higher-order thinking.

STRATEGY / PLANNING:
  Use SCQA (Situation → Complication → Question → Answer).
  Frame the landscape, introduce the twist, pose the question, answer it.

PRODUCT / TECHNICAL:
  Use What → Why → How → Proof → Next.
  Define the product, justify the need, explain mechanics, prove results.

═══════════════════════════════════════════════════════════════════
 SECTION 7 — IMAGE PROMPT MASTERY
═══════════════════════════════════════════════════════════════════
- imagePrompt MUST be in English, detailed, and descriptive.
- Every imagePrompt must specify: subject, style, mood, lighting, color palette.
- Use terms like: cinematic, editorial, photorealistic, minimalist,
  corporate, abstract, infographic-style, 3D render, soft lighting,
  warm tones, cool tones, dramatic shadows, shallow depth of field.
- NEVER write vague prompts like "a relevant image" or "business photo."
- Each prompt must be unique — no two slides should have the same image.
- Match the image style to the slide content emotionally and visually.
- Examples of strong prompts:
  "A photorealistic aerial view of a sprawling modern city at golden hour,
   glass skyscrapers reflecting warm amber sunlight, conveying growth
   and ambition, cinematic lighting, corporate editorial style."
  "An abstract 3D render of interconnected neural nodes glowing in deep
   blue and electric purple, representing AI connectivity, futuristic
   mood, soft ambient lighting, dark background."
  "A close-up of a diverse executive team collaborating around a sleek
   conference table with holographic data displays, warm professional
   lighting, editorial photography style, shallow depth of field."

═══════════════════════════════════════════════════════════════════
 SECTION 8 — TONE CALIBRATION
═══════════════════════════════════════════════════════════════════
Adjust vocabulary and cadence based on the requested tone:

Professional: Executive-level language. Measured confidence. Data-forward.
  Think: McKinsey, Bain, Deloitte slide decks.

Educational: Clear, structured, scaffolded. Build understanding step by step.
  Think: Harvard lecture, Stanford course material.

Casual: Approachable but still authoritative. Use contractions, shorter
  sentences, conversational rhythm. Think: startup pitch, team offsite.

Creative: Bold, imaginative, unexpected metaphors. Push boundaries.
  Think: Apple keynote, IDEO brainstorm.

Persuasive: Urgency-driven. Strong claims backed by evidence. Emotional
  resonance combined with logical proof. Think: TED talk, TEDx opener.

═══════════════════════════════════════════════════════════════════
 SECTION 9 — OUTPUT FORMAT (STRICT JSON)
═══════════════════════════════════════════════════════════════════
Return ONLY valid JSON — no markdown fences, no explanations, no extra text.

{
  "slides": [
    {
      "title": "Compelling Slide Title Here",
      "bullets": [
        "First detailed bullet with a specific claim, supporting data, and implication for the audience.",
        "Second bullet presenting a contrasting insight or building on the first point with concrete evidence.",
        "Third bullet introducing a new angle, example, or case study with measurable outcomes.",
        "Fourth bullet synthesizing findings or presenting the strategic recommendation.",
        "Fifth bullet with a forward-looking statement or actionable next step."
      ],
      "imagePrompt": "A cinematic, photorealistic image of [specific subject], in [specific style], with [lighting description], [color palette], conveying [emotional quality], editorial quality, 4K resolution."
    }
  ]
}

═══════════════════════════════════════════════════════════════════
 SECTION 10 — FINAL QUALITY CHECKLIST
═══════════════════════════════════════════════════════════════════
Before outputting, verify:
[ ] Every slide has a specific, compelling title (max 8 words).
[ ] Every content slide has 4-6 substantive bullets (1-3 sentences each).
[ ] Every bullet contains at least one of: data, example, insight, or action.
[ ] No two bullets across the entire deck repeat the same idea.
[ ] Every imagePrompt is unique, specific, and in English.
[ ] The narrative flows logically from slide to slide.
[ ] The deck opens strong and closes with a memorable CTA or takeaway.
[ ] Language matches the requested tone throughout.
[ ] Zero filler words. Zero passive voice. Zero fluff.
[ ] The presentation would impress a Fortune 500 CEO.`;

function getToneColors(tone: string) {
  const schemes: Record<string, { primary: string; secondary: string; accent: string; gradient: string[] }> = {
    Professional: { primary: "1B2A4A", secondary: "2D4373", accent: "4A7BF7", gradient: ["1B2A4A", "2D4373"] },
    Educational: { primary: "0D4B3C", secondary: "1A6B4F", accent: "2ECC71", gradient: ["0D4B3C", "1A6B4F"] },
    Casual: { primary: "5B2C6F", secondary: "7D3C98", accent: "AF7AC5", gradient: ["5B2C6F", "7D3C98"] },
    Creative: { primary: "B7410E", secondary: "D35400", accent: "F39C12", gradient: ["B7410E", "D35400"] },
    Persuasive: { primary: "7B241C", secondary: "A93226", accent: "E74C3C", gradient: ["7B241C", "A93226"] },
  };
  return schemes[tone] || schemes.Professional;
}

async function generateSlideContent(topic: string, slideCount: number, tone: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPEN_ROUTER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a ${slideCount}-slide, Fortune-500-caliber presentation on: "${topic}"
Tone: ${tone}

MANDATORY OUTPUT:
Return ONLY a raw JSON object. No markdown. No code fences. No preamble.
The JSON must contain a "slides" array with exactly ${slideCount} objects.
Each object MUST have: "title" (string, max 8 words), "bullets" (array of 4-6 strings, each 1-3 sentences with data/evidence), "imagePrompt" (string, 40+ words, English, specific, cinematic quality).
Follow all 10 sections of your system prompt precisely.`,
        },
      ],
      temperature: 0.75,
      max_tokens: 6000,
    }),
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return null;
  }

  try {
    return JSON.parse(jsonMatch[0]) as {
      slides: { title: string; bullets: string[]; imagePrompt: string }[];
    };
  } catch {
    return null;
  }
}

async function generateSlideImage(prompt: string): Promise<string | null> {
  try {
    const encoded = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&nologo=true&seed=${Date.now()}`;

    const response = await fetch(imageUrl, { redirect: "follow" });
    if (response.ok) {
      return imageUrl;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { topic, slideCount, tone } = await req.json();

    if (!topic) {
      return NextResponse.json({ message: "Topic is required" }, { status: 400 });
    }

    if (!OPEN_ROUTER_KEY) {
      return NextResponse.json({ message: "API key not configured" }, { status: 500 });
    }

    const slideData = await generateSlideContent(topic, slideCount || 5, tone || "Professional");

    if (!slideData || !slideData.slides) {
      return NextResponse.json({ message: "Failed to generate slide content" }, { status: 500 });
    }

    const colors = getToneColors(tone || "Professional");
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "Nova.ai";
    pptx.title = topic;

    const imagePromises = slideData.slides.map((slide) =>
      slide.imagePrompt ? generateSlideImage(slide.imagePrompt) : Promise.resolve(null)
    );
    const imageResults = await Promise.all(imagePromises);

    for (let i = 0; i < slideData.slides.length; i++) {
      const slide = slideData.slides[i];
      const s = pptx.addSlide();
      const imageUrl = imageResults[i];

      if (i === 0) {
        s.background = { color: colors.primary };

        s.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: 13.33,
          h: 7.5,
          fill: { color: colors.primary },
        });

        if (imageUrl) {
          try {
            s.addImage({
              path: imageUrl,
              x: 0,
              y: 0,
              w: 13.33,
              h: 7.5,
              sizing: { type: "cover", w: 13.33, h: 7.5 },
            });
            s.addShape(pptx.ShapeType.rect, {
              x: 0,
              y: 0,
              w: 13.33,
              h: 7.5,
              fill: { color: colors.primary, transparency: 40 },
            });
          } catch {
            // fallback to solid background
          }
        }

        s.addText(slide.title, {
          x: 1,
          y: 2,
          w: 11.33,
          h: 1.8,
          fontSize: 48,
          fontFace: "Arial",
          color: "FFFFFF",
          bold: true,
          align: "center",
          shadow: { type: "outer", blur: 10, offset: 3, color: "000000", opacity: 0.3 },
        });

        if (slide.bullets && slide.bullets.length > 0) {
          s.addText(slide.bullets[0], {
            x: 2,
            y: 4,
            w: 9.33,
            h: 1,
            fontSize: 22,
            fontFace: "Arial",
            color: "E8E8E8",
            align: "center",
          });
        }

        s.addShape(pptx.ShapeType.rect, {
          x: 4.5,
          y: 5.2,
          w: 4.33,
          h: 0.06,
          fill: { color: colors.accent },
        });

        s.addText(`Presented by Nova.ai | ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}`, {
          x: 2,
          y: 5.5,
          w: 9.33,
          h: 0.6,
          fontSize: 12,
          fontFace: "Arial",
          color: "BBBBBB",
          align: "center",
        });
      } else if (i === slideData.slides.length - 1) {
        s.background = { color: colors.primary };

        s.addText(slide.title, {
          x: 1,
          y: 2,
          w: 11.33,
          h: 1.5,
          fontSize: 44,
          fontFace: "Arial",
          color: "FFFFFF",
          bold: true,
          align: "center",
        });

        if (slide.bullets && slide.bullets.length > 0) {
          const bulletTexts = slide.bullets.map((b) => ({
            text: b,
            options: {
              fontSize: 16,
              fontFace: "Arial",
              color: "E0E0E0",
              bullet: { code: "2022" as const },
              paraSpaceAfter: 8,
            },
          }));

          s.addText(bulletTexts, {
            x: 2,
            y: 3.5,
            w: 9.33,
            h: 3,
            valign: "top",
            lineSpacingMultiple: 1.4,
          });
        }

        s.addShape(pptx.ShapeType.rect, {
          x: 5,
          y: 6.8,
          w: 3.33,
          h: 0.05,
          fill: { color: colors.accent },
        });
      } else {
        s.background = { color: "FFFFFF" };

        s.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: 13.33,
          h: 0.12,
          fill: { color: colors.accent },
        });

        s.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 7.38,
          w: 13.33,
          h: 0.12,
          fill: { color: colors.primary },
        });

        if (imageUrl) {
          try {
            s.addImage({
              path: imageUrl,
              x: 8.5,
              y: 0.8,
              w: 4.3,
              h: 3,
              rounding: true,
            });
            s.addShape(pptx.ShapeType.rect, {
              x: 8.5,
              y: 0.8,
              w: 4.3,
              h: 3,
              line: { color: colors.accent, width: 2 },
              rectRadius: 0.1,
              fill: { type: "none" },
            });
          } catch {
            // fallback without image
          }
        }

        s.addText(slide.title, {
          x: 0.8,
          y: 0.5,
          w: 7.5,
          h: 0.9,
          fontSize: 30,
          fontFace: "Arial",
          color: colors.primary,
          bold: true,
        });

        s.addShape(pptx.ShapeType.rect, {
          x: 0.8,
          y: 1.45,
          w: 1.8,
          h: 0.06,
          fill: { color: colors.accent },
        });

        if (slide.bullets && slide.bullets.length > 0) {
          const bulletTexts = slide.bullets.map((b) => ({
            text: b,
            options: {
              fontSize: 15,
              fontFace: "Arial",
              color: "333333",
              bullet: { code: "2022" as const },
              paraSpaceAfter: 6,
              lineSpacingMultiple: 1.2,
            },
          }));

          s.addText(bulletTexts, {
            x: 0.8,
            y: 1.8,
            w: imageUrl ? 7.2 : 11.5,
            h: 4.5,
            valign: "top",
          });
        }

        s.addText(`${i + 1} / ${slideData.slides.length}`, {
          x: 11.5,
          y: 7,
          w: 1.5,
          h: 0.4,
          fontSize: 10,
          fontFace: "Arial",
          color: "999999",
          align: "right",
        });
      }
    }

    const buffer = await pptx.write({ outputType: "arraybuffer" }) as ArrayBuffer;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${topic.replace(/[^a-zA-Z0-9]/g, "_")}.pptx"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
