import { queryOptions, useQuery } from '@tanstack/react-query'
import products from '../data/products.json'
import type { Product, ProductId } from '../types'

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function getProducts(): Promise<Product[]> {
  await sleep(150)
  return products as Product[]
}

async function getProductById(productId: ProductId): Promise<Product> {
  await sleep(120)
  const product = (products as Product[]).find((p) => p.id === productId)
  if (!product) throw new Error('Product not found')
  return product
}

export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: getProducts,
})

export function productQueryOptions(productId: ProductId) {
  return queryOptions({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
  })
}

export function useProductsQuery() {
  return useQuery(productsQueryOptions)
}

export function useProductQuery(productId: ProductId) {
  return useQuery(productQueryOptions(productId))
}

