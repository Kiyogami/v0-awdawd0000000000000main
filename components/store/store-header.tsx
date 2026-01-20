"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X, Package } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/cart-store'

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const cartCount = mounted ? cart.reduce((count, item) => count + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all">
              <span className="font-display font-bold text-sm sm:text-lg text-primary-foreground">PB</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-semibold text-gold-gradient">
              Prascy Bandyci
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Sklep
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              href="/orders" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Moje zamowienia
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              O nas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* My Orders (Desktop icon) */}
            <Link href="/orders" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-primary/5 hover:text-primary">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10 hover:bg-primary/5 hover:text-primary transition-all hover:scale-105">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5 fade-in">
            <div className="flex flex-col gap-1">
              <Link 
                href="/" 
                className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-3 rounded-lg hover:bg-primary/5"
              >
                <ShoppingBag className="w-5 h-5" />
                Sklep
              </Link>
              <Link 
                href="/orders" 
                className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-3 rounded-lg hover:bg-primary/5"
              >
                <Package className="w-5 h-5" />
                Moje zamowienia
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
