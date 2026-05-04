import { ProductCard } from '../components/ProductCard'
import { useProductsStore } from '../store/products'

export function ProductListPage() {
  const { products } = useProductsStore()

  return (
    <div className="space-y-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Products</li>
        </ul>
      </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
    </div>
  )
}

