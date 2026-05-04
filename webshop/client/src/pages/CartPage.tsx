export function CartPage() {
  // TODO (Lesson 1): import useCartStore and useProductsStore
  // TODO (Lesson 1): display the cart items, total price and total quantity

  return (
    <div className="space-y-4">
      <div className="rounded-box bg-base-100 p-6 shadow">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">
            {/* TODO: Cart (N items) */}
            Cart
          </h1>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => alert('TODO: clear cart (Lesson 1)')}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="rounded-box bg-base-100 p-6 shadow space-y-3">
        {/* TODO: map over cart items and display each row:
            - product image + name
            - qty × unit price
            - row total
            - Remove button
            Example row structure:
            <div className="flex items-center gap-4">
              <img src={product.imageUrl} className="h-14 w-14 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm opacity-70">{qty} × {product.priceHuf} HUF</div>
              </div>
              <div className="font-semibold">{qty * product.priceHuf} HUF</div>
              <button onClick={() => remove(productId)}>Remove</button>
            </div>
        */}

        <p className="opacity-70 text-sm">No items yet.</p>

        <div className="divider" />

        {/* TODO: show total price */}
        <div className="flex justify-end text-lg font-bold">
          Total: 0 HUF
        </div>
      </div>
    </div>
  )
}
