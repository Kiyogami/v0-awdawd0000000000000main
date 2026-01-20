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
    name: 'BUCH Premium Hoodie',
    description: 'Najwyzszej jakosci bluza z limitowanej edycji. Wykonana z premium bawelny z ekskluzywnym zlotym haftem.',
    price: 299.99,
    image: '/products/product-1.jpg',
    category: 'premium',
    variants: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 5, 'M': 10, 'L': 8, 'XL': 3 },
    requiresVerification: false,
    featured: true,
    ageRestricted: false
  },
  {
    id: '2',
    name: 'MEF Classic Tee',
    description: 'Klasyczna koszulka dla koneserow. Sprawdzony design w eleganckiej, minimalistycznej formie.',
    price: 149.99,
    image: '/products/product-2.jpg',
    category: 'classic',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { 'S': 20, 'M': 25, 'L': 20, 'XL': 15, 'XXL': 8 },
    requiresVerification: false,
    featured: true
  },
  {
    id: '3',
    name: 'KOKO Gold Cap',
    description: 'Zlota edycja czapki z limitowanej serii. Wyjatkowy dodatek dla wyjatkowych osob.',
    price: 199.99,
    image: '/products/product-3.jpg',
    category: 'limited',
    variants: ['One Size', 'Fitted'],
    stock: { 'One Size': 10, 'Fitted': 5 },
    requiresVerification: false,
    featured: true
  },
  {
    id: '4',
    name: 'Premium Gift Set',
    description: 'Kompletny zestaw w eleganckim opakowaniu. Idealny na prezent dla fana streetwearu.',
    price: 449.99,
    image: '/products/product-4.jpg',
    category: 'sets',
    variants: ['Essential', 'Deluxe', 'Ultimate'],
    stock: { 'Essential': 15, 'Deluxe': 10, 'Ultimate': 5 },
    requiresVerification: false,
    featured: false
  },
  {
    id: '5',
    name: 'BUCH Elite Jacket',
    description: 'Najwyzsza polka w naszej ofercie. Skorzana kurtka dla prawdziwych znawcow streetwearu.',
    price: 899.99,
    image: '/products/product-5.jpg',
    category: 'elite',
    variants: ['M', 'L', 'XL'],
    stock: { 'M': 4, 'L': 6, 'XL': 3 },
    requiresVerification: true,
    featured: true
  },
  {
    id: '6',
    name: 'Starter Collection',
    description: 'Idealny zestaw na poczatek przygody ze streetwearem. Doskonala jakosc w przystepnej cenie.',
    price: 199.99,
    image: '/products/product-6.jpg',
    category: 'starter',
    variants: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 30, 'M': 35, 'L': 30, 'XL': 20 },
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
    id: 'courier',
    name: 'Kurier DPD',
    description: 'Dostawa kurierem pod wskazany adres',
    price: 19.99,
    estimatedDays: '1-3',
    icon: 'Truck'
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
