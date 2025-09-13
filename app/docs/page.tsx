import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeIcon, BookOpenIcon, ZapIcon, ShieldIcon, PaletteIcon, DownloadIcon } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Learn how to use the UI Generator effectively and get the most out of AI-powered component generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZapIcon className="w-5 h-5 text-primary" />
                  Quick Start
                </CardTitle>
                <CardDescription>Get up and running in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Sign in to save your components</li>
                  <li>Describe your component in natural language</li>
                  <li>Choose your framework and styling options</li>
                  <li>Generate and preview your component</li>
                  <li>Copy the code or save to your library</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-primary" />
                  Best Practices
                </CardTitle>
                <CardDescription>Tips for better results</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Be specific about layout and styling</li>
                  <li>Mention responsive behavior if needed</li>
                  <li>Include accessibility requirements</li>
                  <li>Specify color schemes and themes</li>
                  <li>Test components in different viewports</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CodeIcon className="w-6 h-6 text-primary" />
                Writing Effective Prompts
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">✅ Good Examples:</h3>
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-md space-y-2">
                        <p className="text-sm">
                          "Create a pricing card with three tiers, each showing price, features list, and a
                          call-to-action button. Make the middle tier highlighted as popular."
                        </p>
                        <p className="text-sm">
                          "Design a responsive navigation bar with logo on the left, menu items in the center, and user
                          profile dropdown on the right."
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-red-600 mb-2">❌ Avoid:</h3>
                      <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-md space-y-2">
                        <p className="text-sm">"Make a card" (too vague)</p>
                        <p className="text-sm">"Create something nice" (no specific requirements)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <PaletteIcon className="w-6 h-6 text-primary" />
                Styling Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge>React</Badge>
                      <Badge variant="outline">Vue (Coming Soon)</Badge>
                      <Badge variant="outline">Svelte (Coming Soon)</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Styling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge>Tailwind CSS</Badge>
                      <Badge variant="outline">CSS Modules (Coming Soon)</Badge>
                      <Badge variant="outline">Styled Components (Coming Soon)</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader>
                    <CardTitle className="text-lg">UI Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge>shadcn/ui</Badge>
                      <Badge variant="outline">Headless UI (Coming Soon)</Badge>
                      <Badge variant="outline">Chakra UI (Coming Soon)</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DownloadIcon className="w-6 h-6 text-primary" />
                Export Options
              </h2>
              <Card className="p-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Single Component</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Copy to clipboard</li>
                        <li>• Download as .tsx file</li>
                        <li>• Generate embed code</li>
                        <li>• Share via URL</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Multiple Components</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Export as ZIP package</li>
                        <li>• Generate package.json</li>
                        <li>• Include dependencies</li>
                        <li>• Create project structure</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ShieldIcon className="w-6 h-6 text-primary" />
                Accessibility
              </h2>
              <Card className="p-4 pt-0">
                <CardContent className="pt-6">
                  <p className="mb-4">All generated components follow accessibility best practices:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Semantic HTML elements</li>
                    <li>Proper ARIA labels and roles</li>
                    <li>Keyboard navigation support</li>
                    <li>Color contrast compliance</li>
                    <li>Screen reader compatibility</li>
                    <li>Focus management</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
