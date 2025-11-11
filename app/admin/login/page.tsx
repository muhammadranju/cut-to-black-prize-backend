"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminStorage } from "@/lib/admin-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (in production, use proper authentication)
    if (password === "admin123") {
      adminStorage.setAdminAuth(true, password)
      router.push("/admin")
    } else {
      setError("Invalid password")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md bg-background border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-accent/20 text-foreground"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-background">
              Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo password: <code className="bg-background/50 px-1 rounded">admin123</code>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
