# MiniShop – 2x60 min practice (React + Zustand + TanStack Query + Fastify)

A **tiny coffee-themed webshop** practice split into two lessons:

- **Lesson 1 (60 min)**: Form + Zustand + UI basics
- **Lesson 2 (60 min)**: API + Auth + TanStack Query (real fetch + login)

This folder contains:

- `web/`, `api/`, `postman/`: **STARTER (task)**

## Run

### Frontend (starter)

```bash
cd webshop/web
npm install
npm run dev
```

## Lesson 1 (60 min) – Form + Zustand (starter)

### Goal

- Product list (UI provided)
- Product detail page (UI provided)
- Cart state in Zustand (**you implement it**)
- New product form (wire it up)

### Step-by-step tasks (Lesson 1)

#### 1) Build a cart store with Zustand

- **Goal**: “Add to cart” should actually change state and show up on the cart page.
- **Recommended minimal cart shape**:
  - `items: Array<{ productId: string; qty: number }>`
  - actions: `add(productId)`, `dec(productId)`, `remove(productId)`, `clear()`
- **Rules**:
  - `add` increases quantity (or creates item with qty=1)
  - `dec` decreases quantity, remove the item if qty hits 0
  - store only `productId` + `qty` (do not store full product objects)
- Docs:
  - Zustand (getting started): https://zustand.docs.pmnd.rs/getting-started/introduction
  - Persist middleware (optional extra): https://zustand.docs.pmnd.rs/middlewares/persist

**Checkpoint**: clicking “Add to cart” increases qty for that product.

#### 2) Wire “Add to cart” in the UI

- Product list/cards:
  - “Add to cart” calls `add(productId)`
  - optional: show `- qty +` controls when qty > 0
- Product detail page:
  - “Add to cart” adds one item
- Docs:
  - React Router `Link` and routing basics: https://reactrouter.com/en/main/start/tutorial

**Checkpoint**: add from list and from detail both work.

#### 3) Implement the cart page

- Show a list/table with:
  - product name
  - qty
  - price
  - line total
- Add actions:
  - Clear cart
  - Remove line
  - optional: `- / +` qty controls
- Compute and show cart total.

**Checkpoint**: totals update correctly when quantities change.

#### 4) Wire the “New product” form

- **Goal**: after “Save”, the new product appears on the product list.
- Implement form state:
  - controlled inputs (`useState`) OR
  - read `FormData` on submit
- Decide where to store new products (Lesson 1 suggestions):
  - Option A: create a `productsStore` in Zustand
  - Option B: keep products in a parent component state and pass down
- Add minimal validation:
  - name required
  - price is a number and \(> 0\)
  - description min length (e.g. 10)
- Docs:
  - React forms: https://react.dev/reference/react-dom/components/input
  - `FormData`: https://developer.mozilla.org/en-US/docs/Web/API/FormData

**Checkpoint**: save → go back to `/` → product list contains the new product.

### Extra (optional)

- Persist the cart (localStorage with Zustand `persist`)
- Add a small “toast” after add-to-cart / save

## Lesson 2 (60 min) – API + Auth + TanStack Query

### Run API + Postman (Lesson 2)

### API (starter)

```bash
cd webshop/api
npm install
npm run dev
```

### Postman

Import:

- `postman/webshop.postman_collection.json`
- `postman/webshop.postman_environment.json`

### Goal

- Replace mocks in `web/src/queries/products.ts` with real API calls
- Add login (token) and protect “create product”

### Step-by-step tasks (Lesson 2)

#### 0) Confirm the API works

- Start the API (see above).
- In Postman run:
  - `Health`
  - `Products - list`
- Docs:
  - Postman collections: https://learning.postman.com/docs/collections/using-collections/overview/

**Checkpoint**: `/products` returns `{ items: [...] }`.

#### 1) Fetch products via TanStack Query

- Create an API client helper (fetch wrapper):
  - base URL: `VITE_API_URL` (fallback `http://localhost:3001`)
  - parse JSON
  - on error status: throw a useful error (status + message)
- Implement product queries:
  - `useProductsQuery()` → `GET /products` → return `items`
  - `useProductQuery(productId)` → `GET /products/:id`
- Docs:
  - TanStack Query (React): https://tanstack.com/query/latest/docs/framework/react/overview
  - Queries: https://tanstack.com/query/latest/docs/framework/react/guides/queries
  - Environment variables in Vite: https://vite.dev/guide/env-and-mode.html
  - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

**Checkpoint**: product list and product detail work only when API is running.

#### 2) Login (token) end-to-end

- API:
  - implement `POST /auth/login` that returns `{ token, user }`
- Frontend:
  - login form calls the API
  - store `token` in Zustand (persisted)
  - navbar state:
    - logged out: show `Login | Register`
    - logged in: show `Logout`
  - logout clears token and redirects to `/`
- Docs:
  - Fastify: https://fastify.dev/docs/latest/
  - @fastify/jwt: https://github.com/fastify/fastify-jwt
  - TanStack Query mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

**Checkpoint**: refresh the page and you stay logged in.

#### 3) Protect create product + send token

- API:
  - protect `POST /products` with JWT (`Authorization: Bearer <token>`)
- Frontend:
  - protect `/new` with a route loader: if no token → redirect to `/login`
  - create product mutation (TanStack Query):
    - send `Authorization` header
    - on success: invalidate `['products']` and redirect to `/`
- Docs:
  - React Router loaders + redirects: https://reactrouter.com/en/main/route/loader
  - HTTP `Authorization` header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

**Checkpoint**: logged out → `/new` redirects to `/login`; logged in → create works.

#### 4) Optional: Register

- Implement `POST /auth/register`
- Register page stores token and logs in immediately after successful registration


## Extra tasks (after the lessons)

- **(H) Finish Register (starter)**: implement real registration via API (store token), then update navbar.
- **(I) Full CRUD when logged in**:
  - API: add `PUT /products/:id` and `DELETE /products/:id` (JWT protected)
  - Web: add an “Edit product” page and allow delete from the product detail page
  - Postman: add requests for update + delete using the token

