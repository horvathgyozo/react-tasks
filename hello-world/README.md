# Hello World

Create a Hello World application in React!

1. Create a `<Hello>` component in a separate file (e.g. `Hello.tsx`) that displays `"Hello World!"` in a heading.

   ```tsx
   <h1>Hello World!</h1>
   ```

   Export the component from the file and display it in `App.tsx`!

   ```tsx
   <div>
     <Hello />
   </div>
   ```

2. Store a name inside the component and display it!

   ```tsx
   const name = "Gyozo";
   ```

3. If this name is empty, display `"There is no one to greet"`!
4. Store in a constant how many times the component should display the greeting, and render the heading that many times!
5. If the name is `"React"`, display the text in orange using a CSS class. The style definition should be in an external file. Use the [`classnames` package](https://www.npmjs.com/package/classnames) for the solution.
6. Pass the name and display count as component props:

   ```tsx
   <Hello name="Gyozo" count="3" />
   ```

7. It should also be possible to provide additional elements below the greeting. For example:

   ```jsx
   <Hello>
     <p>A small message for you!</p>
   </Hello>
   ```
