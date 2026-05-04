# MiniShop – 2×60 perces gyakorlat (React + Zustand + TanStack Query + Fastify)

Egy **kávétemájú mini webshop** gyakorlat, két leckére bontva:

- **1. lecke (60 perc)**: Form + Zustand + UI alapok
- **2. lecke (60 perc)**: API + Auth + TanStack Query (valódi fetch + bejelentkezés)

Ez a mappa tartalmazza:

- `client/`, `server/`: **STARTER (feladat)**
- `solutions/lesson1/`, `solutions/lesson2/`: **referencia megoldások** (csak elakadás esetén nézd meg)

## Indítás

### Frontend

```bash
cd webshop/client
npm install
npm run dev
```

### API (2. lecke)

```bash
cd webshop/server
npm install
npm run dev
```

---

## 1. lecke (60 perc) – Form + Zustand

### Cél

- Terméklista (UI adott)
- Termék részletes oldal (UI adott)
- Kosár állapot Zustandban (**te implementálod**)
- Új termék form (bekötés)

### Lépések (1. lecke)

A Zustand használatára már van egy példa a `client/src/store/products.ts` fájlban. Ez globális állapotban tárolja a termékeket és tartalmaz egy akciót új termék hozzáadásához. Használd referenciaként.

#### 1) Hozz létre globális állapotot a kosárnak

- **Cél**: a kosár globális állapotban legyen tárolva és minden oldalról elérhető legyen.
- **Létrehozandó fájl**: `client/src/store/cart.ts`
- **Ajánlott minimális állapot struktúra**:
  - `cart: Array<{ productId: string; qty: number }>`
  - akciók: `add(productId)`, `dec(productId)`, `remove(productId)`, `clear()`
- **Szabályok**:
  - `add`: növeli a mennyiséget (vagy qty=1-et hoz létre, ha még nincs a kosárban)
  - `dec`: csökkenti a mennyiséget; ha qty eléri a 0-t, távolítsa el az elemet
  - csak `productId` + `qty` kerüljön a store-ba (ne tárolj teljes termék objektumot)
  - adj hozzá egy függvényt a kosár összes darabszámának kiszámításához
  - adj hozzá egy függvényt a kosár összértékének kiszámításához (tipp: meg kell kapnia a `products` tömböt az árak kikereséshez)
- Docs:
  - Zustand (első lépések): https://zustand.docs.pmnd.rs/learn/getting-started/introduction

**Ellenőrzés**: az „Add to cart" gombra kattintva nő az adott termék qty értéke. Ellenőrizd `console.log`-gal az akció után.

#### 2) Kösd be a `ProductCard`-ot és a navigációt

- **Módosítandó fájlok**: `client/src/components/ProductCard.tsx`, `client/src/layout/RootLayout.tsx`
- `ProductCard`:
  - ha qty = 0: jelenjen meg az „Add to cart" gomb
  - ha qty > 0: cseréld le a gombot `− {qty} +` vezérlőkre
  - `−` hívja a `dec(productId)`-t, `+` hívja az `add(productId)`-t
  - ⚠️ A reaktív qty-hez közvetlenül az értékre iratkozz fel:
    ```ts
    const qty = useCartStore((s) => s.cart.find((i) => i.productId === product.id)?.qty ?? 0)
    ```
    (A `totalQty` függvény kiválasztása nem vált ki újrarenderelést, ha a kosár változik!)
- Navigációs sáv (`RootLayout`):
  - jelenítsd meg az összes darabszámot badge-ként a Cart link mellett
  - ⚠️ Ugyanaz a reaktivitási szabály — iratkozz fel közvetlenül a cart tömbre:
    ```ts
    const qty = useCartStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0))
    ```

**Ellenőrzés**: kattints „Add to cart"-ra → a gomb `− 1 +`-ra változik. Kattints `+`-ra → `− 2 +` lesz. A navigációs sáv badge azonnal frissül.

#### 3) Kösd be a kosár oldalt a globális állapotból

- **Módosítandó fájl**: `client/src/pages/CartPage.tsx`
- Jelenítsd meg minden kosárelemet sorként:
  - termék kép + név (keresd ki `useProductsStore`-ból id alapján)
  - `qty × egységár HUF`
  - sor összeg (qty × ár)
  - Remove gomb
- Mutasd a teljes összeget alul
- A „Clear all" gomb ürítse ki a kosarat

**Ellenőrzés**: a kosár oldal mutatja az összes elemet. A termékkártyán változtatott qty azonnal megjelenik itt is.

#### 4) Kösd be az „Új termék" formot

- **Módosítandó fájl**: `client/src/pages/NewProductPage.tsx`
- **Cél**: a „Save" után az új termék megjelenjen a terméklistán.
- Implementálj form állapotot controlled inputokkal (`useState` + `value` + `onChange`)
- Beküldéskor hívd az `addProduct`-ot az `useProductsStore`-ból és navigálj vissza `/`-re
- Adj hozzá minimális validációt:
  - név: kötelező
  - ár: szám és > 0
  - leírás: legalább 10 karakter
- Jelenítsd meg a validációs hibákat az adott input alatt
- Docs:
  - Controlled forms: https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/

**Ellenőrzés**: mentés → vissza a főoldalra → a terméklistán szerepel az új termék.

### Extra (opcionális, 1. lecke)

- Adj hozzá egy kis „toast" értesítést kosárba adás / mentés után

---

## 2. lecke (60 perc) – API + Auth + TanStack Query

> **Az API teljesen előre elkészített.** Ebben a leckében csak frontend kódot kell írni.

### API + Postman indítása

Indítsd el az API-t (lásd fent), majd importáld a Postman collection-t:

1. Importáld: `webshop.postman_collection.json`
2. Importáld: `webshop.postman_environment.json`

### Cél

- Cseréld le a mock adatokat valódi API hívásokra (TanStack Query)
- Adj hozzá bejelentkezést (token) és védd meg az „új termék" oldalt
- Kösd be a regisztrációt

### Lépések (2. lecke)

#### 0) Csomagold be az alkalmazást `QueryClientProvider`-rel

Először állítsd be a TanStack Query-t a `client/src/main.tsx`-ben:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// csomagold be a <RouterProvider>-t:
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
```

Majd ellenőrizd, hogy fut-e az API. Postmanben futtasd:
- `Health`
- `Products - list`

**Ellenőrzés**: a `/products` visszaad `{ items: [...] }` formátumban.

#### 1) Termékek lekérése TanStack Query-vel

- **Létrehozandó fájlok**: `client/src/lib/api.ts`, `client/src/lib/queries.ts` (vagy hasonló)
- Hozz létre egy API kliens segédfüggvényt (fetch wrapper):
  - base URL: `VITE_API_URL` env változó (fallback: `http://localhost:3001`)
  - JSON válasz parse-olása
  - hiba státusz esetén: dobj értelmes hibát (státusz + üzenet a válasz body-jából)
- Implementálj termék query hook-okat:
  - `useProductsQuery()` → `GET /products` → a válasz `{ items: Product[] }`, térj vissza `items`-szel
  - `useProductQuery(productId)` → `GET /products/:id`
- Használd a hook-okat a `ProductListPage`-ben és a `ProductDetailPage`-ben (cseréld le a store/json importot)
- Mutass töltő spinner-t, amíg `isPending` igaz
- Mutass hibaüzenetet, ha `isError` igaz
- Docs:
  - TanStack Query (React): https://tanstack.com/query/latest/docs/framework/react/overview
  - Lekérdezések: https://tanstack.com/query/latest/docs/framework/react/guides/queries
  - Környezeti változók Vite-ban: https://vite.dev/guide/env-and-mode.html

**Ellenőrzés**: a terméklista és a termék részletes oldal csak akkor működik, ha az API fut. A szerver leállítása megmutatja a hiba állapotot.

#### 2) Bejelentkezés (token) végig

- **Létrehozandó fájl**: `client/src/store/auth.ts`
- **Módosítandó fájlok**: `client/src/pages/LoginPage.tsx`, `client/src/layout/RootLayout.tsx`
- Auth store (Zustand, **perzisztált**, hogy túlélje az oldal újratöltést):
  - `token: string | null`
  - `setToken(token)`, `logout()`
  - Használj `persist`-et a `zustand/middleware`-ből: `create<AuthState>()(persist(...))`
- Login oldal:
  - beküldéskor hívj `POST /auth/login`-t `{ email, password }` adatokkal
  - sikeres válasz esetén mentsd el a tokent `setToken`-nel és navigálj `/`-re
  - mutass hibaüzenetet, ha a kérés sikertelen
- Navigációs sáv állapota:
  - kijelentkezve: mutasd `Login | Register`-t
  - bejelentkezve: mutasd `Logout`-ot
  - kijelentkezés: hívd a `logout()`-ot a store-ból, majd navigálj `/`-re
- Demo adatok: `demo@demo.hu` / `demo`
- Docs:
  - TanStack Query mutációk: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  - Zustand persist: https://zustand.docs.pmnd.rs/integrations/persisting-store-data

**Ellenőrzés**: bejelentkezés → oldal újratöltése → bejelentkezve maradsz. Kijelentkezés törli a munkamenetet.

#### 3) Védett „új termék" oldal + token küldése

- **Módosítandó fájlok**: `client/src/router.tsx`, `client/src/pages/NewProductPage.tsx`
- Router: adj hozzá `loader`-t a `/new` route-hoz — ha nincs token, irányítsd át `/login`-ra
  ```tsx
  loader={() => {
    const token = useAuthStore.getState().token  // store elérése React-en kívül
    if (!token) return redirect('/login')
    return null
  }}
  ```
- Új termék oldal: használj TanStack Query mutációt a `POST /products` híváshoz
  - küldj `Authorization: Bearer <token>` fejlécet
  - sikeres válasz esetén: érvénytelenítsd a `['products']` query-t és navigálj `/`-re
- Docs:
  - React Router loaderek + átirányítás: https://reactrouter.com/en/main/route/loader
  - HTTP `Authorization` fejléc: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

**Ellenőrzés**: kijelentkezve → `/new` átirányít `/login`-ra; bejelentkezve → a létrehozás működik és az új termék megjelenik a listán.

#### 4) Opcionális: Regisztráció

- Kösd be a `client/src/pages/RegisterPage.tsx`-t: hívjon `POST /auth/register`-t `{ email, password }` adatokkal
- Sikeres válasz esetén mentsd el a tokent és navigálj `/`-re (ugyanúgy mint a bejelentkezésnél)

---

## Extra feladatok (leckék után)

- **(H) Regisztráció befejezése**: implementálj valódi regisztrációt az API-n keresztül (token mentése), majd frissítsd a navigációs sávot.
- **(I) Teljes CRUD bejelentkezés után**:
  - Az API végpontok már léteznek: `PUT /products/:id` és `DELETE /products/:id` (JWT védett)
  - Web: adj hozzá „Termék szerkesztése" oldalt és tedd lehetővé a törlést a termék részletes oldaláról
  - Postman: teszteld a frissítést és törlést a mentett tokennel
