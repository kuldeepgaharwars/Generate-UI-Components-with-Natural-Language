"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "./auth-provider"
import { X, Loader2 } from "lucide-react"

interface AuthModalProps {
  isOpen?: boolean
  onClose: () => void
  onSuccess?: (user: any) => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login, signup, loginWithGoogle, isLoading } = useAuth()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ email: "", password: "", name: "" })
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(loginForm.email, loginForm.password)
      if (success) {
        if (onSuccess) {
          onSuccess({
            displayName: "John Doe",
            email: loginForm.email,
            photoURL: "",
          });
        }
        onClose();
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const success = await signup(signupForm.email, signupForm.password, signupForm.name)
    if (success) {
      if (onSuccess) {
        onSuccess({
          displayName: signupForm.name,
          email: signupForm.email,
          photoURL: "",
        });
      }
      onClose()
      setSignupForm({ email: "", password: "", name: "" })
    } else {
      setError("User already exists with this email")
    }
  }

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const success = await loginWithGoogle()
      if (success) {
        if (onSuccess) {
          onSuccess({
            displayName: "Google User",
            email: "google.user@example.com",
            photoURL: "",
          });
        }
        onClose();
      } else {
        setError("Failed to login with Google. Please try again.");
      }
    } catch (error) {
      setError("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full overflow-hidden border-none shadow-2xl bg-background">
          <div className="p-8 relative">
            <Button variant="ghost" size="sm" className="absolute right-4 top-4 z-10" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div className="flex flex-col justify-center min-h-[400px]">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Welcome Back
                </h3>
                <p className="text-muted-foreground text-lg">Sign in to your account</p>
              </div>
              
              <div className="space-y-6">
                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 text-base font-medium"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                  ) : (
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-foreground">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      className="h-12 border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-foreground">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      className="h-12 border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base"
                      placeholder="••••••••"
                    />
                  </div>
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive font-medium">{error}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="w-4 h-4 rounded border-2 border-primary/20 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0" 
                      />
                      <label htmlFor="remember" className="text-sm text-muted-foreground font-medium">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                      Forgot password?
                    </a>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : null}
                    Sign In
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
