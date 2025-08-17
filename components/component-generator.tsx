"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SparklesIcon,
  CopyIcon,
  PlayIcon,
  SettingsIcon,
  RefreshCwIcon,
  DownloadIcon,
  ShareIcon,
  FolderIcon,
} from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { ComponentPreview } from "@/components/component-preview"

interface GenerationOptions {
  framework: "react" | "vue" | "svelte"
  styling: "tailwind" | "css-modules" | "styled-components"
  typescript: boolean
  accessibility: boolean
}

interface ComponentCategory {
  name: string
  icon: string
  examples: string[]
}

export function ComponentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [componentName, setComponentName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    framework: "react",
    styling: "tailwind",
    typescript: true,
    accessibility: true,
  })

  const componentCategories: ComponentCategory[] = [
    {
      name: "Navigation",
      icon: "🧭",
      examples: [
        "Create a responsive navbar with dropdown menus and mobile hamburger",
        "Build a sidebar navigation with collapsible sections",
        "Design a breadcrumb navigation with custom separators",
        "Generate a tab navigation with active state indicators",
      ],
    },
    {
      name: "Forms",
      icon: "📝",
      examples: [
        "Create a contact form with validation and success states",
        "Build a multi-step form wizard with progress indicator",
        "Design a login form with social authentication options",
        "Generate a search form with autocomplete suggestions",
      ],
    },
    {
      name: "Cards",
      icon: "🃏",
      examples: [
        "Create a pricing card with gradient background and hover animation",
        "Build a product card with image, rating, and add to cart button",
        "Design a profile card with avatar and social links",
        "Generate a feature card with icon and description",
      ],
    },
    {
      name: "Buttons",
      icon: "🔘",
      examples: [
        "Create a primary button with loading state and icon",
        "Build a floating action button with ripple effect",
        "Design a button group with active state",
        "Generate a toggle button with on/off states",
      ],
    },
    {
      name: "Data Display",
      icon: "📊",
      examples: [
        "Create a data table with sorting and pagination",
        "Build a statistics dashboard with charts",
        "Design a timeline component with events",
        "Generate a testimonial carousel with auto-play",
      ],
    },
    {
      name: "Layout",
      icon: "📐",
      examples: [
        "Create a hero section with background image and CTA",
        "Build a footer with multiple columns and links",
        "Design a grid layout for image gallery",
        "Generate a split-screen layout with content sections",
      ],
    },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          componentName,
          options: generationOptions,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate component")
      }

      const { code } = await response.json()
      setGeneratedCode(code)
    } catch (error) {
      console.error("Generation error:", error)
      // Fallback to sample code on error
      const sampleCode = `// Error generating component. Please try again.
// Generated ${componentName || "Component"} based on: "${prompt}"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const ${componentName || "GeneratedComponent"} = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generated Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This is a fallback component. Please try generating again.
        </p>
        <Button className="w-full">
          Primary Action
        </Button>
      </CardContent>
    </Card>
  )
}`
      setGeneratedCode(sampleCode)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const handleRefine = () => {
    if (generatedCode) {
      setPrompt(`Refine this component: ${prompt}`)
      handleGenerate()
    }
  }

  const handleSaveComponent = () => {
    if (!generatedCode || !componentName) return

    const savedComponent = {
      id: Date.now().toString(),
      name: componentName,
      description: prompt,
      code: generatedCode,
      category: selectedCategory || "Uncategorized",
      tags: extractTagsFromPrompt(prompt),
      createdAt: new Date().toISOString(),
      framework: generationOptions.framework,
      styling: generationOptions.styling,
    }

    const existing = JSON.parse(localStorage.getItem("savedComponents") || "[]")
    const updated = [...existing, savedComponent]
    localStorage.setItem("savedComponents", JSON.stringify(updated))

    // Show success feedback (you could add a toast here)
    console.log("Component saved to library!")
  }

  const extractTagsFromPrompt = (prompt: string): string[] => {
    const commonTags = [
      "button",
      "card",
      "form",
      "navigation",
      "layout",
      "input",
      "modal",
      "table",
      "chart",
      "animation",
    ]
    return commonTags.filter((tag) => prompt.toLowerCase().includes(tag))
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Input Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-primary" />
                Describe Your Component
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="component-name">Component Name (optional)</Label>
                <Input
                  id="component-name"
                  placeholder="e.g., PricingCard, ContactForm"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt">Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., Create a pricing card with gradient background and hover animation..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{prompt.length}/500 characters</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleRefine} disabled={!generatedCode}>
                    <RefreshCwIcon className="w-4 h-4 mr-2" />
                    Refine
                  </Button>
                  <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="min-w-[120px]">
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Framework</Label>
              <Select
                value={generationOptions.framework}
                onValueChange={(value: any) => setGenerationOptions((prev) => ({ ...prev, framework: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue (Coming Soon)</SelectItem>
                  <SelectItem value="svelte">Svelte (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Styling</Label>
              <Select
                value={generationOptions.styling}
                onValueChange={(value: any) => setGenerationOptions((prev) => ({ ...prev, styling: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                  <SelectItem value="css-modules">CSS Modules</SelectItem>
                  <SelectItem value="styled-components">Styled Components</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="typescript"
                checked={generationOptions.typescript}
                onChange={(e) => setGenerationOptions((prev) => ({ ...prev, typescript: e.target.checked }))}
                className="rounded border-border"
              />
              <Label htmlFor="typescript">TypeScript</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="accessibility"
                checked={generationOptions.accessibility}
                onChange={(e) => setGenerationOptions((prev) => ({ ...prev, accessibility: e.target.checked }))}
                className="rounded border-border"
              />
              <Label htmlFor="accessibility">Accessibility</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {componentCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            ))}
          </div>

          {selectedCategory && (
            <div className="mt-6">
              <Separator className="mb-4" />
              <h4 className="font-medium mb-3">{selectedCategory} Examples</h4>
              <div className="grid gap-2">
                {componentCategories
                  .find((cat) => cat.name === selectedCategory)
                  ?.examples.map((example, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80 justify-start p-2 h-auto text-left"
                      onClick={() => setPrompt(example)}
                    >
                      {example}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Output Section */}
      {generatedCode && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Output with Enhanced Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Code</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyCode}>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveComponent} disabled={!componentName}>
                    <FolderIcon className="w-4 h-4 mr-2" />
                    Save to Library
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="mt-4">
                  <CodeEditor code={generatedCode} language="typescript" />
                </TabsContent>
                <TabsContent value="usage" className="mt-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">How to use this component:</h4>
                    <pre className="text-sm text-muted-foreground">
                      {`import { ${componentName || "GeneratedComponent"} } from './components/${componentName || "GeneratedComponent"}'

export default function App() {
  return (
    <div>
      <${componentName || "GeneratedComponent"} />
    </div>
  )
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ComponentPreview code={generatedCode} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
