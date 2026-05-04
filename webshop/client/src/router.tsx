import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { CartPage } from './pages/CartPage'
import { LoginPage } from './pages/LoginPage'
import { NewProductPage } from './pages/NewProductPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductListPage } from './pages/ProductListPage'
import { RegisterPage } from './pages/RegisterPage'

const NotFound = (
  <div className="rounded-box bg-base-100 p-6 shadow">
    <h1 className="text-2xl font-bold">404</h1>
    <p className="mt-2 opacity-70">Page not found.</p>
  </div>
)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/new" element={<NewProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={NotFound} />
    </Route>,
  ),
)

