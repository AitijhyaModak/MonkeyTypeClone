import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementActiveIndex,
  setWrongIndex,
  setCorrectTypedIndex,
} from "../../state/slice";
import { useState, useEffect } from "react";

function spreadWord(wordsArray, correctIndex) {
  let arr = [];
  for (let i = 0; i <= correctIndex; i++) {
    arr.push(<Word key={i} index={i} correct={true}></Word>);
  }
  for (let i = correctIndex + 1; i < wordsArray.length; i++) {
    arr.push(<Word key={i} index={i}></Word>);
  }
  return arr;
}

export default function WordContainer() {
  const [isWrong, setIsWrong] = useState(false);
  const [typed, setTyped] = useState("");
  const activeWord = useSelector((state) => state.testReducer.currentWord);
  console.log("Active word ", activeWord);
  const testData = useSelector((state) => state.testReducer);
  const correctIndex = useSelector(
    (state) => state.testReducer.correctlyTypedTillIndex
  );

  let wordIndex = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(typed);
    console.log("index tak type kia ", typed.length - 1);
    if (!typed.length) {
      dispatch(setCorrectTypedIndex(-1));
      return;
    }

    setIsWrong(typed[typed.length - 1] !== activeWord[typed.length - 1]);

    if (isWrong) {
      dispatch(setWrongIndex(typed.length - 1));
      return;
      // } else if (
      //   typed.length > activeWord.length &&
      //   typed[typed.length - 1] !== " "
      // )
      // return;
    } else if (typed[typed.length - 1] === " ") {
      dispatch(incrementActiveIndex());
      setTyped("");
      setIsWrong(false);
    } else {
      dispatch(setCorrectTypedIndex(typed.length - 1));
    }
  }, [typed, dispatch, isWrong]);

  function onTextAreaChange(e) {
    if (isWrong && e.target.value.length < typed.length) {
      setTyped(e.target.value);
      setIsWrong(false);
      dispatch(setWrongIndex(-1));
    } else if (isWrong) setTyped(typed);
    else setTyped(e.target.value);
  }

  return (
    <div className="p-32 flex gap-3 w-[85%] justify-between  text-white text-2xl flex-wrap mx-auto">
      <textarea
        className="h-10 w-10 ml-[-1.5rem]"
        value={typed}
        onChange={onTextAreaChange}
      ></textarea>
      {/* {testData.wordsArray.map((word) => (
        <Word key={wordIndex} index={wordIndex++}></Word>
      ))} */}
      {spreadWord(testData.wordsArray, correctIndex).map((item) => item)}
    </div>
  );
}
