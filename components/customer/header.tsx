"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSidebar } from "./cart-sidebar"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-xl text-foreground">O'zbek Oshxonasi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Bosh sahifa
            </Link>
            <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
              Menyu
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              Biz haqimizda
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative bg-transparent">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                  <span className="sr-only">Savatcha</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <CartSidebar />
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menyu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bosh sahifa
              </Link>
              <Link
                href="/menu"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menyu
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Biz haqimizda
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
