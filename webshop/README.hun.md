# MiniShop – 2x60 perc feladat (React + Zustand + TanStack Query + Fastify)

Egy **nagyon egyszerű webshop** gyakorló feladat két részben:

- **1. óra (60p)**: Form + Zustand (kosár vagy termékek) + alap UI
- **2. óra (60p)**: API + Auth + TanStack Query (valódi fetch + login)

Ebben a mappában két verzió van:

- `web/`, `api/`, `postman/`: **STARTER (feladat)**

## Indítás

### Frontend (starter)

```bash
cd webshop/web
npm install
npm run dev
```

## 1. rész – Form + Zustand (starterben)

### Cél

- **Termék lista** (készen van UI)
- **Termék aloldal** (készen van UI)
- **Kosár Zustand store** (**te készíted el**)
- **Új termék form**: ezt kell “élesre” kötni

### Lépésről lépésre (1. óra)

#### 1) Kosár store Zustanddal

- **Cél**: a “Kosárba” ténylegesen állapotot módosítson, és látszódjon a kosár oldalon.
- **Javasolt minimál shape**:
  - `items: Array<{ productId: string; qty: number }>`
  - actionök: `add(productId)`, `dec(productId)`, `remove(productId)`, `clear()`
- **Szabályok**:
  - `add`: növeli a mennyiséget (vagy létrehozza qty=1-gyel)
  - `dec`: csökkenti; ha 0, törölje a sort
  - csak `productId` + `qty` legyen a store-ban (ne tárold a teljes product objektumot)
- Doksik:
  - Zustand intro: https://zustand.docs.pmnd.rs/getting-started/introduction
  - Persist middleware (extra): https://zustand.docs.pmnd.rs/middlewares/persist

**Checkpoint**: 1–2 kattintás után a kosár mennyisége/állapota biztosan változik.

#### 2) “Kosárba” bekötése listában + aloldalon

- Lista/kártya: a gomb hívja az `add(productId)` actiont
- Aloldal: ugyanúgy `add(productId)` (1 darabot hozzáad)
- Extra: ha már van belőle a kosárban, jelenjen meg `- qty +`
- Doksik:
  - React Router alapok: https://reactrouter.com/en/main/start/tutorial

**Checkpoint**: listáról és aloldalról is lehet hozzáadni, ugyanazt a kosarat látod.

#### 3) Kosár oldal elkészítése

- Jelenítsd meg:
  - termék neve
  - mennyiség
  - ár
  - sor összeg
- Legyen:
  - “Clear” (ürítés)
  - “Remove” (sor törlés)
  - extra: `- / +` mennyiség gombok
- Számold ki és írd ki a végösszeget.

**Checkpoint**: ha csökkented/növeled a qty-t, a végösszeg helyesen frissül.

#### 4) Új termék form bekötése

- **Cél**: “Save/Mentés” után a termék megjelenik a listában.
- Készíts form state-et:
  - controlled inputok (`useState`) VAGY
  - `FormData` bekérés submitkor
- Döntsd el, hova kerül az új termék:
  - Opció A: `productsStore` Zustandban
  - Opció B: szülő komponens state-je (prop-drilling)
- Minimum validáció:
  - név kötelező
  - ár szám és \(> 0\)
  - leírás min hossz (pl. 10)
- Doksik:
  - React input/textarea: https://react.dev/reference/react-dom/components/input
  - `FormData`: https://developer.mozilla.org/en-US/docs/Web/API/FormData

**Checkpoint**: mentés → vissza `/` → új termék benne van a listában.

### Extra (opcionális)

- Kosár perzisztálás localStorage-ban (Zustand `persist`)
- Egyszerű “toast” sikeres mentés / kosárba rakás után

## 2. rész – API + Auth + TanStack Query

### API + Postman indítás (2. óra)

### API (starter)

```bash
cd webshop/api
npm install
npm run dev
```

### Postman

Importáld:

- `postman/webshop.postman_collection.json`
- `postman/webshop.postman_environment.json`

### Cél

- A `web/src/queries/products.ts` mock helyett **API-t hívjon**
- Legyen **login** (token), és a **termék létrehozás** legyen védett

### Lépésről lépésre (2. óra)

#### 0) Ellenőrizd, hogy fut az API

- Indítsd el az API-t (lásd fent).
- Postmanben futtasd:
  - `Health`
  - `Products - list`
- Doksik:
  - Postman collection alapok: https://learning.postman.com/docs/collections/using-collections/overview/

**Checkpoint**: a `/products` visszaadja: `{ items: [...] }`.

#### 1) Termékek lekérése TanStack Query-vel

- Készíts egy “api client” helper függvényt (fetch wrapper):
  - base URL: `VITE_API_URL` (fallback `http://localhost:3001`)
  - JSON parse
  - ha nem 2xx: dobjon használható hibát (status + message)
- Írd meg a query hookokat:
  - `useProductsQuery()` → `GET /products` → `items` tömb
  - `useProductQuery(productId)` → `GET /products/:id`
- Doksik:
  - TanStack Query (React) overview: https://tanstack.com/query/latest/docs/framework/react/overview
  - Queries guide: https://tanstack.com/query/latest/docs/framework/react/guides/queries
  - Vite env változók: https://vite.dev/guide/env-and-mode.html
  - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

**Checkpoint**: a lista + aloldal csak akkor működik, ha fut az API.

#### 2) Login (token) end-to-end

- API:
  - `POST /auth/login` → `{ token, user }`
- Frontend:
  - login form meghívja az API-t
  - token mentés Zustandban (persisttel)
  - menü logika:
    - kijelentkezve: `Login | Register`
    - bejelentkezve: `Logout`
  - logout: token törlés + redirect `/`
- Doksik:
  - Fastify docs: https://fastify.dev/docs/latest/
  - @fastify/jwt: https://github.com/fastify/fastify-jwt
  - TanStack Query mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

**Checkpoint**: frissítés után is be vagy jelentkezve (token megmarad).

#### 3) Új termék védése + token küldése

- API:
  - `POST /products` csak JWT-vel: `Authorization: Bearer <token>`
- Frontend:
  - `/new` route védése loaderrel: ha nincs token → redirect `/login`
  - “create product” mutation TanStack Query-vel:
    - `Authorization` header
    - success után: `['products']` invalidálás + redirect `/`
- Doksik:
  - React Router loader: https://reactrouter.com/en/main/route/loader
  - `Authorization` header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

**Checkpoint**: kijelentkezve a `/new` átvisz loginra, bejelentkezve működik a mentés.

#### 4) Opcionális: Regisztráció

- API: `POST /auth/register`
- Frontend: regisztráció után token mentés, automatikus beléptetés

## Extra feladatok (órák után)

- **(H) Regisztráció befejezése (starter)**: valódi regisztráció API-n keresztül (token mentés), majd a menü állapotának kezelése (Login/Register vs Logout, “New product” csak bejelentkezve).
- **(I) Teljes CRUD bejelentkezve**:
  - API: `PUT /products/:id` és `DELETE /products/:id` (JWT védelem)
  - Web: “Edit product” oldal + törlés a termék aloldalról
  - Postman: update + delete requestek a token használatával
 
---

## English version

The up-to-date English task description lives in `README.md`.
