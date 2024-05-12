import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementActiveIndex,
  setWrongIndex,
  setCorrectTypedIndex,
} from "../../state/slice";
import { useState, useEffect, useRef } from "react";

function spreadWord(wordsArray, correctIndex, locRef) {
  let arr = [];
  for (let i = 0; i <= correctIndex; i++) {
    arr.push(<Word locRef={locRef} key={i} index={i} correct={true}></Word>);
  }
  for (let i = correctIndex + 1; i < wordsArray.length; i++) {
    arr.push(<Word locRef={locRef} key={i} index={i}></Word>);
  }
  return arr;
}

export default function WordContainer() {
  const [firstDiffOfHeight, setFirstDiffOfHeight] = useState(-1.0);
  const [secondDiffOfHeight, setSecondDiffOfHeight] = useState(-1.0);
  const wordContainerRef = useRef();
  const locRef = useRef();
  const textAreaRef = useRef();
  const [isWrong, setIsWrong] = useState(false);
  const [typed, setTyped] = useState("");
  const activeWord = useSelector((state) => state.testReducer.currentWord);
  const testData = useSelector((state) => state.testReducer);
  const correctIndex = useSelector(
    (state) => state.testReducer.correctlyTypedTillIndex
  );

  const dispatch = useDispatch();

  useEffect(() => {
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
    } else if (
      typed.length === activeWord.length + 1 &&
      typed[typed.length - 1] === " "
    ) {
      dispatch(incrementActiveIndex());
      setTyped("");
      setIsWrong(false);
    } else {
      dispatch(setCorrectTypedIndex(typed.length - 1));
    }
  }, [typed, dispatch, isWrong]);

  useEffect(() => {
    if (locRef.current) {
      const containerHeight =
        wordContainerRef.current.getBoundingClientRect().y;
      const enterSymbolHeight = locRef.current.getBoundingClientRect().y;

      if (firstDiffOfHeight === -1.0)
        setFirstDiffOfHeight(enterSymbolHeight - containerHeight);
      if (
        enterSymbolHeight - containerHeight != firstDiffOfHeight &&
        firstDiffOfHeight !== -1.0 &&
        secondDiffOfHeight === -1.0
      )
        setSecondDiffOfHeight(enterSymbolHeight - containerHeight);

      console.log("first ", firstDiffOfHeight);
      console.log("second", secondDiffOfHeight);
      console.log(enterSymbolHeight - containerHeight);

      if (
        secondDiffOfHeight !== -1.0 &&
        enterSymbolHeight - containerHeight > 0.1 + secondDiffOfHeight
      ) {
        console.log("now scrolling");
        wordContainerRef.current.scrollTop +=
          enterSymbolHeight - containerHeight - firstDiffOfHeight;
      }
    }
  });

  function onTextAreaChange(e) {
    if (isWrong && e.target.value.length < typed.length) {
      setTyped(e.target.value);
      setIsWrong(false);
      dispatch(setWrongIndex(-1));
    } else if (isWrong) setTyped(typed);
    else setTyped(e.target.value);
  }

  function makeTextAreaActive() {
    textAreaRef.current.focus();
  }

  return (
    <div
      className="w-[73%] flex mt-36  text-white text-2xl  mx-auto h-[8rem]"
      onClick={makeTextAreaActive}
    >
      <textarea
        className="h-[0px] w-0"
        value={typed}
        onChange={onTextAreaChange}
        autoFocus
        ref={textAreaRef}
      ></textarea>{" "}
      <div
        className="flex gap-3 justify-between flex-wrap overflow-hidden h-[8rem] "
        ref={wordContainerRef}
      >
        {spreadWord(testData.wordsArray, correctIndex, locRef).map(
          (item) => item
        )}
      </div>
    </div>
  );
}
