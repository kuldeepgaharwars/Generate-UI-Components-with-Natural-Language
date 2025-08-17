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

  // TODO: Implement actual component rendering from code string
  // For now, showing a placeholder with viewport controls

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
      <div className="bg-muted/50 p-6 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className={`transition-all duration-300 ${getViewportClass()}`}>
          {/* Placeholder Preview - TODO: Replace with actual component rendering */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Generated Component Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This is a preview of your generated component. Live rendering will be implemented with the AI
                integration.
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
        </div>
      </div>

      {/* Preview Info */}
      <div className="text-xs text-muted-foreground text-center">Preview updates automatically when code changes</div>
    </div>
  )
}
