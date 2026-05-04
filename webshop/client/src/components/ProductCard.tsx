import { Link } from 'react-router-dom'
import type { Product } from '../types'
// TODO (Lesson 1): import useCartStore from '../store/cart'

export function ProductCard({
  product,
  showActions = true,
}: {
  product: Product
  showActions?: boolean
}) {
  // TODO (Lesson 1): get add and dec actions from useCartStore
  // TODO (Lesson 1): get the qty for this product from the cart
  //   const qty = useCartStore((s) => s.cart.find((i) => i.productId === product.id)?.qty ?? 0)
  const qty = 0 // remove this line once the store is wired

  return (
    <div className="card bg-base-100 shadow">
      <figure className="aspect-[4/3] overflow-hidden bg-base-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm opacity-70">{product.description}</p>
        {showActions ? (
          <div className="mt-2 flex items-end justify-between">
            <div className="font-semibold leading-none">
              {product.priceHuf} HUF
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/products/${product.id}`}
                className="btn btn-ghost btn-sm"
              >
                Details
              </Link>
              {qty > 0 ? (
                <div className="flex items-center gap-1">
                  <button
                    className="btn btn-primary btn-sm btn-square"
                    onClick={() => alert('TODO: dec (Lesson 1)')}
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold">{qty}</span>
                  <button
                    className="btn btn-primary btn-sm btn-square"
                    onClick={() => alert('TODO: add (Lesson 1)')}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => alert('TODO: add to cart (Lesson 1)')}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-2 flex items-end justify-between">
            <div className="font-semibold leading-none">
              {product.priceHuf} HUF
            </div>
            <div className="badge badge-ghost">Preview</div>
          </div>
        )}
      </div>
    </div>
  )
}
