"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider: "email" | "google"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockGoogleAuth = () => {
  return new Promise<{ email: string; name: string; avatar: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        email: "user@gmail.com",
        name: "Google User",
        avatar: `https://ui-avatars.com/api/?name=Google+User&background=random`,
      })
    }, 1500)
  })
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("ui-gen-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("ui-gen-users") || "[]")
    const existingUser = users.find((u: any) => u.email === email && u.password === password)

    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser
      setUser(userWithoutPassword)
      localStorage.setItem("ui-gen-user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("ui-gen-users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In real app, this would be hashed
      name,
      provider: "email" as const,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("ui-gen-users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("ui-gen-user", JSON.stringify(userWithoutPassword))

    setIsLoading(false)
    return true
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // In a real app, this would integrate with Google OAuth
      const googleUser = await mockGoogleAuth()

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("ui-gen-users") || "[]")
      let existingUser = users.find((u: any) => u.email === googleUser.email)

      if (!existingUser) {
        // Create new Google user
        const newUser = {
          id: Date.now().toString(),
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.avatar,
          provider: "google" as const,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        localStorage.setItem("ui-gen-users", JSON.stringify(users))
        existingUser = newUser
      }

      setUser(existingUser)
      localStorage.setItem("ui-gen-user", JSON.stringify(existingUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ui-gen-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
