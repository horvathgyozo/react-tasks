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