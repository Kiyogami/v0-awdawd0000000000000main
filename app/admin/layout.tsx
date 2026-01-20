"use client"

import React from "react"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Shield, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Zamowienia' },
  { href: '/admin/products', icon: Package, label: 'Produkty' },
  { href: '/admin/verifications', icon: Shield, label: 'Weryfikacje' },
  { href: '/admin/settings', icon: Settings, label: 'Ustawienia' }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-bold text-lg text-primary-foreground">PB</span>
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-gold-gradient block">
                Admin Panel
              </span>
              <span className="text-xs text-muted-foreground">Prascy Bandyci</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname?.startsWith(item.href))
            
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-3 ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-primary border-l-2 border-sidebar-primary rounded-l-none' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
              <LogOut className="w-5 h-5" />
              Wroc do sklepu
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
