# Converting a Static Playlist App Prototype into React Components

In the `sitebuild` folder, you can find a static prototype of a playlist management application. Your task is to convert it into React components.

1. The sitebuild uses a CSS framework called Semantic UI. Use its community version named `fomantic-ui`. Make this CSS available:
   - either in `index.html` via [jsdelivr](https://www.jsdelivr.com/);
   - or install it with npm and import the installed CSS file with `import`.

2. Playlists page (`playlists.html`)
   1. At first, let the `App` component contain all HTML elements. Fix any issues (input, img, etc.).
   2. Display the logo image. To do this, import the image and pass it to the image `src` attribute.

      ```tsx
      import logo from "./assets/logo.png";
      ...
      <img src={logo} alt="Logo" />
      ```

      If this does not work, move the image into the `public` directory and reference it from there.

      ```tsx
      <img src="/logo.png" alt="Logo" />
      ```

   3. Move the parts related to the Playlists page into a separate component (`<Playlists>`) and use it in the `<App>` component.
   4. In the Playlists component, import the data from `domain/playlists.js` and render the playlists based on it. For lists, pay attention to the `key` attribute, which is used to distinguish items so React can handle them correctly.

      ```tsx
      import { playlists } from "../domain/playlists";
      ...
      {playlists.map((playlist) => (
         <div key={playlist.id}>{playlist.name}</div>
      ))}
      ```

   5. Add a constant to define which playlist is selected, and apply the `active` CSS class to the corresponding element. Use the [`classnames` package](https://www.npmjs.com/package/classnames).

3. Tracks page (`tracks.html`)
   1. Create the track listing page in a separate component (`<Tracks>`).
   2. In the Tracks component, import the data from `domain/tracks.js` and render the tracks based on it. For lists, pay attention to the `key` attribute.

4. In the App component, add a constant where you can mark which component is active. Render either the Playlists or the Tracks component depending on this value.
