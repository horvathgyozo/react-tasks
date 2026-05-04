# MiniShop – 2x60 min practice (React + Zustand + TanStack Query)

A **tiny coffee-themed webshop** practice split into two lessons:

- **Lesson 1 (60 min)**: Form + Zustand + UI basics
- **Lesson 2 (60 min)**: API + Auth + TanStack Query (real fetch + login)

This folder contains:

- `client/`, `server/` : **STARTER (task)**

## Run

### Frontend (starter)

```bash
cd webshop/client
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

Example of usage of zustand is already provided in the `client/src/store/products.ts` file. You can use it as a reference. It stores the products in a global state and provides actions to add a new product there.


#### 1) Create a new global state for the cart 

- **Goal**: the cart should be saved in a global state and be accessible from all the pages.
- **Recommended minimal state shape**:
  - `cart: Array<{ productId: string; qty: number }>`
  - actions: `add(productId)`, `dec(productId)`, `remove(productId)`, `clear()`
- **Rules**:
  - `add`: increases the quantity (or creates qty=1 if not exists)
  - `dec`: decreases the quantity; if 0, remove the item
  - only `productId` + `qty` should be stored in the store (do not store the full product object)
  - create a new function to calculate the total price of the cart
  - create a new function to calculate the total quantity of the cart
- Docs:
  - Zustand (getting started): https://zustand.docs.pmnd.rs/learn/getting-started/introduction

**Checkpoint**: clicking “Add to cart” increases qty for that product. Check this with console.log the state after the action.

#### 2) Wire the cart page in the UI from the global state

- Cart page:
  - display all the items in the cart
  - display the total price of the cart
  - display the total quantity of the cart
  - display the total number of items in the cart
- Menu bar:
  - display the total number of items in the cart

**Checkpoint**: all the items are displayed in the cart page. Check this with console.log the state after the action. Also check if the total price and quantity are displayed correctly. Also check if the total number of items in the cart is displayed correctly in the menu bar.

#### 3) Wire the “New product” form

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
  - Controlled forms: https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/

**Checkpoint**: save → go back to the main page → product list contains the new product.

### Extra (optional)
- Add a small “toast” after add-to-cart / save




## Lesson 2 (60 min) – API + Auth + TanStack Query

### Run API + Postman (Lesson 2)

### API (starter)

```bash
cd webshop/server
npm install
npm run dev
```

### Postman

You can import the collection and environment from Postman:
https://www.postman.com/winter-equinox-382737/workspace/clientshop

You can also import via the files in this folder:
- `webshop.postman_collection.json`
- `webshop.postman_environment.json`

### Goal

- Add API calls to the products store
- Add login (token) and protect “create product”
- Optional: Wire in registration
- Optional: Wire in update and delete

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

**Checkpoint**: product list and product detail work only when API is running.

#### 2) Login (token) end-to-end

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

- Frontend:
  - protect `/new` with a route loader: if no token → redirect to `/login`
  - create product mutation (TanStack Query):
    - send `Authorization` header
    - on success: invalidate `['products']` and redirect to `/`
- Docs:
  - React Router loaders + redirects: https://reactrouter.com/en/main/route/loader
  - HTTP `Authorization` header: https://developer.mozilla.org/en-US/docs/client/HTTP/Headers/Authorization

**Checkpoint**: logged out → `/new` redirects to `/login`; logged in → create works.

#### 4) Optional: Register

- Implement `POST /auth/register`
- Register page stores token and logs in immediately after successful registration
- **(H) Finish Register (starter)**: implement real registration via API (store token), then update navbar.
- **(I) Full CRUD when logged in**:
  - API: add `PUT /products/:id` and `DELETE /products/:id` (JWT protected)
  - Web: add an “Edit product” page and allow delete from the product detail page
  - Postman: add requests for update + delete using the token

