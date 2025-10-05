"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, CopyIcon } from "lucide-react"
import { copyToClipboard } from "@/lib/utils/code-actions"
import { useToast } from "@/components/ui/use-toast"

const examples = [
  {
    id: 1,
    title: "Hero Section",
    description: "Modern hero section with gradient background and call-to-action buttons",
    category: "Landing Page",
    tags: ["hero", "gradient", "buttons"],
    prompt: "Create a modern hero section with a gradient background, large heading, subtitle, and two buttons",
    complexity: "Simple",
  },
  {
    id: 2,
    title: "Pricing Cards",
    description: "Responsive pricing cards with features list and popular badge",
    category: "E-commerce",
    tags: ["pricing", "cards", "responsive"],
    prompt: "Design pricing cards with three tiers, feature lists, and a popular plan highlight",
    complexity: "Medium",
  },
  {
    id: 3,
    title: "Dashboard Stats",
    description: "Statistics cards with icons, numbers, and trend indicators",
    category: "Dashboard",
    tags: ["stats", "cards", "metrics"],
    prompt: "Create dashboard statistics cards showing key metrics with icons and percentage changes",
    complexity: "Medium",
  },
  {
    id: 4,
    title: "Contact Form",
    description: "Clean contact form with validation and modern styling",
    category: "Forms",
    tags: ["form", "contact", "validation"],
    prompt: "Build a contact form with name, email, message fields and submit button",
    complexity: "Simple",
  },
  {
    id: 5,
    title: "Feature Grid",
    description: "Grid layout showcasing product features with icons and descriptions",
    category: "Marketing",
    tags: ["features", "grid", "icons"],
    prompt: "Design a features grid with 6 items, each having an icon, title, and description",
    complexity: "Simple",
  },
  {
    id: 6,
    title: "Data Table",
    description: "Advanced data table with sorting, filtering, and pagination",
    category: "Dashboard",
    tags: ["table", "data", "pagination"],
    prompt: "Create a data table with sortable columns, search filter, and pagination controls",
    complexity: "Complex",
  },
]

const categories = ["All", "Landing Page", "E-commerce", "Dashboard", "Forms", "Marketing"]

export default function ExamplesPage() {
  const { toast } = useToast()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text animate-fadeIn" style={{animationDelay: '0.2s'}}>Component Examples</span>
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-grid-white/10 opacity-20 animate-pulse-slow"></div>
            </h1>
            <p className="text-lg text-muted-foreground animate-fadeIn" style={{animationDelay: '0.4s'}}>
              Explore pre-built component examples and prompts to inspire your next creation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            {categories.map((category, index) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                style={{animationDelay: `${0.7 + index * 0.1}s`}}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <Card 
                key={example.id} 
                className="animate-shadow-pulse hover:shadow-lg transition-all duration-300 py-4 hover:-translate-y-1 animate-fadeIn"
                style={{animationDelay: `${0.8 + index * 0.15}s`}}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        example.complexity === "Simple"
                          ? "default"
                          : example.complexity === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {example.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Badge 
                        variant="outline" 
                        className="mb-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      >
                        {example.category}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {example.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-xs transition-all duration-300 hover:scale-110"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md text-sm">
                      <strong>Prompt:</strong> {example.prompt}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#058878] hover:bg-[#00bba5] transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          copyToClipboard(example.prompt).then((success) => {
                            if (success) {
                              toast({
                                title: "Prompt copied!",
                                description: "The prompt has been copied to your clipboard.",
                                variant: "success",
                              })
                            } else {
                              toast({
                                title: "Copy failed",
                                description: "Failed to copy the prompt to clipboard.",
                                variant: "destructive",
                              })
                            }
                          })
                        }}
                      >
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Use Prompt
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
