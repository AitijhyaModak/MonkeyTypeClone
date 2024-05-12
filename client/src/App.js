import Nav from "./components/Navbar/Nav";
import { words } from "./words/wordlist";
import WordContainer from "./components/WordContainer/WordContainer";
import { useDispatch } from "react-redux";
import { setWordsArray } from "./state/slice";
import { useEffect } from "react";

function helper(words) {
  const shuffled = words.sort(() => 0.5 - Math.random());
  const wordsArray = shuffled.slice(0, 100);
  return wordsArray;
}

export default function App() {
  const dispatch = useDispatch();
  const wordsArray = helper(words);

  useEffect(() => {
    dispatch(setWordsArray(wordsArray));
  });

  return (
    <div className="min-h-screen bg-slate-800 p-5">
      <Nav></Nav>
      <WordContainer></WordContainer>
    </div>
  );
}
