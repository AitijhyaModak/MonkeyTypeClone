import Word from "./Word";
import TimeSelect from "./TimeSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementActiveIndex,
  setWrongIndex,
  setCorrectTypedIndex,
  deleteAndaddWords,
  setTime,
} from "../../state/slice";
import { useState, useEffect, useRef } from "react";

function spreadWord(wordsArray, correctIndex, locRef, renderDash) {
  let arr = [];
  for (let i = 0; i <= correctIndex; i++) {
    arr.push(
      <Word
        renderDash={renderDash}
        locRef={locRef}
        key={i}
        index={i}
        correct={true}
      ></Word>
    );
  }
  for (let i = correctIndex + 1; i < wordsArray.length; i++) {
    arr.push(
      <Word renderDash={renderDash} locRef={locRef} key={i} index={i}></Word>
    );
  }
  return arr;
}

export default function WordContainer({ setResultPage, setTypePage }) {
  const [renderDash, setRenderDash] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [testStarted, setTestStarted] = useState(false);
  const [firstDiffOfHeight, setFirstDiffOfHeight] = useState(-1.0);
  const [secondDiffOfHeight, setSecondDiffOfHeight] = useState(-1.0);
  const [flag, setFlag] = useState(true);
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
    if (!testStarted) return;
    if (timeLeft <= 0) {
      setResultPage(true);
      setTypePage(false);
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, testStarted]);

  useEffect(() => {
    if (!typed.length) {
      dispatch(setCorrectTypedIndex(-1));
      return;
    }
    if (flag) {
      dispatch(setTime(timeLeft));
      setFlag(false);
    }
    setTestStarted(true);

    setIsWrong(typed[typed.length - 1] !== activeWord[typed.length - 1]);

    if (isWrong) {
      dispatch(setWrongIndex(typed.length - 1));
      return;
    } else if (
      typed.length === activeWord.length + 1 &&
      typed[typed.length - 1] === " "
    ) {
      dispatch(incrementActiveIndex());
      setTyped("");
      setIsWrong(false);
      setRenderDash(false);
    } else if (
      typed.length === activeWord.length + 1 &&
      typed[typed.length - 1] !== " "
    ) {
      setRenderDash(true);
    } else {
      setRenderDash(false);
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
        enterSymbolHeight - containerHeight !== firstDiffOfHeight &&
        firstDiffOfHeight !== -1.0 &&
        secondDiffOfHeight === -1.0
      )
        setSecondDiffOfHeight(enterSymbolHeight - containerHeight);

      if (
        secondDiffOfHeight !== -1.0 &&
        enterSymbolHeight - containerHeight > 0.1 + secondDiffOfHeight
      ) {
        dispatch(deleteAndaddWords());
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
    <div className=" w-[73%] mx-auto mt-24 h-fit">
      {!testStarted ? (
        <TimeSelect
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          textAreaRef={textAreaRef}
        ></TimeSelect>
      ) : (
        <div className="h-[4.48rem]"></div>
      )}

      <span className="text-yellow-400 text-3xl ">{timeLeft}</span>
      <div
        className="flex  text-white text-2xl h-[8rem] mt-2"
        onClick={makeTextAreaActive}
      >
        <textarea
          className="h-[0px] w-0 peer"
          value={typed}
          onChange={onTextAreaChange}
          autoFocus
          ref={textAreaRef}
        ></textarea>
        <div
          className="flex gap-3 justify-between flex-wrap overflow-hidden h-[8rem] peer-[:not(:focus)]:opacity-15 transition-all ease-linear"
          ref={wordContainerRef}
        >
          {spreadWord(
            testData.wordsArray,
            correctIndex,
            locRef,
            renderDash
          ).map((item) => item)}
        </div>
      </div>
    </div>
  );
}
