# Figure

Create a React component around the following HTML code.

```html
<figure>
  <img
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg"
    alt="Elephant at sunset"
  />
  <figcaption>Elephant at sunset</figcaption>
</figure>
```

1. Use it like this:

   ```jsx
   <Figure
     src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg"
     caption="Elephant at sunset"
   />
   ```

2. Apply the following styles globally:

   ```css
   figure {
     border: thin #c0c0c0 solid;
     display: flex;
     flex-flow: column;
     padding: 5px;
     max-width: 220px;
     margin: auto;
   }

   img {
     max-width: 220px;
     max-height: 150px;
   }

   figcaption {
     background-color: #222;
     color: #fff;
     font: italic smaller sans-serif;
     padding: 3px;
     text-align: center;
   }
   ```

3. Move the styles into a separate CSS file and import it into the component.

4. Try solving the styles with [CSS Modules](https://vite.dev/guide/features#css-modules), and import them into the component.

5. Try solving the styles with Tailwind CSS.
