import { Link, useParams } from 'react-router-dom'
import { useProductsStore } from '../store/products'
// TODO (Lesson 1 – step 2): import useCartStore from '../store/cart'

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const { products } = useProductsStore()

  const product = products.find((p) => p.id === productId)

  // TODO (Lesson 1 – step 2): get add from useCartStore
  // TODO (Lesson 1 – step 2): get the qty for this product (same pattern as ProductCard)

  if (!product) {
    return (
      <div className="rounded-box bg-base-100 p-6 shadow">
        <p className="opacity-70">Product not found.</p>
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
            {/* TODO (Lesson 1 – step 2): same - qty + pattern as ProductCard */}
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
