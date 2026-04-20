# Myplaylist app: adding a playlist

In this task you need to create a new playlist. The starter project provides a structure: the single page is handled by the `App` component, which renders the `PlaylistForm` (containing the form) and the `PlaylistList` (listing the playlists).

1. Analyze the structure of the application!
2. Make the form's input field editable! Implement it in a "controlled" way!
3. Prevent the form from submitting and log the new playlist name to the console!
4. Perform basic validation: if the value is empty, display an error message! Introduce an `error` state variable and update its value accordingly. Depending on the value, either display an error message or make the input field border red! The `error` and `negative` CSS classes are responsible for this.
5. If there is no error, pass the name to the `App` component, which should add it to the list of playlists!
6. Complete the task in an "uncontrolled" way as well! Use the `useRef` hook for this! When the form is submitted, read the input field's value using the ref and add it to the playlists! Then reset the form to empty!
