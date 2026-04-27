export function CartPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-box bg-base-100 p-6 shadow">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Cart</h1>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => alert('TODO: clear cart (Lesson 1)')}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="rounded-box bg-base-100 p-6 shadow">
        <p className="opacity-70">
          TODO (Lesson 1): show the cart contents from Zustand.
        </p>
      </div>
    </div>
  )
}

