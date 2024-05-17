import Nav from "./components/Navbar/Nav";
import { words } from "./words/wordlist";
import WordContainer from "./components/WordContainer/WordContainer";
import { useDispatch } from "react-redux";
import { setTest } from "./state/slice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// function helper(words) {
//   const shuffled = words.sort(() => 0.5 - Math.random());
//   const wordsArray = shuffled.slice(0, 150);
//   return wordsArray;
// }

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    dispatch(setTest());
  });

  return (
    <div className="min-h-screen bg-slate-800 p-5">
      <Nav></Nav>
      <WordContainer></WordContainer>
    </div>
  );
}
