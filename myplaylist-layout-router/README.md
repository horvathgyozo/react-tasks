# Myplaylist - Navigation and Layout

In this task, an application is already split into components. However, the components are currently rendered one below another.

1. The shared elements of a page usually make up the layout. Introduce a `Layout` component here as well, containing the wrapper `div` and the `Menu`. We want to use it roughly like this:
   ```jsx
   <Layout>
     <Home>
     <Playlists>
   </Layout>
   ```
2. We want to make the menu functional so that clicking each menu item displays the corresponding components, meaning in-page navigation.
   1. Install the `react-router` package for this. [Use the documentation too.](https://reactrouter.com/start/declarative/installation)
   2. Use it to render the correct components at the corresponding endpoints. For this, use the `BrowserRouter`, `Routes`, and `Route` components. Put the solution into the `App` component. ([Documentation](https://reactrouter.com/start/declarative/routing#configuring-routes))
   3. Make the menu functional. Replace the links with `Link` or, preferably, `NavLink` components. ([Documentation](https://reactrouter.com/start/declarative/navigating))
   4. Try using the `Layout` component as the top-level route and render pages with routes nested inside it. You will also need the `Outlet` component inside `Layout`. Make `<Home>` the default (`index` prop), and for unknown endpoints redirect to this page (with the `<Navigate>` component). (In the docs, you will need to read the [Nested Routes](https://reactrouter.com/start/declarative/routing#nested-routes) and [Layout Routes](https://reactrouter.com/start/declarative/routing#layout-routes) sections as well.)

      ```tsx
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tracks" element={<Tracks />} />
        </Route>
      </Routes>
      ```

3. The `Playlists` component currently hardcodes which playlist is selected. Convert this constant value into state, and change the selected playlist when a playlist is clicked.
4. Show in the URL which playlist is selected on the playlists page, for example: `/playlists/1`.
   1. Use the router's `useParams` hook to read the parameter. Note that it arrives as text, so you still need to convert it to a number.
   2. Make it so that clicking a playlist changes the URL, and read the selected playlist from there. For this, convert the `div` elements into `Link` elements.
5. Extend the `Playlists` component to display and select tracks within a playlist.
   1. Show the selected playlist in the `TrackList` component.
   2. Introduce a constant value for which track is selected, and display the selected track.
   3. Make this value changeable.
   4. Read this value from the URL.
   5. Make tracks clickable so that they update the URL.
