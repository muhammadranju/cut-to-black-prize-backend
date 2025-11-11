"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { storage } from "@/lib/storage"
import { adminStorage } from "@/lib/admin-storage"

export default function AdminSubmissions() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    if (!adminStorage.isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }
    setSubmissions(storage.getSubmissions())
  }, [router])

  const handleApprove = (id: number) => {
    // In production, update submission status in database
    alert(`Submission ${id} approved!`)
  }

  const handleReject = (id: number) => {
    // In production, update submission status in database
    alert(`Submission ${id} rejected!`)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Submissions</h1>
          <p className="text-muted-foreground mt-2">Review and manage screenplay submissions</p>
        </div>

        <Card className="bg-background border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground">All Submissions ({submissions.length})</CardTitle>
            <CardDescription>Review submitted screenplays</CardDescription>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No submissions yet</p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission: any) => (
                  <div key={submission.id} className="border border-accent/20 rounded-lg p-4 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">{submission.author}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">{submission.genre}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="text-foreground font-medium">{submission.duration} pages</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="text-foreground font-medium">{new Date(submission.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{submission.logline}</p>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(submission.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(submission.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
