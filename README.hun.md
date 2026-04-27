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

## Űrlapelemek kezelése

### Kontrollált űrlapelemek

A Reactben a form elemeket kétféleképpen kezelhetjük: kontrollált és nem kontrollált komponensekként. A **kontrollált komponensek** esetén a form elemek értékét a React állapotában tároljuk, és minden változást egy eseménykezelőn keresztül kezelünk. Ez lehetővé teszi, hogy a form elemek értékét teljes mértékben a React irányítsa, és könnyen hozzáférhessünk ezekhez az értékekhez a komponensben. A kontrollált komponensek használata általában ajánlott, mert nagyobb kontrollt biztosít a form elemek felett, és megkönnyíti a validációt és az adatkezelést. Főbb elemei:
- Az `input` elem `value` attribútuma a React állapotában tárolt értékhez van kötve.
- Az `onChange` eseménykezelő frissíti a React állapotát a form elem új értékére.

```tsx
function Component() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Input value: {inputValue}</p>
    </div>
  );
}
```

### Nem kontrollált űrlapelemek

A nem kontrollált komponensek esetén a form elemek értékét a DOM-ban tároljuk, és a React csak akkor fér hozzá ezekhez az értékekhez, amikor szükség van rá, például egy űrlap elküldésekor. Ez egyszerűbb lehet bizonyos esetekben, de kevesebb kontrollt biztosít a form elemek felett. Főbb elemei:
- Az `input` elem alapértelmezett értékét a `defaultValue` attribútummal adhatjuk meg.
- Az `input` elem DOM elemét a `ref` attribútum segítségével kötjük egy `useRef`-el létrehozott referenciához, hogy később hozzáférhessünk az értékéhez.
- Az `onSubmit` eseménykezelő a referencián keresztül olvassa az `input` elem aktuális értékét, amikor a form elküldésre kerül.

```tsx
function Component() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      console.log("Input value:", inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Validáció

Űrlapelemek validálásához használhatjuk a HTML5 beépített validációs mechanizmusait, például a `required`, `minLength`, `maxLength`, `pattern` attribútumokat, amelyek a form elemekre alkalmazhatók. Ezek az attribútumok automatikusan érvényesítik a form elemek értékét, és megakadályozzák a form elküldését, ha az érték nem felel meg a megadott feltételeknek.

Ha nagyobb kontrollra van szükségünk, akkor a validációs logikát megvalósíthatjuk az eseménykezelőkben, például az `onChange` vagy `onSubmit` eseménykezelőben, ahol ellenőrizhetjük a form elemek értékét, és megjeleníthetünk hibaüzeneteket a felhasználónak. A hibaüzenetek megjelenítéséhez használhatunk egy állapotváltozót, amely tárolja a hibaüzenetet, és ezt megjeleníthetjük a JSX-ben.

```tsx
function Component() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length < 5) {
      setError("Input must be at least 5 characters long.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

Ha több form elemet kell kezelni, akkor érdemes lehet egy objektumban tárolni a form állapotát, ahol a kulcsok a form elemek nevei, és az értékek a form elemek aktuális értékei. Ez megkönnyíti a form állapotának kezelését, különösen akkor, ha sok form elem van. Az eseménykezelőben dinamikus property neveket használhatunk, hogy frissítsük a megfelelő form elem értékét az állapotban. Az egyes hibaüzeneteket is egy objektumban tárolhatjuk, ahol a kulcsok a form elemek nevei, és az értékek a hibaüzenetek.

```tsx
function Component() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));

    if (name === "username" && value.length < 5) {
      setErrors(prevErrors => ({ ...prevErrors, username: "Username must be at least 5 characters long." }));
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address." }));
    } else if (name === "password" && value.length < 8) {
      setErrors(prevErrors => ({ ...prevErrors, password: "Password must be at least 8 characters long." }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <form>
      <input type="text" name="username" value={formState.username} onChange={handleChange} />
      {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      
      <input type="email" name="email" value={formState.email} onChange={handleChange} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      
      <input type="password" name="password" value={formState.password} onChange={handleChange} />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Validációs könyvtárak

A validációs logika általánosítható, így érdemes lehet külön, erre szolgáló függvénykönyvtárakat használni, mint például a [Formik](https://formik.org/) vagy a [React Hook Form](https://react-hook-form.com/), amelyek megkönnyítik a formok kezelését és validálását Reactben.

## Egyedi hookok

Egy komponensben lévő state és logika sokszor olvashtatatlanná teheti a komponenst, különösen akkor, ha több állapotváltozó és mellékhatás van. Ilyenkor érdemes lehet ezeket egy egyedi hookokba helyezni. Az eredeti komponensből egyszerűen egy `use`-zal kezdődő függvénybe mozgatjuk át az adatokat és logikát, és visszatérünk a szükséges értékekkel és függvényekkel. A komponens innentől ezt az egyedi hookot használja, az abból kapott adatokkal és függvényekkel.

Ha az eredeti komponensben például egy számláló van, akkor létrehozhatunk egy `useCounter` nevű egyedi hookot, amely kezeli a számláló állapotát és a hozzá tartozó műveleteket, mint például növelés, csökkentés és visszaállítás. Az eredeti komponens:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

Ekkor a számláló logikáját egy `useCounter` nevű egyedi hookba helyezhetjük át, és a komponens innentől ezt a hookot használja:

```tsx
// useCounter egyedi hook létrehozása
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Counter komponens használata a useCounter hookkal
function Counter() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

Egyedi hookokat nagyon gyakran egy logikai újrahasznosítására hoznak létre. Például egy offline állapotot kezelő hook, amely figyeli a hálózati kapcsolat állapotát, és visszaadja, hogy online vagy offline állapotban van-e a böngésző:

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

Ez a logika innentől kezdve több komponensben is újrahasznosítható. Fontos, hogy ebben az esetben a logika hasznosítódik újra, az adat nem. Azaz minden komponens, amely használja a `useOnlineStatus` hookot, saját állapotot fog létrehozni, és nem osztozik egy közös állapoton.

```tsx
function Component1() {
  const isOnline = useOnlineStatus();
  return <p>Component 1 is {isOnline ? "online" : "offline"}</p>;
}

function Component2() {
  const isOnline = useOnlineStatus();
  return <p>Component 2 is {isOnline ? "online" : "offline"}</p>;
}
```

## Context

### A Context alapjai

A React Context egy olyan mechanizmus, amely lehetővé teszi, hogy adatokat osszunk meg a komponensfában anélkül, hogy props-okat kellene átadnunk minden szinten. Ez különösen hasznos olyan adatok esetén, amelyek sok komponens számára szükségesek, például a felhasználói hitelesítési állapot vagy a téma beállításai.

Ilyenkor nem az történik, hogy felső szinten létrehozunk egy állapotot, és azt props-ként továbbadjuk minden szinten, hanem létrehozunk egy Context-et, amelynek van egy Provider komponense, amiben megadjuk a megosztani kívánt értékeket. Ezután a Context-et használó komponensek a `useContext` hook segítségével hozzáférhetnek ezekhez az értékekhez, anélkül hogy props-ként kellene átadni őket.

```tsx
// Context létrehozása
const ThemeContext = React.createContext({ value: "system" });

// ThemeContext megadása a komponensfában
function App() {
  const theme = { value: "dark" };
  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// Context használata egy komponensben
function ChildComponent() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <p>Current theme: {theme.value}</p>
    </div>
  );
}
```

### Context szolgáltató komponens

A Contextet szolgáltató komponenst gyakran csomagolják egyéni komponensbe, hogy megkönnyítsék a használatát és elrejtsék a belső működését a többi komponens elől. Ez a komponens általában egy Provider-t ad vissza, amelynek értékét a szükséges adatokkal látja el.

```tsx
// Context létrehozása
const ThemeContext = React.createContext({ value: "system" });

// ThemeProvider komponens létrehozása
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = { value: "dark" };
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// ThemeProvider használata a komponensfában
function App() {
  return (
    <ThemeProvider>
      <ChildComponent />
    </ThemeProvider>
  );
}
```

### Változó értékek a Context-ben

A Context értéke bármi lehet, statikus vagy időben változó egyaránt. Egy Context tetszőleges bonyolultságú adatot és logikát képes szolgáltatni. Gyakran a szolgáltató komponensben előkészítik a megfelelő adatokat és feldolgozó függvényeket, és csak a szükséges értékeket adják át a Context-en keresztül a gyerek komponenseknek.

```tsx
// Context létrehozása
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

// ThemeProvider komponens létrehozása
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("system");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ThemeProvider használata a komponensfában
function App() {
  return (
    <ThemeProvider>
      <ChildComponent />
    </ThemeProvider>
  );
}

// Context használata egy komponensben
function ChildComponent() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }
  const { theme, toggleTheme } = context;
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Egyedi hookok a Context használatához

Sokszor a contextben lévő logikát egyedi hookba helyezik, hogy megkönnyítsék a használatát és elrejtsék a belső működését a többi komponens elől. A context használó komponensek is egyedi hookon keresztül férnek hozzá a context értékéhez, így a hibakezelés is központilag megoldható.

```tsx
// useTheme hook létrehozása
function useTheme() {
  const [theme, setTheme] = useState("system");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  return [theme, toggleTheme];
}

// ThemeProvider komponens létrehozása
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, toggleTheme] = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/////////////////////////////////////////////

// useThemeContext hook létrehozása
function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

// Context használata egy komponensben useThemeContext hookkal
function ChildComponent() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```
