# Description

## React Components

In React, a component is a simple function that returns a JSX expression.

```ts
function Component() {
  return (
    <div>
      <p>Some content</p>
    </div>
  );
}
```

## JSX

JSX is a special, HTML-like format for creating HTML templates. As a template language, it can display expressions, handle conditional rendering, and support iterative solutions. For iterative solutions, it is important that each element has a unique `key` attribute so that React can handle lists efficiently.

Compared to HTML, JSX has a few rules:
- In JSX, use `className` instead of `class`.
- In JSX, use `htmlFor` instead of `for`.
- In JSX, every element must have a closing tag, including self-closing elements (`<img />`, `<input />`, etc.).
- In JSX, JavaScript expressions must be placed inside curly braces (`{}`).
- In JSX, styles must be provided as an object where keys use camelCase (`backgroundColor` instead of `background-color`).

```jsx
// Displaying expressions
function Component() {
  const text = "Hello world!";
  return (
    <div>
      <p>The value of a variable: {text}</p>
      <p data-text={text}>Attribute binding</p>
    </div>
  );
}

// Conditional rendering
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

// Iterative solutions
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

## Props

A component can have input parameters, which are called props. You can pass them as component attributes, and access them inside the component through the `props` object.

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

// usage:
<Component text="Hello world!" />
```

A component can also have children, which can be accessed through `props.children`:

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
// Usage
<Component>
  <p>This is a child element!</p>
</Component>
```

## Composition

In React, components can be nested into one another, allowing you to build complex user interfaces from simpler components. This is the principle of composition, which improves code reusability and maintainability.

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

## Event Handling

In React, most events that exist in the DOM are also available. However, instead of using `addEventListener`, events should be declared inline on the element where you want to listen to them. Event handler attributes must use names starting with `on` (for example, `onClick`, `onChange`). Event handler functions are usually defined inside the component and referenced from JSX, but they can also be written inline.

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

In TypeScript, event handler parameters are typed, and you can use React event types such as:
- `React.MouseEvent` for click events
- `React.ChangeEvent` for change events
- `React.FormEvent` for form events
- `React.KeyboardEvent` for keyboard events

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

## State Management

So far, we discussed data that is either hardcoded in the component or passed in as props. From the component's perspective, these are static values that do not change during its lifecycle, so they do not trigger a re-render.

If you need values that change over time and should appear in the UI, you can use the `useState` hook. This creates data in the component that can be updated, and when it changes, the component and its subtree re-render.

`useState` returns an array where the first item is the current value and the second item is a function to update it. You must pass an initial value to `useState`, which can be any type. In TypeScript, you can also provide a type parameter, but this is usually unnecessary because TypeScript can infer the type from the initial value.

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

`useState` works with both value and reference types, but keep in mind that the state setter always expects a new value. So if you want to change an object or array, you must create a new one instead of mutating the existing value.

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

These are called immutable updates, and there are multiple common patterns:

```tsx
// Spread operator
setItems([...items, newItem]);
// Array methods that return new arrays, e.g. filter, map, concat
setItems(items.filter(item => item !== itemToRemove));
// Cloning and modifying
const newItems = structuredClone(items);
newItems.push(newItem);
setItems(newItems);
// updater functions with previous state
setItems(prevItems => [...prevItems, newItem]);
```

If immutable updates are needed deeper than one level, each level must be copied. This can result in code that is hard to read. In those cases, it can be useful to use a library such as [Immer](https://immerjs.github.io/immer/), which lets you write mutation-style code while ensuring state remains immutable.

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

State changes cannot be triggered during rendering. Typically, data updates are done in event handlers, but if you want to perform an update as a side effect of rendering, you can use the `useEffect` hook. This is commonly used for imperative operations in a declarative system, such as fetching data, adding event listeners, or setting up timers.

`useEffect` expects a function that React runs after rendering. This function can be synchronous or asynchronous, and it can perform any operation such as fetching data, attaching listeners, or starting timers. In the second argument of `useEffect`, you can define which values should trigger the effect again. If omitted, the effect runs after every render. If an empty array is provided, it runs once after the first render. Otherwise, it runs when one of the listed dependencies changes.

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

A typical use case is fetching data when the component appears:

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

If you need values that change over time but should not be displayed, you can use the `useRef` hook. It returns an object with a `current` property where you can store any value. `useRef` is often used to store references to DOM elements, but it can hold any data.

```tsx
// DOM element reference
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

// Storing any data
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

// Using a timer with useRef
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

## Router

React is typically used for single-page applications where pages belonging to different endpoints are handled by client-side logic, and navigation between them does not require a full page reload.

To do this, you need a router that maps URLs to components. The most popular routing library is React Router, which lets you define routes and navigate between components.

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

A more advanced example:

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