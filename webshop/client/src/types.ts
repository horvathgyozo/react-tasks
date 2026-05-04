export type ProductId = string

export type Product = {
  id: ProductId
  name: string
  priceHuf: number
  imageUrl: string
  description: string
  origin?: string
  preparation?: string
}

