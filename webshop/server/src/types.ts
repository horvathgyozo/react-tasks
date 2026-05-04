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

export type CreateProductBody = Omit<Product, 'id'> & {
  id?: string
}

export type UpdateProductBody = Partial<Omit<Product, 'id'>>

