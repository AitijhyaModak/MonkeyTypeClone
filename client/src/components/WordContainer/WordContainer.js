import Word from "./Word";
import TimeSelect from "./TimeSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementActiveIndex,
  setWrongIndex,
  setCorrectTypedIndex,
  deleteAndaddWords,
  setTime,
} from "../../state/testSlice";
import {
  updateTestsStartedAPI,
  updateTestCompletedAPI,
} from "../../actions/userAPI";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform-origin: translateY(0);
  }
}
`;

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

export default function WordContainer({
  setResultPage,
  setTypePage,
  setProfilePage,
  setForm,
  testStarted,
  setTestStarted,
  setTimeLeft,
  timeLeft,
  typed,
  setTyped,
  setLeaderboard,
  isWrong,
  setIsWrong,
}) {
  const [renderDash, setRenderDash] = useState(false);
  const [firstDiffOfHeight, setFirstDiffOfHeight] = useState(-1.0);
  const [secondDiffOfHeight, setSecondDiffOfHeight] = useState(-1.0);
  const [flag, setFlag] = useState(true);
  const wordContainerRef = useRef();
  const locRef = useRef();
  const textAreaRef = useRef();
  const activeWord = useSelector((state) => state.testReducer.currentWord);
  const testData = useSelector((state) => state.testReducer);
  const correctIndex = useSelector(
    (state) => state.testReducer.correctlyTypedTillIndex
  );
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userReducer.userData);

  useEffect(() => {
    if (!testStarted) return;
    if (timeLeft <= 0) {
      setTypePage(false);
      setProfilePage(false);
      setForm(false);
      setLeaderboard(false);
      setResultPage(true);
      if (userToken) updateTestCompleted();
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, testStarted]);

  async function updateTestsStarted() {
    await updateTestsStartedAPI(userToken);
    return;
  }

  async function updateTestCompleted() {
    await updateTestCompletedAPI(
      userToken,
      testData.time,
      testData.wordsTyped,
      Math.floor((testData.wordsTyped / testData.time) * 60)
    );
    return;
  }

  useEffect(() => {
    if (!typed.length) {
      dispatch(setCorrectTypedIndex(-1));
      return;
    }
    if (flag) {
      dispatch(setTime(timeLeft));
      setFlag(false);
    }

    if (!testStarted) {
      setTestStarted(true);
      if (userToken) updateTestsStarted();
    }

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
    <Reveal duration={1000} keyframes={customAnimation}>
      <div className=" w-[73%] mx-auto mt-24 h-fit">
        {!testStarted ? (
          <TimeSelect
            timeLeft={timeLeft}
            setTime={setTime}
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
    </Reveal>
  );
}
