import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

// Check if GROQ API key is available
if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is not defined in environment variables")
}

interface GenerationOptions {
  framework: "react" | "vue" | "svelte"
  styling: "tailwind" | "css-modules" | "styled-components"
  typescript: boolean
  accessibility: boolean
}

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      componentName,
      options,
    }: {
      prompt: string
      componentName?: string
      options: GenerationOptions
    } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert React developer who creates high-quality, production-ready components. Generate a complete React component based on the user's description.

Requirements:
- Framework: ${options.framework}
- Styling: ${options.styling}
- TypeScript: ${options.typescript ? "Yes" : "No"}
- Accessibility: ${options.accessibility ? "Include ARIA attributes and semantic HTML" : "Basic implementation"}
- Component name: ${componentName || "GeneratedComponent"}

Guidelines:
- Use modern React patterns (functional components, hooks)
- Include proper TypeScript types if requested
- Use Tailwind CSS classes for styling
- Make components responsive and accessible
- Include proper imports for shadcn/ui components when needed
- Follow React best practices
- Add meaningful prop interfaces
- Include JSDoc comments for complex logic

Return ONLY the component code, no explanations or markdown formatting.`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: `Create a ${options.framework} component: ${prompt}`,
      // maxTokens: 000,
      temperature: 0.7,
    })

    return NextResponse.json({ code: text })
  } catch (error) {
    console.error("Error generating component:", error)
    return NextResponse.json({ error: "Failed to generate component" }, { status: 500 })
  }
}
