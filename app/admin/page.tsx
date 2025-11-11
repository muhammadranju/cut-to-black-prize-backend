"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import { adminStorage } from "@/lib/admin-storage"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalCodes: 0,
    usedCodes: 0,
    pendingSubmissions: 0,
  })

  useEffect(() => {
    if (!adminStorage.isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }

    const submissions = storage.getSubmissions()
    const codes = adminStorage.getInvitationCodes()
    const usedCodes = codes.filter((c: any) => c.used).length

    setStats({
      totalSubmissions: submissions.length,
      totalCodes: codes.length,
      usedCodes,
      pendingSubmissions: submissions.filter((s: any) => s.status !== "approved").length,
    })
  }, [router])

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage submissions and invitation codes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-background border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground mt-1">All time submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-background border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.totalCodes}</div>
              <p className="text-xs text-muted-foreground mt-1">Invitation codes created</p>
            </CardContent>
          </Card>

          <Card className="bg-background border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Used Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.usedCodes}</div>
              <p className="text-xs text-muted-foreground mt-1">Active participants</p>
            </CardContent>
          </Card>

          <Card className="bg-background border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.pendingSubmissions}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-background border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Manage your contest</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <a
                href="/admin/submissions"
                className="px-4 py-2 bg-accent text-background font-medium rounded hover:bg-accent/90"
              >
                View Submissions
              </a>
              <a
                href="/admin/invitation-codes"
                className="px-4 py-2 bg-accent/20 text-accent font-medium rounded hover:bg-accent/30"
              >
                Manage Codes
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
