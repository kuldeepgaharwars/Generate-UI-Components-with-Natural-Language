"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  CopyIcon, 
  DownloadIcon, 
  ShareIcon, 
  CheckIcon,
  CodeIcon,
  FileTextIcon,
  SettingsIcon
} from "lucide-react"
import { 
  copyToClipboard, 
  downloadAsFile, 
  shareContent, 
  generateComponentFilename, 
  getMimeType,
  createSuccessCallback,
  type ShareData 
} from "@/lib/utils/code-actions"

/**
 * Example component demonstrating the code action utilities
 * This shows how to use copy, download, and share functionality
 * in different scenarios throughout your application
 */
export function CodeActionsExample() {
  const [sampleCode, setSampleCode] = useState(`import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick
}) => {
  return (
    <button
      className={\`px-4 py-2 rounded-lg font-medium transition-colors \${
        variant === 'primary' 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }\`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}`)

  const [componentName, setComponentName] = useState("CustomButton")
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Example 1: Basic copy functionality
  const handleCopyCode = async () => {
    const success = await copyToClipboard(sampleCode)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  // Example 2: Download with custom filename
  const handleDownloadCode = () => {
    const filename = generateComponentFilename(componentName, 'tsx')
    const mimeType = getMimeType('tsx')
    const success = downloadAsFile(sampleCode, filename, mimeType)
    
    if (success) {
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2000)
    }
  }

  // Example 3: Share with rich metadata
  const handleShareCode = async () => {
    const shareData: ShareData = {
      title: `${componentName} - React Component`,
      text: `A reusable React button component with TypeScript support and Tailwind CSS styling.`,
      url: window.location.href,
      code: sampleCode,
    }

    const success = await shareContent(shareData)
    if (success) {
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
    }
  }

  // Example 4: Using the success callback utility
  const handleCopyWithCallback = createSuccessCallback(setCopySuccess, 1500)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CodeIcon className="w-5 h-5" />
            Code Actions Example
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This example demonstrates how to use the code action utilities for copying, 
            downloading, and sharing code in your React applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="component-name">Component Name</Label>
              <input
                id="component-name"
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Enter component name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Generated Filename</Label>
              <div className="px-3 py-2 border border-border rounded-md bg-muted text-sm">
                {generateComponentFilename(componentName, 'tsx')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Sample Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
            placeholder="Enter your code here..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Action Buttons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleCopyCode}
              className={`transition-all duration-300 ${
                copySuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
              }`}
              disabled={copySuccess}
            >
              {copySuccess ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleDownloadCode}
              className={`transition-all duration-300 ${
                downloadSuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
              }`}
              disabled={downloadSuccess}
            >
              {downloadSuccess ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Downloaded!
                </>
              ) : (
                <>
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download File
                </>
              )}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleShareCode}
              className={`transition-all duration-300 ${
                shareSuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''
              }`}
              disabled={shareSuccess}
            >
              {shareSuccess ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Shared!
                </>
              ) : (
                <>
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share Component
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Usage Examples</Label>
            <div className="grid gap-2">
              <Badge variant="secondary" className="justify-start p-2">
                <strong>Copy:</strong> Uses clipboard API with fallback for older browsers
              </Badge>
              <Badge variant="secondary" className="justify-start p-2">
                <strong>Download:</strong> Creates downloadable file with proper MIME type
              </Badge>
              <Badge variant="secondary" className="justify-start p-2">
                <strong>Share:</strong> Uses Web Share API with clipboard fallback
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Different File Types</Label>
            <div className="flex flex-wrap gap-2">
              {(['tsx', 'jsx', 'ts', 'js', 'css', 'json'] as const).map((fileType) => (
                <Button
                  key={fileType}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const filename = generateComponentFilename(componentName, fileType)
                    const mimeType = getMimeType(fileType)
                    downloadAsFile(sampleCode, filename, mimeType)
                  }}
                >
                  Download .{fileType}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Success Callback Utility</Label>
            <Button
              variant="outline"
              onClick={async () => {
                await copyToClipboard(sampleCode)
                handleCopyWithCallback()
              }}
            >
              Copy with Custom Success Callback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
