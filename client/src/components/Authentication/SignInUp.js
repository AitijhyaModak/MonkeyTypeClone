import { useState } from "react";
import { signupAPI, signinAPI } from "../../actions/userAPI";
import { useDispatch } from "react-redux";
import { login } from "../../state/userSlice";
import { resetState, setTest } from "../../state/testSlice";
import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";
import Loader from "../Loader/Loader";

const Animation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

export default function SignInUp({
  setForm,
  setProfilePage,
  setResultPage,
  setTypePage,
  setTyped,
  setTestStarted,
  setTimeLeft,
  setLeaderboard,
  setIsWrong,
}) {
  return (
    <Reveal keyframes={Animation} duration={1500}>
      <div className="sm:flex-col sm:items-center sm:gap-10 flex justify-between px-20 pt-12">
        <Signup></Signup>
        <Signin
          setResultPage={setResultPage}
          setForm={setForm}
          setProfilePage={setProfilePage}
          setTypePage={setTypePage}
          setTyped={setTyped}
          setIsWrong={setIsWrong}
          setTestStarted={setTestStarted}
          setTimeLeft={setTimeLeft}
          setLeaderboard={setLeaderboard}
        ></Signin>
      </div>
    </Reveal>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signin({
  setResultPage,
  setForm,
  setProfilePage,
  setTypePage,
  setTimeLeft,
  setIsWrong,
  setTyped,
  setTestStarted,
  setLeaderboard,
}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSignInClick(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Email must be valid");
      return;
    }

    if (!password) {
      setError("Password is empty");
      return;
    }

    setError("");
    setIsLoading(true);
    const res = await signinAPI({ email: email, password: password });
    setIsLoading(false);
    if (res.status !== 200) setError(res.data.message);
    else {
      dispatch(login(res.data.data));

      setForm(false);
      setResultPage(false);
      setProfilePage(false);
      setLeaderboard(false);
      setTypePage(true);

      dispatch(resetState());
      dispatch(setTest());
      setTyped("");
      setIsWrong(false);
      setTestStarted(false);
      setTimeLeft(30);
    }

    return;
  }

  return (
    <div>
      <form className="max-w-[25%]">
        <p className="mb-2 pl-1 text-lg text-green-300">login</p>
        <div className="flex flex-col w-fit gap-5 items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailInput"
            placeholder="email"
            className="p-2 pl-3 w-60 rounded-lg bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="p-2 rounded-lg pl-3 w-60 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          {error && <p className="text-red-400 font-semibold">{error}</p>}

          <button
            onClick={onSignInClick}
            className="w-60 mda:hover:border-2 mda:hover:border-green-300 h-10 rounded-full bg-gray-900 text-green-300 "
          >
            Sign In
          </button>
          {isLoading && <Loader marginData="1rem"></Loader>}
        </div>
      </form>
    </div>
  );
}

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSignUpClick(e) {
    e.preventDefault();
    setSuccess("");
    if (username < 4) {
      setError("Username must be atleast 4 characters");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email address must be valid");
      return;
    }

    if (verifyEmail !== email) {
      setError("The emails do not match");
      return;
    }

    if (password.length < 5) {
      setError("Password must contain minimum 5 Characters");
      return;
    }

    if (verifyPassword !== password) {
      setError("The passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);
    const res = await signupAPI({
      username: username,
      password: password,
      email: email,
    });
    setIsLoading(false);
    if (res.status !== 200) setError(res.data.message);
    else {
      setSuccess("Account created succesfully");
      setEmail("");
      setPassword("");
      setVerifyEmail("");
      setVerifyPassword("");
      setUsername("");
    }
    return;
  }

  return (
    <div className="w-fit">
      <form className="w-fit">
        <p className="mb-2 pl-1 text-lg text-green-300">register</p>
        <div className="flex flex-col w-fit gap-5 ">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="p-2 rounded-lg w-60 pl-3 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="p-2 rounded-lg w-60 pl-3 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          <input
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            type="email"
            placeholder="verify email"
            className="p-2 rounded-lg  w-60 pl-3 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="p-2 rounded-lg w-60 pl-3 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />

          <input
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            type="password"
            placeholder="verify password"
            className="p-2 rounded-lg pl-3 w-60 bg-gray-900 outline-none focus:border-2 focus:border-green-300 caret-blue-400 text-green-300"
          />
          {success && <p className="text-green-400 font-semibold">{success}</p>}
          {error && <p className="text-red-400 font-semibold">{error}</p>}
          <button
            onClick={onSignUpClick}
            className="mda:hover:border-2 w-60 mda:hover:border-green-300 h-10 rounded-full bg-gray-900 text-green-300 "
          >
            Sign Up
          </button>
          {isLoading && <Loader marginData="1rem"></Loader>}
        </div>
      </form>
    </div>
  );
}
