import { NavLink, Outlet } from 'react-router-dom'
// TODO (Lesson 1 – step 2): import useCartStore from './store/cart'

export function RootLayout() {
  // TODO (Lesson 1 – step 2): subscribe to the cart count
  //   const qty = useCartStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0))
  const qty = 0 // ← replace this with the line above once the store is created

  return (
    <div className="min-h-dvh bg-base-200 text-base-content" data-theme="coffee">
      <div className="navbar bg-base-100 shadow">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4">
          <div className="flex-1 flex items-center gap-2">
            <NavLink to="/" className="btn btn-ghost text-xl">
              MiniShop
            </NavLink>
          </div>
          <div className="flex-none flex items-center gap-2 whitespace-nowrap">
            <NavLink to="/" className="btn btn-ghost">
              Products
            </NavLink>
            <NavLink to="/new" className="btn btn-ghost">
              New product
            </NavLink>
            <span className="mx-1 opacity-40">|</span>

            <NavLink to="/login" className="btn btn-ghost">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline btn-primary">
              Register
            </NavLink>

            <span className="mx-1 opacity-40">|</span>

            <NavLink to="/cart" className="btn btn-primary">
              Cart
              {/* TODO: show badge when qty > 0 */}
              {qty > 0 && <span className="badge badge-sm">{qty}</span>}
            </NavLink>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  )
}
