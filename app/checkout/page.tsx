"use client"

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Package, User, CreditCard, Building, Smartphone, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { useCartStore } from '@/lib/cart-store'
import { deliveryMethods, paymentMethods } from '@/lib/data'
import { toast } from 'sonner'

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />
}

export default function CheckoutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  
  const [selectedDelivery, setSelectedDelivery] = useState('inpost')
  const [selectedPayment, setSelectedPayment] = useState('stripe')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartTotal = mounted ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0
  const deliveryFee = deliveryMethods.find(d => d.id === selectedDelivery)?.price || 0
  const total = cartTotal + deliveryFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Wypelnij wszystkie wymagane pola')
      return
    }

    // Simulate order creation
    toast.success('Zamowienie zostalo zlozone!')
    clearCart()
    router.push('/orders')
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-card rounded-lg w-48" />
              <div className="h-64 bg-card rounded-lg" />
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
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Koszyk jest pusty</h1>
            <Link href="/">
              <Button>Wroc do sklepu</Button>
            </Link>
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
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-primary/5"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrot
          </Button>

          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Finalizacja zamowienia</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Dane kontaktowe
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Imie *</Label>
                        <Input 
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Jan"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nazwisko *</Label>
                        <Input 
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Kowalski"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jan@example.com"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+48 123 456 789"
                        className="mt-1.5"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Method */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Metoda dostawy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deliveryMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedDelivery(method.id)}
                        className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                          selectedDelivery === method.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedDelivery === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {iconMap[method.icon]}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {method.price === 0 ? 'Gratis' : `${method.price.toFixed(2)} zl`}
                          </p>
                          <p className="text-xs text-muted-foreground">{method.estimatedDays} dni</p>
                        </div>
                        {selectedDelivery === method.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}

                    {selectedDelivery === 'inpost' && (
                      <div className="mt-4">
                        <Label htmlFor="address">Adres paczkomatu</Label>
                        <Input 
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="np. WAW123"
                          className="mt-1.5"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Metoda platnosci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedPayment === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {iconMap[method.icon]}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-card sticky top-24">
                  <CardHeader>
                    <CardTitle className="font-display">Twoje zamowienie</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.productId}-${item.variant}`} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={item.image || "/placeholder.svg"} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.variant} x {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">{(item.price * item.quantity).toFixed(2)} zl</p>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Produkty</span>
                        <span className="font-medium">{cartTotal.toFixed(2)} zl</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dostawa</span>
                        <span className="font-medium">
                          {deliveryFee === 0 ? 'Gratis' : `${deliveryFee.toFixed(2)} zl`}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Do zaplaty</span>
                      <span className="font-display text-xl font-bold text-gold-gradient">
                        {total.toFixed(2)} zl
                      </span>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-gold-glow"
                    >
                      Zamawiam i place
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Skladajac zamowienie akceptujesz regulamin sklepu
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
