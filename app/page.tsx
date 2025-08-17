import { ComponentGenerator } from "@/components/component-generator"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Generate UI Components
              <span className="text-primary block">with Natural Language</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your ideas into production-ready React + Tailwind CSS components. Simply describe what you want,
              and our AI will generate clean, accessible code.
            </p>
          </div>

          <ComponentGenerator />
        </div>
      </main>
    </div>
  )
}
