"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from './data'

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Product, variant: string, quantity?: number) => void
  removeFromCart: (productId: string, variant: string) => void
  updateQuantity: (productId: string, variant: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            item => item.productId === product.id && item.variant === variant
          )

          if (existingIndex >= 0) {
            const updated = [...state.cart]
            updated[existingIndex].quantity += quantity
            return { cart: updated }
          }

          return {
            cart: [...state.cart, {
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              variant,
              quantity
            }]
          }
        })
      },

      removeFromCart: (productId, variant) => {
        set((state) => ({
          cart: state.cart.filter(
            item => !(item.productId === productId && item.variant === variant)
          )
        }))
      },

      updateQuantity: (productId, variant, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, variant)
          return
        }

        set((state) => ({
          cart: state.cart.map(item =>
            item.productId === productId && item.variant === variant
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'prascy-cart'
    }
  )
)
