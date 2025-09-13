"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Editor, { OnMount, OnChange } from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  language: string
  onChange?: (code: string) => void
  readOnly?: boolean
}

export function CodeEditor({ code, language, onChange, readOnly = true }: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)
  const { theme } = useTheme()

  // Handle editor mounting
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
    
    // Set initial theme
    monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs")
  }

  // Handle content changes
  const handleEditorChange: OnChange = (value) => {
    if (onChange && !readOnly) {
      onChange(value || "")
    }
  }

  // Update theme when it changes
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme === "dark" ? "vs-dark" : "vs")
    }
  }, [theme])

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-muted px-2 py-1 rounded text-xs font-mono text-muted-foreground">{language}</div>
      </div>
      <Editor
        height="400px"
        language={language === "jsx" ? "javascript" : language}
        value={code}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2,
          wordWrap: "on",
          lineNumbers: "on",
          automaticLayout: true,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
        className="rounded-lg overflow-hidden border border-border"
        loading={
          <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        }
      />
    </div>
  )
}
