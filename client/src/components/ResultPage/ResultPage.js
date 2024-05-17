import Nav from "../Navbar/Nav";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState, resetStateButNotWords } from "../../state/slice";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { useRef } from "react";

export default function ResultPage() {
  const screenshotRef = useRef(null);
  const navigate = useNavigate();
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
    navigate("/", { replace: true });
  }

  function repeatSameTest() {
    dispatch(resetStateButNotWords());
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-800 p-5">
      <Nav></Nav>
      <div
        className=" w-[90%] mx-auto mt-20 p-20 flex justify-between items-center bg-slate-800"
        ref={screenshotRef}
      >
        <div className="flex flex-col  items-start">
          <span className="text-3xl text-green-200">wpm</span>
          <span className="text-7xl text-green-300">
            {testData.wordsTyped * 2}
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
        <span
          className="text-white hover:text-green-300 text-2xl cursor-pointer"
          onClick={startNewTest}
        >
          ➤
        </span>
        <span
          className="text-white hover:text-green-300 text-3xl cursor-pointer mt-[-3px]"
          onClick={repeatSameTest}
        >
          ⟳
        </span>

        <span
          className="text-white hover:text-green-300 text-2xl cursor-pointer"
          onClick={takeSSandDownload}
        >
          ⌧
        </span>
      </div>
    </div>
  );
}
