# MiniShop – 2x60 min practice (React + Zustand + TanStack Query + Fastify)

A **tiny coffee-themed webshop** practice split into two lessons:

- **Lesson 1 (60 min)**: Form + Zustand + UI basics
- **Lesson 2 (60 min)**: API + Auth + TanStack Query (real fetch + login)

This folder contains:

- `client/`, `server/` : **STARTER (task)**

## Run

### Frontend

```bash
cd webshop/client
npm install
npm run dev
```

### API (Lesson 2)

```bash
cd webshop/server
npm install
npm run dev
```

---

## Lesson 1 (60 min) – Form + Zustand

### Goal

- Product list (UI provided)
- Product detail page (UI provided)
- Cart state in Zustand (**you implement it**)
- New product form (wire it up)

### Step-by-step tasks (Lesson 1)

An example of Zustand usage is already provided in `client/src/store/products.ts`. It stores the products in a global state and provides actions to add a new product. Use it as a reference.

#### 1) Create a new global state for the cart

- **Goal**: the cart should be saved in a global state and be accessible from all pages.
- **File to create**: `client/src/store/cart.ts`
- **Recommended minimal state shape**:
  - `cart: Array<{ productId: string; qty: number }>`
  - actions: `add(productId)`, `dec(productId)`, `remove(productId)`, `clear()`
- **Rules**:
  - `add`: increases the quantity (or creates qty=1 if not yet in cart)
  - `dec`: decreases the quantity; if qty reaches 0, remove the item
  - only `productId` + `qty` should be stored (do not store the full product object)
  - add a function to calculate the total quantity of the cart
  - add a function to calculate the total price of the cart (hint: it needs to receive the `products` array to look up prices)
- Docs:
  - Zustand (getting started): https://zustand.docs.pmnd.rs/learn/getting-started/introduction

**Checkpoint**: clicking "Add to cart" increases qty for that product. Check with `console.log` after the action.

#### 2) Wire the `ProductCard` and the navbar

- **Files to update**: `client/src/components/ProductCard.tsx`, `client/src/layout/RootLayout.tsx`
- `ProductCard`:
  - when qty is 0: show "Add to cart" button
  - when qty > 0: replace the button with inline `− {qty} +` controls
  - `−` calls `dec(productId)`, `+` calls `add(productId)`
  - ⚠️ To get a reactive qty, subscribe **to the value directly**:
    ```ts
    const qty = useCartStore((s) => s.cart.find((i) => i.productId === product.id)?.qty ?? 0)
    ```
    (Selecting the `totalQty` function won't trigger re-renders when the cart changes!)
- Menu bar (`RootLayout`):
  - show a badge with the total item count next to the Cart link
  - ⚠️ Same reactivity rule — subscribe to the cart array:
    ```ts
    const qty = useCartStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0))
    ```

**Checkpoint**: click "Add to cart" → button changes to `− 1 +`. Click `+` → becomes `− 2 +`. Navbar badge updates instantly.

#### 3) Wire the cart page from the global state

- **File to update**: `client/src/pages/CartPage.tsx`
- Display each cart item as a row:
  - product image + name (look up product from `useProductsStore` by id)
  - `qty × unit price HUF`
  - row total (qty × price)
  - Remove button
- Show total price at the bottom
- "Clear all" button empties the cart

**Checkpoint**: cart page shows all items. Adjusting qty on the product card is immediately reflected here.

#### 4) Wire the "New product" form

- **File to update**: `client/src/pages/NewProductPage.tsx`
- **Goal**: after "Save", the new product appears on the product list.
- Implement form state using controlled inputs (`useState` + `value` + `onChange`)
- On submit, call `addProduct` from `useProductsStore` and navigate back to `/`
- Add minimal validation:
  - name: required
  - price: must be a number and > 0
  - description: min 10 characters
- Show validation errors below the relevant input
- Docs:
  - Controlled forms: https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/

**Checkpoint**: save → go back to the main page → the product list contains the new product.

### Extra (optional, Lesson 1)

- Add a small "toast" after add-to-cart / save

---

## Lesson 2 (60 min) – API + Auth + TanStack Query

> **The API is fully pre-built.** You only need to write frontend code in this lesson.

### Run the API + Postman

Start the API (see top of this file), then import the Postman collection:
https://www.postman.com/winter-equinox-382737/workspace/webshop

You can also import via the files in this folder:
1. Import `webshop.postman_collection.json`
2. Import `webshop.postman_environment.json`

### Goal

- Replace mock data with real API calls (TanStack Query)
- Add login (token) and protect "create product"
- Wire in registration

### Step-by-step tasks (Lesson 2)

#### 0) Wrap the app with `QueryClientProvider`

Before anything else, set up TanStack Query in `client/src/main.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// wrap <RouterProvider> with:
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
```

Then confirm the API is running. In Postman run:
- `Health`
- `Products - list`

**Checkpoint**: `/products` returns `{ items: [...] }`.

#### 1) Fetch products via TanStack Query

- **Files to create**: `client/src/lib/api.ts`, `client/src/lib/queries.ts` (or similar)
- Create an API client helper (fetch wrapper):
  - base URL: `VITE_API_URL` env variable (fallback `http://localhost:3001`)
  - parse JSON response
  - on error status: throw a useful error (status + message from response body)
- Implement product query hooks:
  - `useProductsQuery()` → `GET /products` → the response is `{ items: Product[] }`, return `items`
  - `useProductQuery(productId)` → `GET /products/:id`
- Use the hooks in `ProductListPage` and `ProductDetailPage` (replace the store/json import)
- Show a loading spinner while `isPending` is true
- Show an error message if `isError` is true
- Docs:
  - TanStack Query (React): https://tanstack.com/query/latest/docs/framework/react/overview
  - Queries: https://tanstack.com/query/latest/docs/framework/react/guides/queries
  - Environment variables in Vite: https://vite.dev/guide/env-and-mode.html

**Checkpoint**: product list and product detail work only when the API is running. Stopping the server shows the error state.

#### 2) Login (token) end-to-end

- **Files to create**: `client/src/store/auth.ts`
- **Files to update**: `client/src/pages/LoginPage.tsx`, `client/src/layout/RootLayout.tsx`
- Auth store (Zustand, **persisted** so it survives page refresh):
  - `token: string | null`
  - `setToken(token)`, `logout()`
  - Use `persist` from `zustand/middleware`: `create<AuthState>()(persist(...))`
- Login page:
  - on submit, call `POST /auth/login` with `{ email, password }`
  - on success, save the token with `setToken` and navigate to `/`
  - show an error message if the request fails
- Navbar state:
  - logged out: show `Login | Register`
  - logged in: show `Logout`
  - logout: call `logout()` from the store, then navigate to `/`
- Demo credentials: `demo@demo.hu` / `demo`
- Docs:
  - TanStack Query mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  - Zustand persist: https://zustand.docs.pmnd.rs/integrations/persisting-store-data

**Checkpoint**: log in → refresh the page → you remain logged in. Logout clears the session.

#### 3) Protect "create product" + send token

- **Files to update**: `client/src/router.tsx`, `client/src/pages/NewProductPage.tsx`
- Router: add a `loader` to the `/new` route — if no token, redirect to `/login`
  ```tsx
  loader={() => {
    const token = useAuthStore.getState().token  // access store outside React
    if (!token) return redirect('/login')
    return null
  }}
  ```
- New product page: use a TanStack Query mutation to call `POST /products`
  - send `Authorization: Bearer <token>` header
  - on success: invalidate `['products']` query and navigate to `/`
- Docs:
  - React Router loaders + redirects: https://reactrouter.com/en/main/route/loader
  - HTTP `Authorization` header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

**Checkpoint**: logged out → `/new` redirects to `/login`; logged in → create works and the new product appears in the list.

#### 4) Optional: Register

- Wire `client/src/pages/RegisterPage.tsx` to call `POST /auth/register` with `{ email, password }`
- On success, store the token and navigate to `/` (same as login)

---

## Extra tasks (after the lessons)

- **(H) Finish Register**: implement real registration via API (store token), then update navbar.
- **(I) Full CRUD when logged in**:
  - API endpoints already exist: `PUT /products/:id` and `DELETE /products/:id` (JWT protected)
  - Web: add an "Edit product" page and allow delete from the product detail page
  - Postman: test update and delete using the saved token
