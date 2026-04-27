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

## Handling Form Elements

### Controlled Form Elements

In React, form elements can be handled in two ways: as controlled and uncontrolled components. In the case of **controlled components**, form element values are stored in React state, and every change is handled through an event handler. This allows React to fully control form values and makes those values easy to access inside the component. Using controlled components is generally recommended because it provides greater control over form fields and simplifies validation and data handling. Key parts:
- The `value` attribute of an `input` element is bound to a value stored in React state.
- The `onChange` event handler updates React state with the new form value.

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

### Uncontrolled Form Elements

In the case of uncontrolled components, form values are stored in the DOM, and React only accesses those values when needed, for example when submitting a form. This can be simpler in some cases, but it gives less control over form fields. Key parts:
- The initial value of an `input` can be set with the `defaultValue` attribute.
- The DOM element of the `input` is connected to a ref created with `useRef` through the `ref` attribute, so its value can be accessed later.
- The `onSubmit` handler reads the current value of the `input` through the ref when the form is submitted.

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

### Validation

For validating form elements, you can use built-in HTML5 validation mechanisms such as `required`, `minLength`, `maxLength`, and `pattern`, which can be applied to form controls. These attributes automatically validate form values and prevent form submission if values do not meet the specified conditions.

If you need more control, validation logic can be implemented in event handlers such as `onChange` or `onSubmit`, where you can check input values and display error messages to the user. To show errors, you can use a state variable that stores the error message and render it in JSX.

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

If you need to handle multiple form fields, it is often useful to store form state in an object where keys are field names and values are current field values. This makes form state management easier, especially with many inputs. In the event handler, you can use dynamic property names to update the correct field in state. You can also store individual validation errors in an object where keys are field names and values are error messages.

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

### Validation Libraries

Validation logic can be generalized, so it may be worth using dedicated libraries such as [Formik](https://formik.org/) or [React Hook Form](https://react-hook-form.com/), which make form handling and validation easier in React.

## Custom Hooks

State and logic inside a component can often make the component hard to read, especially when there are multiple state variables and side effects. In these cases, it can be useful to move them into custom hooks. You can simply move data and logic from the original component into a function whose name starts with `use`, and return the required values and functions. The component then uses that custom hook and works with the returned values and functions.

For example, if the original component has a counter, you can create a custom hook called `useCounter` that handles counter state and related operations such as increment, decrement, and reset. Original component:

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

Then you can move the counter logic into a custom hook named `useCounter`, and the component can use this hook:

```tsx
// Creating a custom useCounter hook
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Using useCounter in Counter component
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

Custom hooks are very often created to reuse logic. For example, a hook handling online/offline state can observe network status and return whether the browser is online or offline:

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

This logic can then be reused across multiple components. It is important to note that in this case, the logic is reused, not the data. That means every component using `useOnlineStatus` creates its own state and does not share a common state.

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

### Context Basics

React Context is a mechanism that lets you share data across the component tree without passing props through every level. This is especially useful for data required by many components, such as authentication state or theme settings.

In this setup, instead of creating state at the top level and passing it down through props at every level, you create a Context that has a Provider component where shared values are defined. Components that use this Context can then access those values with the `useContext` hook, without receiving them as props.

```tsx
// Creating a Context
const ThemeContext = React.createContext({ value: "system" });

// Providing ThemeContext in the component tree
function App() {
  const theme = { value: "dark" };
  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// Using Context in a component
function ChildComponent() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <p>Current theme: {theme.value}</p>
    </div>
  );
}
```

### Context Provider Component

The component that provides a Context is often wrapped in a custom component to simplify usage and hide internal details from other components. This component usually returns a Provider and supplies it with the required values.

```tsx
// Creating a Context
const ThemeContext = React.createContext({ value: "system" });

// Creating a ThemeProvider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = { value: "dark" };
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Using ThemeProvider in the component tree
function App() {
  return (
    <ThemeProvider>
      <ChildComponent />
    </ThemeProvider>
  );
}
```

### Dynamic Values in Context

Context values can be anything, either static or changing over time. A Context can provide data and logic of arbitrary complexity. Commonly, the provider component prepares the necessary data and helper functions, and only passes the required values to child components through Context.

```tsx
// Creating a Context
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

// Creating a ThemeProvider component
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

// Using ThemeProvider in the component tree
function App() {
  return (
    <ThemeProvider>
      <ChildComponent />
    </ThemeProvider>
  );
}

// Using Context in a component
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

### Custom Hooks for Context Usage

Context-related logic is often moved into a custom hook to simplify usage and hide internal implementation from other components. Components consuming context can then access the context value through this custom hook, and error handling can also be centralized.

```tsx
// Creating a useTheme hook
function useTheme() {
  const [theme, setTheme] = useState("system");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  return [theme, toggleTheme];
}

// Creating a ThemeProvider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, toggleTheme] = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/////////////////////////////////////////////

// Creating a useThemeContext hook
function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

// Using Context in a component with useThemeContext hook
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