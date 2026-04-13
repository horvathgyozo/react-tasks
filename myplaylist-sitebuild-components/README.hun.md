# Lejátszólista alkalmazás statikus prototípusának átültetése React komponensekbe

A `sitebuild` mappában egy lejátszási listákat kezelő alkalmazás statikus prototípusát találjátok. Ezt kell React komponensekbe átültetni.

1. A sitebuild egy Semantic UI nevű CSS keretrendszert használ. Használjuk ennek a közösségi változatát `fomantic-ui` néven! Tedd elérhetővé ezt a CSS-t:
   - vagy az `index.html`-ben [jsdelivr](https://www.jsdelivr.com/) segítségével;
   - vagy telepítsd npm-mel és `import`-tal húzd be a telepített css fájlt!

2. Playlists oldal (`playlists.html`)
   1. Eleinte az `App` komponens tartalmazzon minden HTML elemet! Javítsuk ki a hibákat (input, img, stb)!
   2. Jelenítsd meg a logó képét! Ehhez importáld be a képet, és add át a kép `src` attribútumának!

      ```tsx
      import logo from "./assets/logo.png";
      ...
      <img src={logo} alt="Logo" />
      ```

      Ha ez nem működik, akkor helyezd át a képet a `public` könyvtárba, és onnan hivatkozz rá!

      ```tsx
      <img src="/logo.png" alt="Logo" />
      ```

   3. A Playlists oldalhoz tartozó részeket tedd külön komponensbe (`<Playlists>`), és használd az `<App>` komponensben!
   4. A Playlists komponensbe importáld be a `domain/playlists.js`-beli adatokat, és a playlist-eket az alapján jelenítsd meg! Ügyelj a listáknál a `key` attribútumra, amelyet arra használunk, hogy megkülönböztessük az elemeket, és így a React megfelelően kezelje őket!

      ```tsx
      import { playlists } from "../domain/playlists";
      ...
      {playlists.map((playlist) => (
         <div key={playlist.id}>{playlist.name}</div>
      ))}
      ```

   5. Vegyél fel egy konstanst, hogy melyik playlist legyen kiválasztva, és ennek megfelelően alkalmazd az `active` stlusosztályt a megfelelő elemen! Használd a [`classnames` csomagot](https://www.npmjs.com/package/classnames)!

3. Tracks oldal (`tracks.html`)
   1. Külön komponensben (`<Tracks>`) készítsd el a zeneszámokat listázó oldalt.
   2. A Tracks komponensbe importáld be a `domain/tracks.js`-beli adatokat, és a zeneszámokat az alapján jelenítsd meg! Ügyelj a listáknál a `key` attribútumra!

4. Az App komponensben vegyél fel egy konstanst, amiben jelölni tudod, hogy melyik komponens az aktív. A Playlists vagy a Tracks komponenst ettől függően jelenítsd meg!
