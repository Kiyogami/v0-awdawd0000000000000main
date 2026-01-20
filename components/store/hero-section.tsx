import { ArrowRight, Shield, Truck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Collection 2024</span>
          </div>

          {/* Heading */}
          <h1 
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Ekskluzywne produkty
            <span className="block text-gold-gradient">dla wymagajacych</span>
          </h1>

          {/* Description */}
          <p 
            className="text-lg text-muted-foreground mb-8 max-w-lg animate-fade-in" 
            style={{ animationDelay: '200ms' }}
          >
            Witaj w swiecie premium. Najwyzsza jakosc, bezpieczne transakcje 
            i dyskretna dostawa. Zaufaj profesjonalistom.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 mb-12 animate-fade-in" 
            style={{ animationDelay: '300ms' }}
          >
            <Link href="#products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 btn-gold-glow">
                Przegladaj produkty
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#about">
              <Button size="lg" variant="outline" className="border-border hover:bg-card hover:border-primary/50 bg-transparent">
                Dowiedz sie wiecej
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in" 
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Weryfikacja</p>
                <p className="text-xs text-muted-foreground">Bezpieczne transakcje</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">InPost & H2H</p>
                <p className="text-xs text-muted-foreground">Elastyczna dostawa</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Premium</p>
                <p className="text-xs text-muted-foreground">Najwyzsza jakosc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
    </section>
  )
}
