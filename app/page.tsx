"use client"

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StoreHeader } from '@/components/store/store-header'
import { StoreFooter } from '@/components/store/store-footer'
import { HeroSection } from '@/components/store/hero-section'
import { ProductCard } from '@/components/store/product-card'
import { products, categories } from '@/lib/data'

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                  Kolekcja
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  Nasze produkty
                </h2>
                <p className="text-muted-foreground mt-2 max-w-lg">
                  Odkryj nasza ekskluzywna kolekcje produktow premium. 
                  Kazdy produkt starannie wyselekcjonowany dla wymagajacych klientow.
                </p>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    className={`whitespace-nowrap transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Brak produktow w tej kategorii.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                  O nas
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Prascy Bandyci
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Jestesmy zespolem profesjonalistow, ktorzy stawiaja na jakosc 
                    i bezpieczenstwo. Nasza platforma laczy najlepsze rozwiazania 
                    e-commerce z bezposrednia komunikacja przez Telegram.
                  </p>
                  <p>
                    Oferujemy elastyczne opcje dostawy - od paczkomatow InPost 
                    po bezpieczny odbior osobisty (H2H) z weryfikacja tozsamosci. 
                    Twoje bezpieczenstwo jest dla nas priorytetem.
                  </p>
                  <p>
                    Akceptujemy oficjalne metody platnosci: karty platnicze (Stripe), 
                    przelewy bankowe (Przelewy24) oraz BLIK.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-border group">
                  <img 
                    src="https://images.pexels.com/photos/17419472/pexels-photo-17419472.jpeg?w=600" 
                    alt="Premium lifestyle"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  )
}
