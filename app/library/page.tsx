import { Header } from "@/components/header"
import { ComponentLibrary } from "@/components/component-library"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text animate-fadeIn" style={{animationDelay: '0.2s'}}>Component Library</span>
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-grid-white/10 opacity-20 animate-pulse-slow"></div>
            </h1>
            <p className="text-lg text-muted-foreground animate-fadeIn" style={{animationDelay: '0.4s'}}>
              Browse, search, and manage your generated components. Export, share, or reuse them in your projects.
            </p>
          </div>

          <ComponentLibrary />
        </div>
      </main>
    </div>
  )
}
