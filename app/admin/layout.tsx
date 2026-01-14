import type React from "react"
import Link from "next/link"
import { LayoutDashboard, UtensilsCrossed, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-bold text-lg text-foreground">
                Admin Panel
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/admin">
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Buyurtmalar
                  </Button>
                </Link>
                <Link href="/admin/menu">
                  <Button variant="ghost" size="sm">
                    <UtensilsCrossed className="h-4 w-4 mr-2" />
                    Menyu
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">admin@restoran.uz</span>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Chiqish
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
