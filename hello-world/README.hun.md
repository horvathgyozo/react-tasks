# Hello világ

Készíts egy Helló világ alkalmazást Reactben!

1. Egy külön fájlban (pl. `Hello.tsx`) készíts egy `<Hello>` komponenst, amely egy címsorban kiírja, hogy "Hello világ!"!

   ```tsx
   <h1>Hello világ!</h1>
   ```

   A fájlból exportáld ki a komponenst, és az `App.tsx`-ben jelenítsd meg!

   ```tsx
   <div>
     <Hello />
   </div>
   ```

2. A `Hello` komponensen belül tárolj el egy nevet, és azt jelenítsd meg!

   ```tsx
   const name = "Győző";
   ```

3. Ha ez a név üres, akkor azt írd ki, hogy "Nincs kit üdvözölni"!

4. Egy konstansban tárold el, hogy hányszor írja ki az üdvözlést a komponens, és ennyiszer jelenítsd is meg a címsort!

5. Ha a név "React", akkor egy stílusosztályon keresztül narancssárgával jelenítsd meg a szöveget! A stílusdefiníció külső állományban legyen! Használd a [`classnames` csomagot](https://www.npmjs.com/package/classnames) a megoldáshoz!

6. Érkezzen a név és a megjelenítés száma komponens attribútumként:

   ```tsx
   <Hello name="Győző" count="3">`.
   ```

7. Legyen lehetőség egyéb elemeket is megadni az üdvözlés alatt! Például:

   ```jsx
   <Hello>
     <p>A small message for you!</p>
   </Hello>
   ```
