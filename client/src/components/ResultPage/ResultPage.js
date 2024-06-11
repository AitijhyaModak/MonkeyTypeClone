import { useDispatch, useSelector } from "react-redux";
import { resetState, resetStateButNotWords } from "../../state/testSlice";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { useRef } from "react";
import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const Animation = keyframes`
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

export default function ResultPage({
  setResultPage,
  setTypePage,
  setProfilePage,
  setForm,
  setTimeLeft,
  setTyped,
  setTestStarted,
  setLeaderboard,
  setIsWrong,
}) {
  const screenshotRef = useRef(null);
  const dispatch = useDispatch();
  const testData = useSelector((state) => state.testReducer);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  function takeSSandDownload() {
    takeScreenshot(screenshotRef.current).then(download);
  }

  function startNewTest() {
    dispatch(resetState());
    setResultPage(false);
    setProfilePage(false);
    setLeaderboard(false);
    setForm(false);
    setTimeLeft(30);
    setIsWrong(false);
    setTypePage(true);
    setTyped("");
    setTestStarted(false);
  }

  function repeatSameTest() {
    dispatch(resetStateButNotWords());
    setResultPage(false);
    setProfilePage(false);
    setForm(false);
    setLeaderboard(false);
    setIsWrong(false);
    setTimeLeft(30);
    setTypePage(true);
    setTyped("");
    setTestStarted(false);
  }

  return (
    <Reveal keyframes={Animation} duration={1500}>
      <div>
        <div
          className="lg:flex-col lg:gap-16 sma:mt-0 sm:mt-10 lg:mt-0 lg:pt-5 w-[90%] mx-auto mt-20 p-20 flex justify-between items-center bg-slate-800"
          ref={screenshotRef}
        >
          <div className="lg:items-center flex flex-col  items-start">
            <span className="text-3xl text-green-200">wpm</span>
            <span className="text-7xl text-green-300">
              {Math.floor((testData.wordsTyped / testData.time) * 60)}
            </span>
          </div>

          <div className="lg:items-center flex flex-col items-start">
            <span className="text-3xl text-green-200">mistakes</span>
            <span className=" text-7xl text-green-300">
              {Math.ceil(testData.mistakes / 2)}
            </span>
          </div>

          <div className="lg:items-center flex flex-col items-start">
            <span className="text-3xl text-green-200">characters</span>
            <span className="text-7xl text-green-300">
              {testData.characters}
            </span>
          </div>

          <div className="lg:items-center flex flex-col items-start">
            <span className="text-3xl text-green-200">consistency</span>
            <span className="text-7xl text-green-300">
              {Math.floor(
                ((testData.characters - testData.mistakes / 2) * 100) /
                  testData.characters
              )}
              %
            </span>
          </div>
        </div>

        <div className="lg:items-center lg:flex-col w-[90%] flex justify-center mx-auto items-center gap-40 mt-10">
          <div className="lga:hidden lg:flex lg:gap-32">
            <span className="lg:text-2xl text-white" onClick={startNewTest}>
              ➤
            </span>
            <span
              className="lg:text-4xl lg:mt-[-6px] text-white"
              onClick={repeatSameTest}
            >
              ⟳
            </span>
          </div>

          <div className=" lg:hidden flex flex-col items-center gap-6">
            <span
              className="lg:text-md text-white hover:text-green-300 text-2xl cursor-pointer transition-all ease-linear peer"
              onClick={startNewTest}
            >
              ➤
            </span>

            <span className="text-xl bg-black text-white translate-y-[-7px] peer-hover:translate-y-0 peer-hover:opacity-60 w-fit p-2 opacity-0 transition-all ease-linear">
              Start new test
            </span>
          </div>

          <div className="lg:hidden flex flex-col items-center gap-6">
            <span
              className="lg:text-md text-white hover:text-green-300 text-3xl cursor-pointer mt-[-3px] transition-all ease-linear peer"
              onClick={repeatSameTest}
            >
              ⟳
            </span>
            <span className="text-xl  bg-black text-white  translate-y-[-7px] peer-hover:opacity-60 peer-hover:translate-y-0 w-fit p-2 opacity-0 transition-all ease-linear">
              Repeat test
            </span>
          </div>

          <div className="lg:hidden flex flex-col items-center gap-6">
            <span
              className="lg:text-sm text-white hover:text-green-300 text-2xl cursor-pointer ease-linear transition-all peer"
              onClick={takeSSandDownload}
            >
              ⌧
            </span>
            <span className="text-xl  bg-black text-white translate-y-[-7px] peer-hover:translate-y-0 peer-hover:opacity-60 w-fit p-2 opacity-0 transition-all ease-linear">
              Take a screenshot
            </span>
          </div>
        </div>

        <div className="lga:hidden lg:mt-6 lg:mx-auto w-fit">
          <span
            className="lg:text-2xl lg:mx-auto text-white hover:text-green-300 text-2xl cursor-pointer ease-linear transition-all peer"
            onClick={takeSSandDownload}
          >
            ⌧
          </span>
        </div>
      </div>
    </Reveal>
  );
}
