export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  variants: string[]
  stock: Record<string, number>
  requiresVerification: boolean
  featured: boolean
  ageRestricted?: boolean
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  variant: string
  quantity: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'BUCH Premium',
    description: 'Najwyzszej jakosci produkt z limitowanej edycji. Ekskluzywna formula stworzona dla wymagajacych klientow.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618215650201-8d552591218d?w=600',
    category: 'premium',
    variants: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 5, 'M': 10, 'L': 8, 'XL': 3 },
    requiresVerification: true,
    featured: true,
    ageRestricted: false
  },
  {
    id: '2',
    name: 'MEF Classic',
    description: 'Klasyczna wersja dla koneserow. Sprawdzona receptura w eleganckiej formie.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1618215650454-d03cac422c8f?w=600',
    category: 'classic',
    variants: ['Standard', 'Premium'],
    stock: { 'Standard': 20, 'Premium': 8 },
    requiresVerification: false,
    featured: true
  },
  {
    id: '3',
    name: 'KOKO Gold Edition',
    description: 'Zlota edycja z limitowanej serii. Wyjatkowy produkt dla wyjatkowych osob.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1760804876166-aae5861ec7c1?w=600',
    category: 'limited',
    variants: ['Gold', 'Platinum'],
    stock: { 'Gold': 3, 'Platinum': 2 },
    requiresVerification: true,
    featured: true
  },
  {
    id: '4',
    name: 'PIGULY Set',
    description: 'Kompletny zestaw w eleganckim opakowaniu. Idealny na prezent.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1760804876134-a8089aaeccca?w=600',
    category: 'sets',
    variants: ['3-Pack', '5-Pack', '10-Pack'],
    stock: { '3-Pack': 15, '5-Pack': 10, '10-Pack': 5 },
    requiresVerification: false,
    featured: false
  },
  {
    id: '5',
    name: 'BUCH Elite',
    description: 'Najwyzsza polka w naszej ofercie. Dla prawdziwych znawcow.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1702882239258-ab876240f95c?w=600',
    category: 'elite',
    variants: ['Elite', 'Supreme'],
    stock: { 'Elite': 4, 'Supreme': 2 },
    requiresVerification: true,
    featured: true
  },
  {
    id: '6',
    name: 'MEF Starter',
    description: 'Idealny produkt na poczatek przygody. Doskonala jakosc w przystepnej cenie.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1618215649907-b51d8accb1ec?w=600',
    category: 'starter',
    variants: ['Starter', 'Starter+'],
    stock: { 'Starter': 30, 'Starter+': 20 },
    requiresVerification: false,
    featured: false,
    ageRestricted: false
  }
]

export const categories = [
  { id: 'all', name: 'Wszystkie', count: 6 },
  { id: 'premium', name: 'Premium', count: 1 },
  { id: 'classic', name: 'Classic', count: 1 },
  { id: 'limited', name: 'Limited Edition', count: 1 },
  { id: 'sets', name: 'Zestawy', count: 1 },
  { id: 'elite', name: 'Elite', count: 1 },
  { id: 'starter', name: 'Starter', count: 1 }
]

export const deliveryMethods = [
  {
    id: 'inpost',
    name: 'InPost Paczkomat',
    description: 'Dostawa do paczkomatu InPost',
    price: 12.99,
    estimatedDays: '1-2',
    icon: 'Package'
  },
  {
    id: 'h2h',
    name: 'Odbior osobisty (H2H)',
    description: 'Odbior osobisty z weryfikacja tozsamosci',
    price: 0,
    estimatedDays: 'Do ustalenia',
    icon: 'User',
    requiresVerification: true
  }
]

export const paymentMethods = [
  {
    id: 'stripe',
    name: 'Karta platnicza',
    description: 'Visa, Mastercard, American Express',
    icon: 'CreditCard'
  },
  {
    id: 'przelewy24',
    name: 'Przelewy24',
    description: 'Szybki przelew bankowy',
    icon: 'Building'
  },
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Platnosc kodem BLIK',
    icon: 'Smartphone'
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
