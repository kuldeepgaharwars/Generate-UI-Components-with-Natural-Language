"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeIcon, LibraryIcon, UserIcon, LogOutIcon, BookOpenIcon, LayersIcon } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CodeIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">UI Generator</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/library">
              <Button
                variant="ghost"
                className={`text-muted-foreground hover:text-foreground ${isActive("/library") ? "bg-accent text-accent-foreground" : ""}`}
              >
                <LibraryIcon className="w-4 h-4 mr-2" />
                Library
              </Button>
            </Link>
            <Link href="/examples">
              <Button
                variant="ghost"
                className={`text-muted-foreground hover:text-foreground ${isActive("/examples") ? "bg-accent text-accent-foreground" : ""}`}
              >
                <LayersIcon className="w-4 h-4 mr-2" />
                Examples
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="ghost"
                className={`text-muted-foreground hover:text-foreground ${isActive("/docs") ? "bg-accent text-accent-foreground" : ""}`}
              >
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Docs
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    {user.avatar ? (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <UserIcon className="w-4 h-4" />
                    )}
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <UserIcon className="w-4 h-4 mr-2" />
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={() => setAuthModalOpen(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setAuthModalOpen(true)}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  )
}
