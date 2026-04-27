import { Link, useParams } from 'react-router-dom'
import { useProductQuery } from '../queries/products'

export function ProductDetailPage() {
  const { productId } = useParams()

  if (!productId) {
    return (
      <div className="alert alert-error">
        <span>Missing product id.</span>
      </div>
    )
  }

  const { data: product, isLoading, error } = useProductQuery(productId)

  if (isLoading) {
    return <div className="rounded-box bg-base-100 p-6 shadow">Loading…</div>
  }

  if (error || !product) {
    return (
      <div className="alert alert-error">
        <span>Product not found.</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>{product.name}</li>
        </ul>
      </div>

      <div className="card bg-base-100 shadow">
        <figure className="max-h-[420px] bg-base-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-2xl">{product.name}</h1>
          <p className="opacity-80">{product.description}</p>
          {product.origin || product.preparation ? (
            <div className="mt-3 space-y-3">
              {product.origin ? (
                <div className="badge badge-outline">Origin: {product.origin}</div>
              ) : null}
              {product.preparation ? (
                <div className="rounded-box bg-base-200 p-4">
                  <div className="text-sm font-semibold">Preparation</div>
                  <div className="mt-1 whitespace-pre-wrap text-sm opacity-80">
                    {product.preparation}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-lg font-semibold">{product.priceHuf} HUF</div>
            <button
              className="btn btn-primary"
              onClick={() => alert('TODO: add to cart (Lesson 1)')}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

