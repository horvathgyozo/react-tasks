import { ProductCard } from '../components/ProductCard'
import { useProductsQuery } from '../queries/products'

export function ProductListPage() {
  const { data, isLoading, error } = useProductsQuery()

  return (
    <div className="space-y-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Products</li>
        </ul>
      </div>

      {isLoading ? (
        <div className="rounded-box bg-base-100 p-6 shadow">Loading…</div>
      ) : error ? (
        <div className="alert alert-error">
          <span>Error: {String(error)}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

