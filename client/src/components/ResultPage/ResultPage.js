import { useDispatch, useSelector } from "react-redux";
import { resetState, resetStateButNotWords } from "../../state/testSlice";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { useRef } from "react";

export default function ResultPage({
  setResultPage,
  setTypePage,
  setProfilePage,
  setForm,
  setTimeLeft,
  setTyped,
  setTestStarted,
  setLeaderboard,
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
    setTimeLeft(30);
    setTypePage(true);
    setTyped("");
    setTestStarted(false);
  }

  return (
    <div>
      <div
        className=" w-[90%] mx-auto mt-20 p-20 flex justify-between items-center bg-slate-800"
        ref={screenshotRef}
      >
        <div className="flex flex-col  items-start">
          <span className="text-3xl text-green-200">wpm</span>
          <span className="text-7xl text-green-300">
            {Math.floor((testData.wordsTyped / testData.time) * 60)}
          </span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-3xl text-green-200">mistakes</span>
          <span className="text-7xl text-green-300">
            {Math.ceil(testData.mistakes / 2)}
          </span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-3xl text-green-200">characters</span>
          <span className="text-7xl text-green-300">{testData.characters}</span>
        </div>

        <div className="flex flex-col items-start">
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

      <div className="w-[90%] flex  justify-center mx-auto items-center gap-40 mt-10">
        <div className="flex flex-col items-center gap-6">
          <span
            className="text-white hover:text-green-300 text-2xl cursor-pointer transition-all ease-linear  peer"
            onClick={startNewTest}
          >
            ➤
          </span>

          <span className="text-xl  bg-black text-white translate-y-[-7px] peer-hover:translate-y-0 peer-hover:opacity-60 w-fit p-2 opacity-0 transition-all ease-linear">
            Start new test
          </span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <span
            className="text-white hover:text-green-300 text-3xl cursor-pointer mt-[-3px] transition-all ease-linear peer"
            onClick={repeatSameTest}
          >
            ⟳
          </span>
          <span className="text-xl  bg-black text-white  translate-y-[-7px] peer-hover:opacity-60 peer-hover:translate-y-0 w-fit p-2 opacity-0 transition-all ease-linear">
            Repeat test
          </span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <span
            className="text-white hover:text-green-300 text-2xl cursor-pointer ease-linear transition-all peer"
            onClick={takeSSandDownload}
          >
            ⌧
          </span>
          <span className="text-xl  bg-black text-white translate-y-[-7px] peer-hover:translate-y-0 peer-hover:opacity-60 w-fit p-2 opacity-0 transition-all ease-linear">
            Take a screenshot
          </span>
        </div>
      </div>
    </div>
  );
}
