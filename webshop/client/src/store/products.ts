import { create } from 'zustand'
import type { Product } from '../types'
import { mockProducts } from '../data/mockProducts'

interface ProductsState {
  products: Product[]
  addProduct: (product: Product) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: mockProducts,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}))
