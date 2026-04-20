# Leírás

## React komponensek

Reactben a komponens egy egyszerű függvény, amely JSX kifejezést ad vissza. 

```ts
function Component() {
  return (
    <div>
      <p>Some content</p>
    </div>
  );
}
```

## JSX

A JSX egy speciális, HTML-szerű formátum HTML sablonok létrehozására. Mint sablonnyelv képes kifejezések megjelenítésére, feltételes megjelenítésre és iteratív megoldásokra. Az iteratív megoldásoknál fontos, hogy minden elemnek legyen egyedi `key` attribútuma, hogy a React hatékonyan tudja kezelni a listákat.

A JSX-ben van pár szabály a HTML-hez képest:
- A JSX-ben a `class` helyett `className`-t kell használni.
- A JSX-ben a `for` helyett `htmlFor`-t kell használni.
- A JSX-ben minden elemnek záró tagje kell legyen, még az önzáró elemeknek is (`<img />`, `<input />`, stb.).
- A JSX-ben a JavaScript kifejezéseket kapcsos zárójelek közé kell tenni (`{}`).
- A JSX-ben a stílusokat egy objektumban kell megadni, ahol a kulcsok camelCase formátumban vannak (`background-color` helyett `backgroundColor`).

```jsx
// Kifejezések megjelenítése
function Component() {
  const text = "Hello world!";
  return (
    <div>
      <p>The value of a variable: {text}</p>
      <p data-text={text}>Attribute binding</p>
    </div>
  );
}

// Feltételes megjelenítés
function Component() {
  const isTrue = true;
  return (
    <div>
      {isTrue ? <p>The variable is true!</p> : <p>The variable is false!</p>}
      or
      {isTrue && <p>The variable is true!</p>}
    </div>
  );
}

// Iteratív megoldások
function Component() {
  const items = ["First", "Second", "Third"];
  const listItems = items.map((item, index) => <li key={index}>{item}</li>);

  return (
    <ul>{listItems}</ul>
    or
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

## Prop-ok

Egy komponensnek lehetnek bemeneti paraméterei, amelyeket prop-oknak nevezünk. Ezeket a komponens attribútumaként adhatjuk meg, és a komponensen belül a `props` objektumon keresztül érhetjük el őket.

```tsx
interface ComponentProps {
  text: string;
}
function Component(props: ComponentProps) {
  return (
    <div>
      <p>{props.text}</p>
    </div>
  );
}
// or using destructuring
function Component({ text }: ComponentProps) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

// használata:
<Component text="Hello world!" />
```

Egy komponensnek lehetnek gyerekei is, amelyeket a `props.children`-en keresztül érhetünk el:

```tsx
interface ComponentProps {
  children: React.ReactNode;
}
function Component({ children }: ComponentProps) {
  return (
    <div>
      {children}
    </div>
  );
}
// Használata
<Component>
  <p>This is a child element!</p>
</Component>
```

## Kompozitálás

A Reactben a komponensek egymásba ágyazhatók, így komplex felhasználói felületeket hozhatunk létre egyszerűbb komponensekből. Ez a kompozitálás elve, amely lehetővé teszi a kód újrafelhasználhatóságát és karbantarthatóságát.

```tsx
function ParentComponent() {
  return (
    <div>
      <ChildComponent text="Hello from the parent!" />
    </div>
  );
}
function ChildComponent({ text }: { text: string }) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
```

## Eseménykezelés

Reactben a legtöbb olyan esemény elérhető, amely a DOM-ban is megtalálható. Az `addEventListener` használata helyett azonban az eseményeket inline módon kell megadni azon az elemen, ahol figyelni szeretnénk őket. Az eseménykezelő attribútumokat `on` kezdetű névvel kell megadni (pl. `onClick`, `onChange`). Az eseménykezelő függvényeket általában a komponensben definiáljuk, és a JSX-ben hivatkozunk rájuk, de megadhatjuk őket inline is.

```tsx
function Component() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

// or inline

function Component() {
  return (
    <div>
      <button onClick={() => alert("Button clicked!")}>Click me!</button>
    </div>
  );
}
```

TypeScriptben az eseménykezelő függvények paraméterei típusosak, és a React eseménytípusait használhatjuk. Ilyenek:
- `React.MouseEvent` a kattintási eseményekhez
- `React.ChangeEvent` a változási eseményekhez
- `React.FormEvent` a űrlap eseményekhez
- `React.KeyboardEvent` a billentyűzet eseményekhez

```tsx
function Component() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert("Button clicked!");
  };
  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}
```

## Állapotkezelés

Eddig olyan adatokról volt szó, amelyek vagy a komponensben beégetve vannak jelen, vagy kívülről prop-okként érkeznek. A komponens szempotjából ezek statikus adatok, amelyek nem változnak a komponens életciklusa során, így a komponensnek nem is renderelődik újra.

Ha olyan, időben változó értékekre van szükségünk, amelyet meg is szeretnénk jeleníteni, akkor használhatjuk a `useState` hookot. Ezzel a komponensben egy olyan adatot hozunk létre, amelyet megváltoztathatunk, és ilyenkor a komponens és az alatta lévő részfa újrarenderelődik.

A `useState` egy tömböt ad vissza, amelynek az első eleme a változó értéke, a második eleme pedig egy függvény, amivel megváltoztathatjuk ezt az értéket. A `useState`-nek át kell adni egy kezdeti értéket, amely lehet bármilyen típusú adat. TypeScriptben a `useState`-et típusparaméterrel is elláthatjuk, de ez általában nem szükséges, mert a TypeScript képes kitalálni a típust a kezdeti érték alapján.

```tsx
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

A `useState` érték- és referenciatípusú adatok esetén is működik, de fontos megjegyezni, hogy a `setState` függvény mindig új értéket vár, így ha egy objektumot vagy tömböt szeretnénk megváltoztatni, akkor azt újra kell létrehozni, nem szabad módosítani a meglévő értéket.

```tsx
function Component() {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <button onClick={() => addItem("New item")}>Add item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

Ezeket immutáblis módosításoknak hívják, és több minta is van rá:

```tsx
// Spread operator
setItems([...items, newItem]);
// Array methods that return new arrays, e.g. filter, map, concat
setItems(items.filter(item => item !== itemToRemove));
// Cloning and modifying
const newItems = structuredClone(items);
newItems.push(newItem);
setItems(newItems);
// modifier functions with previous state
setItems(prevItems => [...prevItems, newItem]);
```

Ha egynél nagyobb mélységben kell az immutábilis módosítást elvégezni, akkor ezt minden szinten meg kell tenni, de ez nehezen olvasható kódot eredményezhet. Ilyenkor érdemes lehet egy könyvtárat használni, mint például az [Immer](https://immerjs.github.io/immer/), amely lehetővé teszi a mutációs stílusú kód írását, miközben a mögötte lévő logika gondoskodik arról, hogy az állapot immutábilis maradjon.

```tsx
// Multiple levels of immutability with spread operator
setState({
  ...state,
  nested: {
    ...state.nested,
    value: newValue
  }
})

// Using Immer
import produce from "immer";

setState(produce(state, draft => {
  draft.nested.value = newValue;
}));
```


## useEffect

Állapotváltozást nem válthatunk ki renderelés közben. Tipikusan eseménykezelőkben szoktuk az adatok változtatását elvégezni, de ha egy változtatást a renderelés mellékhatásaként szeretnénk végrehajtani, akkor használhatjuk a `useEffect` hookot. Tipikusan valamilyen imperatív műveletet hajtunk végre egy deklaratív rendszerben, például adatlekérést, eseményfigyelők hozzáadását vagy időzítők beállítását.

A `useEffect` egy olyan függvényt vár, amelyet a komponens renderelése után hajt végre a React. Ez a függvény lehet szinkron vagy aszinkron, és bármilyen műveletet elvégezhetünk benne, például adatlekérést, eseményfigyelők hozzáadását vagy időzítők beállítását. A `useEffect` második paraméterében megadhatjuk, hogy mely adatok változásakor fusson le a mellékhatás. Ha ez nincs megadva, akkor mindig lefut, ha üres tömb, akkor egyszer, a komponens első megjelenésekor, egyébként pedig a tömbben megadott adatok változása esetén.

```tsx
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Tipikus használata adatok lekérése a komponens megjelenésekor:

```tsx
function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p>}
    </div>
  );
}
```

## useRef

Ha olyan időben változó értékekre van szükségünk, amelyeket nem szeretnénk megjeleníteni, akkor használhatjuk a `useRef` hookot. Ez egy olyan objektumot ad vissza, amelynek van egy `current` nevű tulajdonsága, amiben bármilyen értéket tárolhatunk. A `useRef`-et gyakran használják DOM elemek referenciájának tárolására, de bármilyen adatot tárolhatunk benne.

```tsx
// DOM elem referenciája
function Component() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
}

// Bármilyen adat tárolása
function Component() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };

  return (
    <div>
      <button onClick={handleClick}>Increment count</button>
    </div>
  );
}

// Időzítő használata useRef-pel
function Component() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log("Timer tick");
      setElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <p>Elapsed: {elapsed}</p>
    </div>
  );
}
```

## Router

Reactet általában egyoldalas alkalmazásokhoz használják, ahol az egyes végpontokhoz tartozó oldalakat kliensoldali logikával kezeljük, és ezek között nem teljes oldal újratöltéssel váltunk.

Ehhez szükség van egy routerre, amely kezeli az URL-eket és a hozzájuk tartozó komponenseket. A legnépszerűbb router könyvtár a React Router, amely lehetővé teszi az útvonalak definiálását és a navigációt a komponensek között.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
```

Egy összetettebb példa:

```tsx
<Routes>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route>
</Routes>
```
