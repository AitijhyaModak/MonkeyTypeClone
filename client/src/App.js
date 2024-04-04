import Nav from "./components/Navbar/Nav";
import { words } from "./words/wordlist";
import WordContainer from "./components/WordContainer/WordContainer";

function helper(words) {
  const shuffled = words.sort(() => 0.5 - Math.random());
  const wordsArray = shuffled.slice(0, 30);
  return wordsArray;
}

export default function App() {
  const wordsArray = helper(words);

  return (
    <div className="min-h-screen bg-slate-800 p-5">
      <Nav></Nav>
      <WordContainer wordsArray={wordsArray}></WordContainer>
    </div>
  );
}
