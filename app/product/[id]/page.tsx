"use client"

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingBag, Shield, Truck, Check, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { getProductById, products } from '@/lib/data'
import { useCartStore } from '@/lib/cart-store'
import { toast } from 'sonner'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const product = getProductById(id)
  const addToCart = useCartStore((state) => state.addToCart)
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Produkt nie znaleziony</h1>
            <Link href="/">
              <Button>Wroc do sklepu</Button>
            </Link>
          </div>
        </main>
        <StoreFooter />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Wybierz wariant produktu')
      return
    }
    
    addToCart(product, selectedVariant, quantity)
    toast.success(`${product.name} dodano do koszyka`)
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-primary/5"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrot
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                )}
                {product.requiresVerification && (
                  <Badge variant="secondary" className="bg-card/90">
                    <Shield className="w-3 h-3 mr-1" />
                    Wymaga weryfikacji
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="text-primary font-medium uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <p className="font-display text-4xl font-bold text-gold-gradient mb-8">
                {product.price.toFixed(2)} zl
              </p>

              {/* Variant Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Wybierz wariant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const inStock = product.stock[variant] > 0
                    return (
                      <button
                        key={variant}
                        onClick={() => inStock && setSelectedVariant(variant)}
                        disabled={!inStock}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedVariant === variant
                            ? 'border-primary bg-primary/10 text-primary'
                            : inStock
                              ? 'border-border hover:border-primary/50 hover:bg-primary/5'
                              : 'border-border/50 text-muted-foreground/50 cursor-not-allowed'
                        }`}
                      >
                        {variant}
                        {!inStock && <span className="ml-2 text-xs">(Brak)</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Ilosc
                </label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-gold-glow mb-6"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Dodaj do koszyka
              </Button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Szybka dostawa</p>
                      <p className="text-xs text-muted-foreground">InPost / H2H</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gwarancja jakosci</p>
                      <p className="text-xs text-muted-foreground">100% oryginalne</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Moze Cie zainteresowac
              </h2>
              <div className="product-grid">
                {relatedProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="group overflow-hidden bg-card border-border hover:border-primary/30 transition-all card-hover">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img 
                          src={product.image || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-display text-lg font-semibold text-primary">
                          {product.price.toFixed(2)} zl
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
