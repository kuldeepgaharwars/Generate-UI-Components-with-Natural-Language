import { ComponentGenerator } from "@/components/component-generator"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Animated Title */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 py-5 relative overflow-hidden">
              <span className="inline-block animate-fadeIn" style={{animationDelay: '0.2s'}}>Generate UI Components</span>
              <span 
                className="bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text block py-3 animate-fadeIn" 
                style={{animationDelay: '0.4s'}}
              >
                with Natural Language &
              </span>
              <span 
                className="bg-gradient-to-l to-blue-500 via-teal-500 from-green-500 text-transparent bg-clip-text block py-3 animate-fadeIn" 
                style={{animationDelay: '0.6s'}}
              >
                Tailwind CSS
              </span>
              <div className="absolute -z-10 top-0 left-0 w-full h-full bg-grid-white/10 opacity-20 animate-pulse-slow"></div>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fadeIn" style={{animationDelay: '0.8s'}}>
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
