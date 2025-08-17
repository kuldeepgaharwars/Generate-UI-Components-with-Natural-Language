"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  SearchIcon,
  FilterIcon,
  EyeIcon,
  CopyIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon,
  CodeIcon,
  FolderIcon,
  ShareIcon,
  DownloadIcon,
} from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { ComponentPreview } from "@/components/component-preview"
import { ExportModal } from "@/components/export-modal"

interface SavedComponent {
  id: string
  name: string
  description: string
  code: string
  category: string
  tags: string[]
  createdAt: string
  framework: string
  styling: string
}

export function ComponentLibrary() {
  const [savedComponents, setSavedComponents] = useState<SavedComponent[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedComponent, setSelectedComponent] = useState<SavedComponent | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [componentToExport, setComponentToExport] = useState<SavedComponent | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("savedComponents")
    if (saved) {
      setSavedComponents(JSON.parse(saved))
    }
  }, [])

  const categories = ["all", ...new Set(savedComponents.map((comp) => comp.category))]

  const filteredComponents = savedComponents.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleDeleteComponent = (id: string) => {
    const updated = savedComponents.filter((comp) => comp.id !== id)
    setSavedComponents(updated)
    localStorage.setItem("savedComponents", JSON.stringify(updated))
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleExportComponent = (component: SavedComponent) => {
    setComponentToExport(component)
    setExportModalOpen(true)
  }

  const handleBulkExport = () => {
    if (filteredComponents.length > 0) {
      setComponentToExport(filteredComponents[0]) // Use first component as primary
      setExportModalOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search components, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <FilterIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filteredComponents.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleBulkExport}>
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export All ({filteredComponents.length})
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? "List" : "Grid"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{savedComponents.length}</p>
                <p className="text-sm text-muted-foreground">Total Components</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TagIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{new Set(savedComponents.flatMap((comp) => comp.tags)).size}</p>
                <p className="text-sm text-muted-foreground">Unique Tags</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredComponents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CodeIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Components Found</h3>
            <p className="text-muted-foreground mb-4">
              {savedComponents.length === 0
                ? "Start generating components to build your library!"
                : "Try adjusting your search or filters."}
            </p>
            {savedComponents.length === 0 && <Button variant="outline">Generate Your First Component</Button>}
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredComponents.map((component) => (
            <Card key={component.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{component.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{component.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="w-3 h-3" />
                  {formatDate(component.createdAt)}
                  <Badge variant="secondary" className="text-xs">
                    {component.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {component.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {component.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{component.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedComponent(component)}
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle>{component.name}</DialogTitle>
                      </DialogHeader>

                      <div className="grid lg:grid-cols-2 gap-6 overflow-hidden">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {component.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Code</h4>
                            <div className="max-h-[400px] overflow-auto">
                              <CodeEditor code={component.code} language="typescript" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Preview</h4>
                          <div className="border rounded-lg p-4 bg-background">
                            <ComponentPreview code={component.code} />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => handleExportComponent(component)}>
                    <ShareIcon className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => handleCopyCode(component.code)}>
                    <CopyIcon className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteComponent(component.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {componentToExport && (
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => {
            setExportModalOpen(false)
            setComponentToExport(null)
          }}
          component={componentToExport}
          allComponents={filteredComponents}
        />
      )}
    </div>
  )
}
