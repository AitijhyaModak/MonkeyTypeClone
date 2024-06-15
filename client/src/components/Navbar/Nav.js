import { FaKeyboard } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetState, setTest } from "../../state/testSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, login } from "../../state/userSlice";
import * as jose from "jose";

export default function Nav({
  setResultPage,
  setTypePage,
  setProfilePage,
  setForm,
  setTestStarted,
  setTimeLeft,
  setTyped,
  setIsWrong,
  setLeaderboard,
}) {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.userReducer.isSignedIn);
  const userData = useSelector((state) => state.userReducer.userData);

  useEffect(() => {
    const token = localStorage.getItem("profile");
    if (token) dispatch(login(token));
    else dispatch(logout());
  });

  function onProfileClick() {
    setTypePage(false);
    setResultPage(false);
    setProfilePage(false);
    setLeaderboard(false);
    setForm(true);
  }

  function onLeaderboardClick() {
    setTypePage(false);
    setResultPage(false);
    setProfilePage(false);
    setLeaderboard(true);
    setForm(false);
  }

  function onKeyboardClick() {
    setResultPage(false);
    setLeaderboard(false);
    setProfilePage(false);
    setForm(false);
    dispatch(resetState());
    dispatch(setTest());
    setTyped("");
    setTestStarted(false);
    setIsWrong(false);
    setTypePage(true);
    setTimeLeft(30);
  }

  function onUsernameClick() {
    setTypePage(false);
    setResultPage(false);
    setForm(false);
    setLeaderboard(false);
    setProfilePage(true);
  }

  function onLogoutClick() {
    console.log("X");
    dispatch(logout());
    setTypePage(true);
    setResultPage(false);
    setLeaderboard(false);
    setForm(false);
    setProfilePage(false);
    return;
  }

  return (
    <nav className="sm:flex-col sm:pt-5 sm:gap-5 flex items-center justify-between h-20 p-16">
      <div className="sm:gap-20 flex items-center gap-10">
        <span className="sm:hidden text-cyan-400 font-bold text-4xl cursor-pointer">
          amType
        </span>
        <FaKeyboard
          size={25}
          color="white"
          className="mda:hover:fill-green-400 cursor-pointer transition-all ease-linear mt-3"
          onClick={onKeyboardClick}
        ></FaKeyboard>
        <MdLeaderboard
          onClick={onLeaderboardClick}
          size={25}
          color="white"
          className="mda:hover:fill-green-400 cursor-pointer transition-all ease-linear mt-3"
        ></MdLeaderboard>
      </div>

      <div className="flex items-center gap-10 mt-3">
        {!isSignedIn && (
          <span
            className="text-xl text-white mda:hover:text-green-400 cursor-pointer transition-all ease-linear"
            onClick={onProfileClick}
          >
            Guest
          </span>
        )}
        {isSignedIn && (
          <span
            onClick={onUsernameClick}
            className="underline cursor-pointer text-yellow-400 text-xl mda:hover:text-yellow-600 transition-all ease-linear"
          >
            {jose.decodeJwt(userData).data.username}
          </span>
        )}
        {isSignedIn && (
          <IoIosLogOut
            size={25}
            onClick={onLogoutClick}
            color="white"
            className="mda:hover:fill-green-400 cursor-pointer transition-all ease-linear"
          ></IoIosLogOut>
        )}
      </div>
    </nav>
  );
}
