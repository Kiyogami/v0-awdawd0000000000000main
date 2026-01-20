"use client"

import Link from 'next/link'
import { Package, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'

// Mock orders for demo
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: [
      { name: 'BUCH Premium', variant: 'L', quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-12',
    status: 'shipped',
    total: 749.97,
    items: [
      { name: 'MEF Classic', variant: 'Standard', quantity: 2 },
      { name: 'PIGULY Set', variant: '3-Pack', quantity: 1 }
    ]
  }
]

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: 'Oczekujace', className: 'status-pending' },
  processing: { label: 'W realizacji', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  shipped: { label: 'Wyslane', className: 'bg-primary/15 text-primary border-primary/30' },
  delivered: { label: 'Dostarczone', className: 'status-approved' }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Moje zamowienia</h1>
          
          {mockOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Brak zamowien</h2>
              <p className="text-muted-foreground mb-6">Nie masz jeszcze zadnych zamowien</p>
              <Link href="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Przegladaj produkty
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge className={statusLabels[order.status]?.className}>
                        {statusLabels[order.status]?.label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} ({item.variant}) x {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-medium">Suma</span>
                      <span className="font-display text-lg font-bold text-primary">
                        {order.total.toFixed(2)} zl
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
