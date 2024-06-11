import { useEffect, useState } from "react";
import { getLeaderBoardDataAPI } from "../../actions/userAPI";
import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const HeadingAnimation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

export default function Leaderboard() {
  const [leaderData, setLeaderData] = useState(null);
  const [leaderboardError, setLeaderboardError] = useState("");

  useEffect(() => {
    async function getLeaderBoardData() {
      setLeaderboardError("");
      const res = await getLeaderBoardDataAPI();

      if (res.status === 200) setLeaderData(res.data.dataArray);
      else setLeaderboardError("Error while fetching leaderboard data");
    }
    getLeaderBoardData();
  }, []);
  let index = 1;
  return (
    <div className="sm:mt-20 w-[85%] mx-auto mt-5 h-fit ">
      <Reveal keyframes={HeadingAnimation} duration={1500}>
        <h1 className="sm:text-3xl sm:text-center text-4xl  text-teal-400">
          All Time Top-10 Leaderboard
        </h1>
      </Reveal>

      <Reveal keyframes={HeadingAnimation} duration={1500}>
        <div className="mt-5 max-h-[500px] overflow-y-scroll outline-none ">
          <ul className=" ">
            <Heading></Heading>
            {leaderboardError.length !== 0 && (
              <h1 className="text-red-400 font-semibold text-3xl mt-10">
                {leaderboardError}
              </h1>
            )}
            {leaderData &&
              leaderData.map((item) => (
                <LeaderList
                  data={{ ...item, number: index }}
                  key={index++}
                ></LeaderList>
              ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

function LeaderList({ data }) {
  return (
    <li className="even:bg-slate-900 mt-2 even:py-3 even:rounded-2xl odd:py-0 pl-4">
      <div className="sm:justify-normal sm:gap-10 flex w-full justify-between items-center">
        <div className="flex gap-10">
          <div className="p-2 w-10 text-green-200 ">
            {data.number === 1 ? "👑" : data.number}
          </div>
          <div className="sm:hidden p-2 w-56  text-yellow-400">
            {data.username}
          </div>
        </div>

        <div className="sm:hidden p-2 w-16  text-red-400">{data.wpm}</div>

        <div className="sma:hidden">
          <div className="pt-2  text-yellow-400">{data.username}</div>
          <div className="sm:mt-[-.2rem]   text-red-400">{data.wpm}</div>
        </div>
      </div>
    </li>
  );
}

function Heading() {
  return (
    <li className="sm:mt-5 mt-16 pl-4">
      <div className="sm:gap-10 sm:justify-normal  items-center flex w-full justify-between">
        <div className="flex gap-10">
          <div className="p-2 w-10 font-semibold text-gray-200">#</div>
          <div className="sm:hidden p-2 w-56 font-semibold text-gray-200">
            name
          </div>
        </div>

        <div className="sm:hidden p-2 w-16 font-semibold text-gray-200">
          wpm
        </div>

        <div className="sma:hidden flex flex-col">
          <div className=" pt-2 font-semibold text-gray-200">name</div>
          <div className=" mt-[-.4rem] font-semibold text-gray-200">wpm</div>
        </div>
      </div>
    </li>
  );
}
