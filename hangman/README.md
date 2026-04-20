# Hangman Game

Create a Hangman game!

1. Analyze the starter project!
   - Install the required dependencies (`npm install`)!
   - Starting from the `App` component, explore what parts the application consists of!
   - Change a few values and observe how the app behaves!
2. Display data based on the _constant state_! Prepare the data for each component as _computed values_, then pass them as props! Work component by component!
   1. `Word` component
   2. `Buttons` component
   3. `Result` component
   4. `Hangman` component
3. Make it possible to guess a letter by pressing a button!
   1. During guessing, the `tips` array will be modified, so move it from a constant into state (`useState`)!
   2. Create an event handler function and pass it to the `Buttons` component! Clicking a button should call the event handler!
4. When the game is over, show a "New game" button _instead of_ the letter buttons! Clicking it should start a new game!
   1. Besides `tips`, `word` will also change, so move it into state as well!
   2. Create the appropriate event handler function!
   3. `wordList` is an array of words — randomly pick a new word from it!
