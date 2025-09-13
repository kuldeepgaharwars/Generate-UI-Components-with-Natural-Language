# Code Actions Utilities

This document provides comprehensive documentation for the code action utilities that enable copying, downloading, and sharing code in your React applications.

## Overview

The code actions utilities provide a robust set of functions for handling code-related operations with proper fallbacks and error handling. These utilities are designed to work across different browsers and provide a consistent user experience.

## Features

- **Copy to Clipboard**: Modern clipboard API with fallback for older browsers
- **Download Files**: Create downloadable files with proper MIME types
- **Share Content**: Web Share API with clipboard fallback
- **Cross-browser Compatibility**: Works on all modern browsers
- **TypeScript Support**: Full type safety and IntelliSense
- **Error Handling**: Graceful fallbacks and error recovery

## Installation

The utilities are located in `lib/utils/code-actions.ts` and can be imported directly:

```typescript
import { 
  copyToClipboard, 
  downloadAsFile, 
  shareContent,
  generateComponentFilename,
  getMimeType,
  createSuccessCallback,
  type ShareData 
} from "@/lib/utils/code-actions"
```

## API Reference

### `copyToClipboard(text: string): Promise<boolean>`

Copies text to the clipboard using the modern Clipboard API with fallback support.

**Parameters:**
- `text` (string): The text to copy to clipboard

**Returns:** Promise<boolean> - True if successful, false otherwise

**Example:**
```typescript
const handleCopy = async () => {
  const success = await copyToClipboard("Hello, World!")
  if (success) {
    console.log("Text copied successfully!")
  } else {
    console.error("Failed to copy text")
  }
}
```

### `downloadAsFile(content: string, filename: string, mimeType?: string): boolean`

Downloads content as a file with the specified filename and MIME type.

**Parameters:**
- `content` (string): The content to download
- `filename` (string): The name of the file to download
- `mimeType` (string, optional): The MIME type of the file (defaults to 'text/plain')

**Returns:** boolean - True if successful, false otherwise

**Example:**
```typescript
const handleDownload = () => {
  const code = `console.log("Hello, World!")`
  const filename = "script.js"
  const mimeType = "text/javascript"
  
  const success = downloadAsFile(code, filename, mimeType)
  if (success) {
    console.log("File downloaded successfully!")
  }
}
```

### `shareContent(shareData: ShareData): Promise<boolean>`

Shares content using the Web Share API with clipboard fallback.

**Parameters:**
- `shareData` (ShareData): Object containing share information

**ShareData Interface:**
```typescript
interface ShareData {
  title: string
  text: string
  url?: string
  code?: string
}
```

**Returns:** Promise<boolean> - True if successful, false otherwise

**Example:**
```typescript
const handleShare = async () => {
  const shareData: ShareData = {
    title: "My React Component",
    text: "Check out this awesome component I created!",
    url: "https://example.com",
    code: "export const MyComponent = () => <div>Hello World</div>"
  }
  
  const success = await shareContent(shareData)
  if (success) {
    console.log("Content shared successfully!")
  }
}
```

### `generateComponentFilename(componentName: string, fileType?: string): string`

Generates a sanitized filename for a component.

**Parameters:**
- `componentName` (string): The name of the component
- `fileType` (string, optional): The file extension (defaults to 'tsx')

**Returns:** string - The generated filename

**Example:**
```typescript
const filename = generateComponentFilename("MyButton", "tsx")
// Returns: "MyButton.tsx"

const filename2 = generateComponentFilename("123Button", "jsx")
// Returns: "Button.jsx" (removes leading numbers)
```

### `getMimeType(fileType: string): string`

Gets the appropriate MIME type for a given file type.

**Parameters:**
- `fileType` (string): The file extension

**Returns:** string - The MIME type

**Supported file types:**
- `tsx`, `jsx`, `ts`, `js` → `text/plain`
- `json` → `application/json`
- `css` → `text/css`
- `html` → `text/html`
- `md` → `text/markdown`

**Example:**
```typescript
const mimeType = getMimeType("tsx") // Returns: "text/plain"
const mimeType2 = getMimeType("json") // Returns: "application/json"
```

### `createSuccessCallback(setSuccessState, delay?): () => void`

Creates a success callback function that sets a success state and resets it after a delay.

**Parameters:**
- `setSuccessState` (function): Function to set the success state
- `delay` (number, optional): Delay in milliseconds before resetting (defaults to 2000)

**Returns:** () => void - The success callback function

**Example:**
```typescript
const [copySuccess, setCopySuccess] = useState(false)
const handleSuccess = createSuccessCallback(setCopySuccess, 1500)

// Use in your component
const handleCopy = async () => {
  await copyToClipboard(text)
  handleSuccess() // Sets success state and resets after 1.5 seconds
}
```

## Usage Examples

### Basic Copy Functionality

```typescript
import { useState } from "react"
import { copyToClipboard } from "@/lib/utils/code-actions"

export function CopyExample() {
  const [copySuccess, setCopySuccess] = useState(false)
  
  const handleCopy = async () => {
    const success = await copyToClipboard("Your code here")
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }
  
  return (
    <button onClick={handleCopy}>
      {copySuccess ? "Copied!" : "Copy Code"}
    </button>
  )
}
```

### Download with Custom Filename

```typescript
import { downloadAsFile, generateComponentFilename, getMimeType } from "@/lib/utils/code-actions"

export function DownloadExample() {
  const handleDownload = () => {
    const code = `export const MyComponent = () => <div>Hello World</div>`
    const filename = generateComponentFilename("MyComponent", "tsx")
    const mimeType = getMimeType("tsx")
    
    downloadAsFile(code, filename, mimeType)
  }
  
  return <button onClick={handleDownload}>Download Component</button>
}
```

### Share with Rich Metadata

```typescript
import { shareContent, type ShareData } from "@/lib/utils/code-actions"

export function ShareExample() {
  const handleShare = async () => {
    const shareData: ShareData = {
      title: "My Awesome Component",
      text: "Check out this React component I created with TypeScript!",
      url: window.location.href,
      code: `export const AwesomeComponent = () => <div>Awesome!</div>`
    }
    
    await shareContent(shareData)
  }
  
  return <button onClick={handleShare}>Share Component</button>
}
```

### Advanced Usage with Success Callbacks

```typescript
import { useState } from "react"
import { copyToClipboard, createSuccessCallback } from "@/lib/utils/code-actions"

export function AdvancedExample() {
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  
  const handleCopySuccess = createSuccessCallback(setCopySuccess, 1500)
  const handleDownloadSuccess = createSuccessCallback(setDownloadSuccess, 2000)
  
  const handleCopy = async () => {
    const success = await copyToClipboard("Code to copy")
    if (success) handleCopySuccess()
  }
  
  return (
    <div>
      <button onClick={handleCopy}>
        {copySuccess ? "Copied!" : "Copy"}
      </button>
      <button onClick={handleDownloadSuccess}>
        {downloadSuccess ? "Downloaded!" : "Download"}
      </button>
    </div>
  )
}
```

## Browser Compatibility

### Copy to Clipboard
- **Modern browsers**: Uses Clipboard API
- **Older browsers**: Falls back to `document.execCommand('copy')`
- **Mobile browsers**: Full support

### Download
- **All browsers**: Uses Blob API and download attribute
- **Mobile browsers**: May open in new tab instead of downloading

### Share
- **Modern mobile browsers**: Uses Web Share API
- **Desktop browsers**: Falls back to clipboard copy
- **Older browsers**: Clipboard fallback

## Error Handling

All utilities include comprehensive error handling:

```typescript
try {
  const success = await copyToClipboard(text)
  if (success) {
    // Handle success
  } else {
    // Handle failure
  }
} catch (error) {
  console.error("Operation failed:", error)
  // Handle error gracefully
}
```

## Best Practices

1. **Always check return values**: All functions return boolean or Promise<boolean> to indicate success
2. **Provide user feedback**: Use success states to show users when operations complete
3. **Handle errors gracefully**: Implement fallback behavior for failed operations
4. **Use appropriate MIME types**: Use `getMimeType()` for proper file downloads
5. **Sanitize filenames**: Use `generateComponentFilename()` for safe filenames

## Integration with Component Generator

The code actions are already integrated into the main component generator. The buttons in the generated code section use these utilities to provide:

- **Copy**: Copies the generated component code to clipboard
- **Download**: Downloads the component as a `.tsx` file
- **Share**: Shares the component with metadata via Web Share API or clipboard

## Testing

To test the utilities, you can use the example component:

```typescript
import { CodeActionsExample } from "@/components/examples/code-actions-example"

// In your page or component
<CodeActionsExample />
```

This provides a comprehensive testing interface for all the code action utilities.
