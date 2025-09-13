/**
 * Utility functions for code-related actions (copy, download, share)
 */

export interface ShareData {
  title: string
  text: string
  url?: string
  code?: string
}

/**
 * Copy text to clipboard with fallback support
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      return result
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Download text content as a file
 */
export const downloadAsFile = (content: string, filename: string, mimeType: string = 'text/plain'): boolean => {
  try {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100)
    return true
  } catch (error) {
    console.error('Failed to download file:', error)
    return false
  }
}

/**
 * Share content using Web Share API with fallback
 */
export const shareContent = async (shareData: ShareData): Promise<boolean> => {
  try {
    // Try Web Share API first
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData)
      return true
    }
    
    // Fallback: copy to clipboard with formatted content
    const fallbackText = formatShareText(shareData)
    return await copyToClipboard(fallbackText)
  } catch (error) {
    console.error('Failed to share content:', error)
    
    // Final fallback: copy to clipboard
    try {
      const fallbackText = formatShareText(shareData)
      return await copyToClipboard(fallbackText)
    } catch (clipboardError) {
      console.error('Failed to copy to clipboard as fallback:', clipboardError)
      return false
    }
  }
}

/**
 * Format share data into a readable text format
 */
const formatShareText = (shareData: ShareData): string => {
  let text = `${shareData.title}\n\n`
  
  if (shareData.text) {
    text += `${shareData.text}\n\n`
  }
  
  if (shareData.code) {
    text += `Code:\n${shareData.code}\n\n`
  }
  
  if (shareData.url) {
    text += `URL: ${shareData.url}\n\n`
  }
  
  text += `Generated at: ${new Date().toLocaleString()}`
  return text
}

/**
 * Generate a filename for a component based on its name and type
 */
export const generateComponentFilename = (componentName: string, fileType: 'tsx' | 'jsx' | 'ts' | 'js' = 'tsx'): string => {
  const sanitizedName = componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, '') // Remove leading numbers
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
  
  return `${sanitizedName || 'GeneratedComponent'}.${fileType}`
}

/**
 * Get appropriate MIME type for different file types
 */
export const getMimeType = (fileType: string): string => {
  const mimeTypes: Record<string, string> = {
    'tsx': 'text/plain',
    'jsx': 'text/plain',
    'ts': 'text/plain',
    'js': 'text/plain',
    'json': 'application/json',
    'css': 'text/css',
    'html': 'text/html',
    'md': 'text/markdown',
  }
  
  return mimeTypes[fileType] || 'text/plain'
}

/**
 * Create a success callback that shows feedback and resets after a delay
 */
export const createSuccessCallback = (
  setSuccessState: (success: boolean) => void,
  delay: number = 2000
) => {
  return () => {
    setSuccessState(true)
    setTimeout(() => setSuccessState(false), delay)
  }
}
