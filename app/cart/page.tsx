"use client"

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { useCartStore } from '@/lib/cart-store'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartTotal = mounted ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0
  const deliveryFee = 12.99

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl font-bold text-foreground mb-8">Koszyk</h1>
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-card rounded-lg" />
              <div className="h-24 bg-card rounded-lg" />
            </div>
          </div>
        </main>
        <StoreFooter />
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl font-bold text-foreground mb-8">Koszyk</h1>
            
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Twoj koszyk jest pusty</h2>
              <p className="text-muted-foreground mb-6">Dodaj produkty, aby kontynuowac zakupy</p>
              <Link href="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Przegladaj produkty
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <StoreFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Koszyk</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={`${item.productId}-${item.variant}`} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Wariant: {item.variant}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.productId, item.variant)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="font-display text-lg font-semibold text-primary">
                            {(item.price * item.quantity).toFixed(2)} zl
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-card sticky top-24">
                <CardHeader>
                  <CardTitle className="font-display">Podsumowanie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Produkty ({cart.length})</span>
                    <span className="font-medium">{cartTotal.toFixed(2)} zl</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dostawa</span>
                    <span className="font-medium">od {deliveryFee.toFixed(2)} zl</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Razem</span>
                    <span className="font-display text-xl font-bold text-gold-gradient">
                      {(cartTotal + deliveryFee).toFixed(2)} zl
                    </span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-gold-glow">
                      Przejdz do kasy
                    </Button>
                  </Link>
                  
                  <Link href="/" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Kontynuuj zakupy
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
