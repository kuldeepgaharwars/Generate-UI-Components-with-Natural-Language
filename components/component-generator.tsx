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
  CodeIcon,
  NavigationIcon,
  FileTextIcon,
  CreditCardIcon,
  MousePointerIcon,
  BarChart3Icon,
  LayoutIcon,
} from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { 
  copyToClipboard, 
  downloadAsFile, 
  shareContent, 
  generateComponentFilename, 
  getMimeType,
  createSuccessCallback,
  type ShareData 
} from "@/lib/utils/code-actions"

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
  const [generatedCode, setGeneratedCode] = useState(`import React from 'react';
  
interface PricingCardProps { 
  /** 
   * The title of the pricing card 
   */ 
  title: string; 
  /** 
   * The price of the pricing card 
   */ 
  price: string; 
  /** 
   * The features of the pricing card 
   */ 
  features: string[]; 
  /** 
   * The button text of the pricing card 
   */ 
  buttonText: string; 
} 
 
const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  buttonText, 
}) => { 
  return ( 
    <div 
      className="relative flex flex-col justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
      role="article" 
      aria-label={title} 
    > 
      <h2 className="text-3xl font-bold text-white">{title}</h2> 
      <p className="text-5xl font-bold text-white">{price}</p> 
      <ul className="mt-8 text-lg text-white"> 
        {features.map((feature, index) => ( 
          <li key={index} className="flex items-center mb-4"> 
            <svg 
              className="w-6 h-6 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg" 
            > 
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              /> 
            </svg> 
            <span className="ml-4">{feature}</span> 
          </li> 
        ))} 
      </ul> 
      <button 
        className="px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500" 
        type="button" 
        aria-label={buttonText} 
      > 
        {buttonText} 
      </button> 
    </div> 
  ); 
}; 
 
export default PricingCard;`)
  const [componentName, setComponentName] = useState("PricingCard")
  const [selectedCategory, setSelectedCategory] = useState<string>("Cards")
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    framework: "react",
    styling: "tailwind",
    typescript: true,
    accessibility: true,
  })

  const componentCategories: ComponentCategory[] = [
    {
      name: "Navigation",
      icon: "NavigationIcon",
      examples: [
        "Create a responsive navbar with dropdown menus and mobile hamburger",
        "Build a sidebar navigation with collapsible sections",
        "Design a breadcrumb navigation with custom separators",
        "Generate a tab navigation with active state indicators",
      ],
    },
    {
      name: "Forms",
      icon: "FileTextIcon",
      examples: [
        "Create a contact form with validation and success states",
        "Build a multi-step form wizard with progress indicator",
        "Design a login form with social authentication options",
        "Generate a search form with autocomplete suggestions",
      ],
    },
    {
      name: "Cards",
      icon: "CreditCardIcon",
      examples: [
        "Create a pricing card with gradient background and hover animation",
        "Build a product card with image, rating, and add to cart button",
        "Design a profile card with avatar and social links",
        "Generate a feature card with icon and description",
      ],
    },
    {
      name: "Buttons",
      icon: "MousePointerIcon",
      examples: [
        "Create a primary button with loading state and icon",
        "Build a floating action button with ripple effect",
        "Design a button group with active state",
        "Generate a toggle button with on/off states",
      ],
    },
    {
      name: "Data Display",
      icon: "BarChart3Icon",
      examples: [
        "Create a data table with sorting and pagination",
        "Build a statistics dashboard with charts",
        "Design a timeline component with events",
        "Generate a testimonial carousel with auto-play",
      ],
    },
    {
      name: "Layout",
      icon: "LayoutIcon",
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
      
      // Remove markdown code block markers if they exist
      let cleanedCode = code
      if (code.startsWith("```typescript") || code.startsWith("```tsx") || code.startsWith("```jsx") || code.startsWith("```javascript")) {
        cleanedCode = code.replace(/^```(typescript|tsx|jsx|javascript)\n/, "").replace(/```$/, "")
      }
      
      setGeneratedCode(cleanedCode)
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

  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  const handleCopyCode = async () => {
    const success = await copyToClipboard(generatedCode)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleDownloadCode = () => {
    const filename = generateComponentFilename(componentName, 'tsx')
    const mimeType = getMimeType('tsx')
    const success = downloadAsFile(generatedCode, filename, mimeType)
    
    if (success) {
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2000)
    }
  }

  const handleShareCode = async () => {
    const shareData: ShareData = {
      title: `${componentName || 'Generated Component'}`,
      text: `Check out this React component I generated: ${prompt}`,
      url: window.location.href,
      code: generatedCode,
    }

    const success = await shareContent(shareData)
    if (success) {
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
    }
  }

  const handleRefine = () => {
    if (generatedCode) {
      setPrompt(`Refine this component: ${prompt}`)
      handleGenerate()
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Input Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Input */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br py-0 from-background to-primary/5">
            <CardHeader className="flex items-center bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20 p-3 !pb-3 px-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <SparklesIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Describe Your Component
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="component-name" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Component Name (optional)
                </Label>
                <Input
                  id="component-name"
                  placeholder="e.g., PricingCard, ContactForm"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-background/50 hover:bg-background"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="prompt" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Description
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., Create a pricing card with gradient background and hover animation..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[140px] resize-none border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-background/50 hover:bg-background"
                />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                <div className="text-sm text-muted-foreground font-medium">
                  {prompt.length}/500 characters
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefine} 
                    disabled={!generatedCode}
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <RefreshCwIcon className="w-4 h-4 mr-2" />
                    Refine
                  </Button>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!prompt.trim() || isGenerating} 
                    className="min-w-[140px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
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
        <Card className="border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br py-0 from-background to-primary/5">
            <CardHeader className="flex items-center bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20 p-3 !pb-3 px-6">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <SettingsIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary">Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Framework</Label>
              <Select
                value={generationOptions.framework}
                onValueChange={(value: any) => setGenerationOptions((prev) => ({ ...prev, framework: value }))}
              >
                <SelectTrigger className="border-2 border-secondary/20 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 bg-background/50 hover:bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue (Coming Soon)</SelectItem>
                  <SelectItem value="svelte">Svelte (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Styling</Label>
              <Select
                value={generationOptions.styling}
                onValueChange={(value: any) => setGenerationOptions((prev) => ({ ...prev, styling: value }))}
              >
                <SelectTrigger className="border-2 border-secondary/20 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 bg-background/50 hover:bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                  <SelectItem value="css-modules">CSS Modules</SelectItem>
                  <SelectItem value="styled-components">Styled Components</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4 pt-4 border-t border-secondary/10">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                <input
                  type="checkbox"
                  id="typescript"
                  checked={generationOptions.typescript}
                  onChange={(e) => setGenerationOptions((prev) => ({ ...prev, typescript: e.target.checked }))}
                  className="w-4 h-4 rounded border-secondary/30 text-secondary focus:ring-secondary/50 focus:ring-2 transition-all duration-300"
                />
                <Label htmlFor="typescript" className="text-sm font-medium text-foreground cursor-pointer">TypeScript</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                <input
                  type="checkbox"
                  id="accessibility"
                  checked={generationOptions.accessibility}
                  onChange={(e) => setGenerationOptions((prev) => ({ ...prev, accessibility: e.target.checked }))}
                  className="w-4 h-4 rounded border-secondary/30 text-secondary focus:ring-secondary/50 focus:ring-2 transition-all duration-300"
                />
                <Label htmlFor="accessibility" className="text-sm font-medium text-foreground cursor-pointer">Accessibility</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Categories */}
      <Card className="border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
          <CardTitle className="flex items-center gap-3 text-xl pt-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CodeIcon className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent relative">
              Popular Categories
              <div className="absolute -z-10 bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {componentCategories.map((category, index) => {
              const iconMap = {
                NavigationIcon,
                FileTextIcon,
                CreditCardIcon,
                MousePointerIcon,
                BarChart3Icon,
                LayoutIcon,
              }
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]

              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`h-auto p-4 shadow-lg flex flex-col items-center gap-3 transition-all duration-300 animate-fadeIn ${
                    selectedCategory === category.name 
                      ? "bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg hover:shadow-xl" 
                      : "border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 bg-background/50 hover:translate-y-[-5px]"
                  }`}
                  style={{animationDelay: `${0.1 + index * 0.1}s`}}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}
                >
                  {IconComponent && (
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.name 
                        ? "bg-white/20" 
                        : "bg-primary/10"
                    }`}>
                      <IconComponent className={`w-6 h-6 ${selectedCategory === category.name ? "animate-pulse" : ""}`} />
                    </div>
                  )}
                  <span className="text-sm font-semibold">{category.name}</span>
                </Button>
              )
            })}
          </div>

          {selectedCategory && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-lg text-foreground bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">{selectedCategory} Examples</h4>
              </div>
              <div className="grid gap-3">
                {componentCategories
                  .find((cat) => cat.name === selectedCategory)
                  ?.examples.map((example, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d] hover:text-white bg-primary/30 text-primary justify-start p-3 h-auto text-left text-sm font-medium border border-primary/20 transition-all duration-300 hover:translate-x-1 animate-fadeIn"
                      style={{animationDelay: `${0.3 + index * 0.1}s`}}
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

      {/* Enhanced Output Section with Animation */}
      {generatedCode && (
        <div className="animate-fadeIn">
          {/* Code Output with Enhanced Editor */}
          <Card className="overflow-hidden border-primary/20 shadow-lg transition-all duration-300 hover:shadow-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CodeIcon className="w-5 h-5 text-primary animate-pulse" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Generated Code
                  </span>
                </CardTitle>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyCode}
                    className={`transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
                      copySuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
                    }`}
                    disabled={copySuccess}
                  >
                    {copySuccess ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownloadCode}
                    className={`transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
                      downloadSuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
                    }`}
                    disabled={downloadSuccess}
                  >
                    {downloadSuccess ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShareCode}
                    className={`transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
                      shareSuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
                    }`}
                    disabled={shareSuccess}
                  >
                    {shareSuccess ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Shared!
                      </>
                    ) : (
                      <>
                        <ShareIcon className="w-4 h-4 mr-2" />
                        Share
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none">
                  <TabsTrigger value="code" className="data-[state=active]:bg-primary/10">Code</TabsTrigger>
                  <TabsTrigger value="usage" className="data-[state=active]:bg-primary/10">Usage</TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="p-4 transition-all duration-500 animate-fadeIn">
                  <div className="rounded-lg overflow-hidden border border-primary/10 shadow-inner">
                    <CodeEditor code={generatedCode} language="typescript" />
                  </div>
                </TabsContent>
                <TabsContent value="usage" className="p-4 transition-all duration-500 animate-fadeIn">
                  <div className="bg-muted p-6 rounded-lg border border-primary/10 shadow-inner">
                    <h4 className="font-medium mb-3 text-primary">How to use this component:</h4>
                    <pre className="text-sm text-muted-foreground bg-background/50 p-4 rounded border border-border/50 overflow-x-auto">
                      {(() => {
                        // Function to detect required props from interface or type definition
                        const detectRequiredProps = () => {
                          const requiredProps: string[] = [];
                          
                          // Look for interface or type definition with required props
                          const interfaceMatch = generatedCode.match(/interface\s+(\w+Props)\s*\{([^}]*)\}/s);
                          const typeMatch = generatedCode.match(/type\s+(\w+Props)\s*=\s*\{([^}]*)\}/s);
                          
                          const propsDefinition = interfaceMatch?.[2] || typeMatch?.[2];
                          
                          if (propsDefinition) {
                            // Extract prop names that don't have ? or optional marker
                            const propLines = propsDefinition.split('\n');
                            propLines.forEach(line => {
                              // Match prop name that doesn't have ? after it and before :, and isn't marked as optional in comments
                              const requiredPropMatch = line.match(/\s*(\w+)\s*:/); 
                              if (requiredPropMatch && !line.includes('?:') && !line.includes('optional')) {
                                requiredProps.push(requiredPropMatch[1]);
                              }
                            });
                          }
                          
                          return requiredProps;
                        };
                        
                        // Get required props
                        const requiredProps = detectRequiredProps();
                        
                        // Function to get component-specific props based on category
                        const getCategoryProps = () => {
                          let props = '';
                          
                          switch(selectedCategory) {
                            case "Cards":
                              props = 'title="Example Card" price="$99" features={["Feature 1", "Feature 2"]} buttonText="Get Started"';
                              break;
                            case "Buttons":
                              props = 'variant="primary" onClick={() => console.log("Button clicked")} disabled={false}';
                              break;
                            case "Navigation":
                              props = 'items={[{label: "Home", href: "/"}, {label: "About", href: "/about"}]} activeItem="Home"';
                              break;
                            case "Forms":
                              props = 'onSubmit={(data) => console.log(data)} defaultValues={{name: "", email: ""}}';
                              break;
                            case "Data Display":
                              props = 'data={[{id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}]} columns={["id", "name"]}';
                              break;
                            case "Layout":
                              props = 'title="Section Title" subtitle="Section description goes here"';
                              break;
                            default:
                              props = '';
                          }
                          
                          // Handle any remaining required props not covered by category-specific props
                          const categoryPropNames = props.match(/\w+=/g)?.map(p => p.replace('=', '')) || [];
                          const missingRequiredProps = requiredProps.filter(prop => !categoryPropNames.includes(prop));
                          
                          if (missingRequiredProps.length > 0) {
                            const additionalProps = missingRequiredProps.map(prop => {
                              // Generate appropriate values based on prop name
                              if (prop.includes('children')) return '';
                              if (prop.includes('id')) return `${prop}="example-id"`;
                              if (prop.includes('name')) return `${prop}="Example Name"`;
                              if (prop.includes('title')) return `${prop}="Example Title"`;
                              if (prop.includes('description')) return `${prop}="This is an example description"`;
                              if (prop.includes('url') || prop.includes('link') || prop.includes('href')) return `${prop}="https://example.com"`;
                              if (prop.includes('image') || prop.includes('img') || prop.includes('avatar')) return `${prop}="/placeholder.jpg"`;
                              if (prop.includes('icon')) return `${prop}="StarIcon"`;
                              if (prop.includes('color') || prop.includes('variant')) return `${prop}="primary"`;
                              if (prop.includes('size')) return `${prop}="medium"`;
                              if (prop.includes('enabled') || prop.includes('active') || prop.includes('selected')) return `${prop}={true}`;
                              if (prop.includes('disabled')) return `${prop}={false}`;
                              if (prop.includes('count') || prop.includes('index') || prop.includes('level')) return `${prop}={1}`;
                              if (prop.includes('items') || prop.includes('options') || prop.includes('data')) return `${prop}={["Item 1", "Item 2"]}`;
                              return `${prop}="Example Value"`;
                            }).join(' ');
                            
                            return props ? `${props} ${additionalProps}` : additionalProps;
                          }
                          
                          return props;
                        };

                        // Generic props that might apply to any component
                        const genericProps = 'className="w-full max-w-md mx-auto"';
                        
                        // Determine if component might have children based on category or required props
                        const hasChildren = ['Layout', 'Navigation'].includes(selectedCategory) || 
                                           requiredProps.some(prop => prop.includes('children'));
                        
                        // Check if the generated code uses default export or named export
                        const isDefaultExport = generatedCode.includes(`export default ${componentName}`) || 
                                               generatedCode.includes('export default function') || 
                                               generatedCode.includes('export default class') || 
                                               generatedCode.includes('export default (') ||
                                               generatedCode.includes('export default const');
                        
                        return `${isDefaultExport 
                          ? `import ${componentName || "GeneratedComponent"} from './components/${componentName || "GeneratedComponent"}'` 
                          : `import { ${componentName || "GeneratedComponent"} } from './components/${componentName || "GeneratedComponent"}'`}

export default function App() {
  return (
    <div className="container mx-auto p-4">
      {/* Example usage with props based on component type */}
      <${componentName || "GeneratedComponent"} ${getCategoryProps()} ${genericProps}${hasChildren ? `>
        {/* Child content can go here */}
      </${componentName || "GeneratedComponent"}>` : ' />'}
    </div>
  )
}`
                      })()}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
