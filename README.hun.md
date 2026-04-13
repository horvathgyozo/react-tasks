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

