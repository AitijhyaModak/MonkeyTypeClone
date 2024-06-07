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
  const [typePage, setTypePage] = useState(false);
  const [resultPage, setResultPage] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [form, setForm] = useState(false);
  const [typed, setTyped] = useState("");
  const [leaderboard, setLeaderboard] = useState(true);

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
          setTyped={setTyped}
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
          setTestStarted={setTestStarted}
        ></ResultPage>
      )}
      {profilePage && (
        <ProfilePage
          setResultPage={setResultPage}
          setForm={setForm}
          setProfilePage={setProfilePage}
          setTypePage={setTypePage}
        ></ProfilePage>
      )}
      {form && (
        <SignInUp
          setResultPage={setResultPage}
          setForm={setForm}
          setProfilePage={setProfilePage}
          setTypePage={setTypePage}
          setTyped={setTyped}
          setTestStarted={setTestStarted}
          setTimeLeft={setTimeLeft}
        ></SignInUp>
      )}
      {leaderboard && <Leaderboard></Leaderboard>}
    </div>
  );
}
