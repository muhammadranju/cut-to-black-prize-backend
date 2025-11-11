"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { adminStorage } from "@/lib/admin-storage"

export default function AdminInvitationCodes() {
  const router = useRouter()
  const [codes, setCodes] = useState<any[]>([])
  const [quantity, setQuantity] = useState("1")

  useEffect(() => {
    if (!adminStorage.isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }
    loadCodes()
  }, [router])

  const loadCodes = () => {
    setCodes(adminStorage.getInvitationCodes())
  }

  const generateCodes = () => {
    const count = Number.parseInt(quantity)
    if (count > 0 && count <= 100) {
      for (let i = 0; i < count; i++) {
        const code = adminStorage.generateInvitationCode()
        adminStorage.addInvitationCode(code)
      }
      setQuantity("1")
      loadCodes()
    } else {
      alert("Enter a quantity between 1 and 100")
    }
  }

  const deleteCode = (code: string) => {
    if (confirm(`Delete code ${code}?`)) {
      adminStorage.deleteInvitationCode(code)
      loadCodes()
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert("Code copied!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Invitation Codes</h1>
          <p className="text-muted-foreground mt-2">Create and distribute invitation codes</p>
        </div>

        <Card className="bg-background border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground">Generate Codes</CardTitle>
            <CardDescription>Create new invitation codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Number of codes"
                className="bg-background/50 border-accent/20 text-foreground"
              />
              <Button onClick={generateCodes} className="bg-accent hover:bg-accent/90 text-background">
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground">Invitation Codes ({codes.length})</CardTitle>
            <CardDescription>All created invitation codes</CardDescription>
          </CardHeader>
          <CardContent>
            {codes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No codes generated yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-muted-foreground border-b border-accent/20">
                    <tr>
                      <th className="text-left py-2">Code</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Created</th>
                      <th className="text-right py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.map((code: any) => (
                      <tr key={code.code} className="border-b border-accent/10">
                        <td className="py-3 font-mono text-foreground">{code.code}</td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              code.used ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {code.used ? "Used" : "Available"}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">{new Date(code.created).toLocaleDateString()}</td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => copyCode(code.code)}
                              className="text-accent hover:text-accent/80 text-xs font-medium"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => deleteCode(code.code)}
                              className="text-red-500 hover:text-red-600 text-xs font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
