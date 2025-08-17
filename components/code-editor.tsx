"use client"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  code: string
  language: string
  onChange?: (code: string) => void
  readOnly?: boolean
}

export function CodeEditor({ code, language, onChange, readOnly = true }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // TODO: Integrate Monaco Editor or CodeMirror for syntax highlighting
    // For now, using a simple pre element with basic styling
  }, [code, language])

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-muted px-2 py-1 rounded text-xs font-mono text-muted-foreground">{language}</div>
      </div>
      <pre
        ref={editorRef}
        className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-[400px] overflow-y-auto"
        style={{
          tabSize: 2,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <code className="language-typescript">{code}</code>
      </pre>
    </div>
  )
}
