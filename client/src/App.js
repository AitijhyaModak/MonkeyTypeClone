import Nav from "./components/Navbar/Nav";
import WordContainer from "./components/WordContainer/WordContainer";
import { setTest } from "./state/testSlice";
import { useEffect, useState } from "react";
import ResultPage from "./components/ResultPage/ResultPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { useDispatch } from "react-redux";
import SignInUp from "./components/Authentication/SignInUp";
import { logout } from "./state/userSlice";
import Leaderboard from "./components/Leaderboard/Leaderboard";

export default function App() {
  const [testStarted, setTestStarted] = useState(false);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(30);
  const [typePage, setTypePage] = useState(true);
  const [resultPage, setResultPage] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [form, setForm] = useState(false);
  const [typed, setTyped] = useState("");
  const [leaderboard, setLeaderboard] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    dispatch(setTest());
  });

  useEffect(() => {
    function callback() {
      if (!localStorage.getItem("profile")) dispatch(logout());
      setTypePage(true);
      setResultPage(false);
      setProfilePage(false);
      setForm(false);
    }

    window.addEventListener("storage", callback);

    return () => window.removeEventListener("storage", callback);
  });

  return (
    <div className="min-h-screen bg-slate-800 p-5">
      <Nav
        setProfilePage={setProfilePage}
        setTypePage={setTypePage}
        setResultPage={setResultPage}
        setForm={setForm}
        setTestStarted={setTestStarted}
        setTimeLeft={setTimeLeft}
        setTyped={setTyped}
        setIsWrong={setIsWrong}
        setLeaderboard={setLeaderboard}
      ></Nav>
      {typePage && (
        <WordContainer
          setResultPage={setResultPage}
          setTypePage={setTypePage}
          setProfilePage={setProfilePage}
          setForm={setForm}
          setTestStarted={setTestStarted}
          testStarted={testStarted}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          typed={typed}
          setIsWrong={setIsWrong}
          isWrong={isWrong}
          setTyped={setTyped}
          setLeaderboard={setLeaderboard}
        ></WordContainer>
      )}
      {resultPage && (
        <ResultPage
          setResultPage={setResultPage}
          setTypePage={setTypePage}
          setProfilePage={setProfilePage}
          setForm={setForm}
          setTimeLeft={setTimeLeft}
          setTyped={setTyped}
          setIsWrong={setIsWrong}
          setTestStarted={setTestStarted}
          setLeaderboard={setLeaderboard}
        ></ResultPage>
      )}
      {profilePage && (
        <ProfilePage
          setResultPage={setResultPage}
          setForm={setForm}
          setProfilePage={setProfilePage}
          setTypePage={setTypePage}
          setLeaderboard={setLeaderboard}
        ></ProfilePage>
      )}
      {form && (
        <SignInUp
          setResultPage={setResultPage}
          setForm={setForm}
          setProfilePage={setProfilePage}
          setTypePage={setTypePage}
          setTyped={setTyped}
          setIsWrong={setIsWrong}
          setTestStarted={setTestStarted}
          setTimeLeft={setTimeLeft}
          setLeaderboard={setLeaderboard}
        ></SignInUp>
      )}
      {leaderboard && <Leaderboard></Leaderboard>}
    </div>
  );
}
