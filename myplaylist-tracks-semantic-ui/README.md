# Myplaylist app: Managing tracks

In this task, the tracks page of a playlist management application is prepared: only this page is displayed, there is no routing or menu. The `Tracks` component is responsible for the page content and renders the tracks from the sample data using the `Track` component. The `TrackForm` component defines a pop-up modal dialog. The application uses the Semantic UI component library!

1. Analyze the starter code! Examine how the sample data is displayed on the page!
2. Displaying the modal dialog (`TrackForm`)
   1. [Base Semantic UI](https://semantic-ui.com/modules/modal.html#/definition) handles component behavior imperatively. To avoid conflicts with React's declarative approach, we use the [React version of Semantic UI](https://react.semantic-ui.com/modules/modal/)! The `package.json` already contains the required dependency — install it!
   2. Replace the outermost `div` of the `TrackForm` component with a `Modal` component! Analyze the properties of `Modal`!
   3. Make the modal dialog appear when clicking the "Add new track" button in the `Tracks` component! Introduce an `open` state variable and bind it to the `Modal`'s `open` property! On button click, toggle the `open` value (`handleOpen`)!
   4. When closing the modal dialog (by clicking Cancel or X), hide it by changing the `open` value (`handleClose`)! Use the `Modal`'s `onClose` method for this!
3. Adding a track
   1. Make the `input` fields inside the `Field` components editable! Use controlled form components!
   2. The `TrackForm` component will also need these values. Introduce a state variable inside the component that stores all field values (`formState`)! It should have the same structure as shown by `defaultState`! Display these values in the input fields!
   3. Reflect changes from the input fields back into `formState`! Use dynamic property names in the event handler for an efficient solution!
   4. Make the `Modal` component act as a form by setting its `as` property to `form`!
   5. On form submission, log the `formState` to the console and close the dialog (`handleSubmit`)!
   6. Prepare the `Tracks` component to receive the `formState` data from `TrackForm` as a new track (`handleSubmit`)! Add the new track to the existing track list!
   7. We will keep validation very simple: rely entirely on HTML form validators! Provide the necessary validators to the `Field` component, and apply them to the input fields inside `Field` as well!
   8. Ensure that when adding a new track, the dialog opens with empty fields! Achieve this by passing an empty object to the `TrackForm` component and using it to override `defaultState` in `formState` on open. Use `useEffect` to react to the open event!
   9. Optionally, extract the `formState` management into a custom hook (e.g., `useFormState`)! This makes the `TrackForm` component cleaner and keeps related state logic in a separate unit.
4. Deleting a track
   1. On clicking the delete button, delete the selected track (`handleDelete`)!
5. Editing a track
   1. In the `Tracks` component, introduce a state variable that holds the data of the track currently being edited (`editedTrack`)!
   2. On clicking the edit button, set this state variable (`handleEdit`)!
   3. Pass the selected track's data to the `TrackForm` component, which will use it to initialize the input fields.
   4. Prepare the `Tracks` component to handle data coming from the dialog either as a new track or as an update to an existing one!
   5. Modify the selected track!
   6. Reset `editedTrack` to empty when creating a new track (`handleNew`)!
6. useTracksService hook
   1. Extract track management into a custom hook, and expose only the necessary data and methods to the consuming component!
   2. Load `exampleTracks` when the component mounts! Use `useEffect`!
7. Context
   1. Try wrapping `useTracksService` in a context and publishing it as the Provider value (`TracksContext` and `TracksProvider`)!
   2. Use it in the `Tracks` component with the `useContext` hook!
8. Persistence
   1. Store the tracks in localStorage!
   2. Then store the tracks in indexedDB! Use the [`localForage` package](https://github.com/localForage/localForage), which provides a localStorage-like API for using indexedDB asynchronously!
   3. In `useTracksService`, alongside writing to memory (state), perform the persisting or reading operations! Be mindful that you are using an asynchronous API!
   4. Extract the persistence operations into a separate API class!
