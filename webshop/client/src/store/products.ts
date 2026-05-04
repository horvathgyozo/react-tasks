import { create } from 'zustand'
import type { Product } from '../types'
import products from '../data/products.json'
interface ProductsState {
  products: Product[]
  addProduct: (product: Product) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: products,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}))