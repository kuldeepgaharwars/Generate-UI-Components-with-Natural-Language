"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeIcon, LibraryIcon, UserIcon, LogOutIcon, BookOpenIcon, LayersIcon } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ui/theme-toggle"
import { useAuth } from "./auth-provider"

export function Header() {
  const { user, logout } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path
  
  const handleAuthSuccess = (userData: any) => {
    setAuthModalOpen(false)
    // Auth success is handled by the provider
  }

  return (
    <>
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              {/* <CodeIcon className="w-5 h-5 text-primary-foreground" /> */}
              <img src="../../ui-logo.png" alt="UI Generator" className="w-full" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">UI Generator</span>
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
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                      <AvatarFallback className="bg-gradient-to-r from-primary/20 to-secondary/20">{user.displayName?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-fadeIn">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-slow">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                  </span>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

    </header>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
    </>
  )
}
