"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react"

interface ComponentPreviewProps {
  code: string
}

export function ComponentPreview({ code }: ComponentPreviewProps) {
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const getViewportClass = () => {
    switch (viewportSize) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      default:
        return "max-w-full"
    }
  }

  // Function to render the component preview using an iframe
  const renderComponentPreview = () => {
    // Create a basic HTML structure with necessary styles and the component code
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React Component Builder – Generate UI Components with Natural Language & Tailwind CSS</title>
          <meta name="description" content="Build React components instantly using natural language. Our AI-powered React Component Builder transforms your ideas into production-ready, accessible code with Tailwind CSS. Fast, clean, and developer-friendly.">
          <meta name="keywords" content="React component builder, Tailwind CSS generator, AI React components, natural language UI generator, React code generator, build UI with AI, React Tailwind components, accessible React components">
          <meta name="author" content="Your Name or Company">
          <meta property="og:title" content="React Component Builder – Generate UI Components with Natural Language & Tailwind CSS">
          <meta property="og:description" content="Generate React components instantly with AI. Simply describe what you want and get production-ready Tailwind CSS code.">
          <meta property="og:type" content="website">
          <meta property="og:url" content="https://generate-ui-components.netlify.app/">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="React Component Builder – Generate UI Components with Natural Language & Tailwind CSS">
          <meta name="twitter:description" content="AI-powered React Component Builder that turns natural language into production-ready Tailwind CSS components.">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              margin: 0;
              padding: 1rem;
            }
            #root {
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              // Execute the component code
              ${code}
              
              // Find the component name from the code
              const componentMatch = ${code}.match(/export\\s+(const|function|class)\\s+([A-Za-z0-9_]+)/);
              const componentName = componentMatch ? componentMatch[2] : "GeneratedComponent";
              
              // Wait for React to be available
              setTimeout(() => {
                try {
                  // Get the component from the global scope
                  const Component = window[componentName] || eval(componentName);
                  
                  // Render the component
                  ReactDOM.render(React.createElement(Component), document.getElementById('root'));
                } catch (innerError) {
                  document.getElementById('root').innerHTML = \`
                    <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
                      <h3>Error Rendering Component:</h3>
                      <pre>\${innerError.message}</pre>
                    </div>
                  \`;
                  console.error(innerError);
                }
              }, 100);
            } catch (error) {
              document.getElementById('root').innerHTML = \`
                <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
                  <h3>Error Parsing Component:</h3>
                  <pre>\${error.message}</pre>
                </div>
              \`;
              console.error(error);
            }
          </script>
        </body>
      </html>
    `;

    return (
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        title="Component Preview"
        sandbox="allow-scripts"
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Viewport Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewportSize === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewportSize("desktop")}
          >
            <MonitorIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewportSize("tablet")}
          >
            <TabletIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewportSize("mobile")}
          >
            <SmartphoneIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)} View
        </div>
      </div>

      {/* Preview Area */}
      <div className="bg-muted/50 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
        <div className={`transition-all duration-300 ${getViewportClass()} h-full w-full`}>
          {code ? (
            renderComponentPreview()
          ) : (
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Generated Component Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Generate a component to see the preview here.
                </p>
                <div className="flex gap-2">
                  <Button variant="default" className="flex-1">
                    Primary Action
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Preview Info */}
      <div className="text-xs text-muted-foreground text-center">Preview updates automatically when code changes</div>
    </div>
  )
}
