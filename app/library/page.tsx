import { Header } from "@/components/header"
import { ComponentLibrary } from "@/components/component-library"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Component Library</h1>
            <p className="text-lg text-muted-foreground">
              Browse, search, and manage your generated components. Export, share, or reuse them in your projects.
            </p>
          </div>

          <ComponentLibrary />
        </div>
      </main>
    </div>
  )
}
