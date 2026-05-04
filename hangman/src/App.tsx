import Buttons from "./Buttons";
import Hangman from "./Hangman";
import Result from "./Result";
import Word from "./Word";
import { wordList as huWords } from "https://cdn.jsdelivr.net/gh/vimtaai/elte-efop-feladattar@926d45a525eecee2f8ca159faa585192263ab196/tasks/hangman/solutions/04/words.js";
// @ts-ignore
import enWords from "https://esm.sh/an-array-of-english-words@2.0.0";

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const LANGUAGES = {
  hu: {
    label: "Hungarian",
    buttonText: "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz",
    words: huWords,
  },
  en: {
    label: "English",
    buttonText: "abcdefghijklmnopqrstuvwxyz",
    words: enWords.filter((w) => w.length >= 3 && w.length <= 10),
  },
};

const App = () => {
  // Application state (data)
  const language = "hu";
  const config = LANGUAGES[language];
  
  const maxTips = 9;
  const word = "alma";
  const tips = ["a", "l", "s", "s", "s", "s", "s", "s", "s"];
  const buttonText = config.buttonText;

  // Event handlers

  // Computed values

  return (
    <>
      <h1>Hangman</h1>

      <div style={{ marginBottom: "20px" }}>
        {Object.entries(LANGUAGES).map(([key, { label }]) => (
          <label key={key} style={{ marginRight: "10px", cursor: "pointer" }}>
            <input
              type="radio"
              name="language"
              value={key}
              checked={language === key}
              onChange={() => console.log("Language change to:", key)}
            />
            {label}
          </label>
        ))}
      </div>

      <Word />

      <button>New game</button>
      <Buttons />

      <Result />

      <Hangman />
    </>
  );
};

export default App;
