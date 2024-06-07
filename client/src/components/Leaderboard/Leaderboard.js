import { useEffect, useState } from "react";
import { getLeaderBoardDataAPI } from "../../actions/userAPI";

export default function Leaderboard() {
  const [leaderData, setLeaderData] = useState(null);

  useEffect(() => {
    async function getLeaderBoardData() {
      const data = await getLeaderBoardDataAPI();
      console.log(data.data.dataArray);
      setLeaderData(data.data.dataArray);
    }
    getLeaderBoardData();
  }, []);
  let index = 1;
  return (
    <div className=" w-[85%] mx-auto mt-5 h-fit ">
      <h1 className="text-4xl  text-teal-400">All Time Top-10 Leaderboard</h1>
      <div className="mt-5 border-2 max-h-[500px] overflow-y-scroll outline-none">
        <ul className=" ">
          <Heading></Heading>
          {leaderData &&
            leaderData.map((item) => (
              <LeaderList
                data={{ ...item, number: index }}
                key={index++}
              ></LeaderList>
            ))}
        </ul>
      </div>
    </div>
  );
}

function LeaderList({ data }) {
  return (
    <li className="even:bg-slate-900 mt-2 even:py-3 even:rounded-2xl odd:py-0 pl-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-10">
          <div className="p-2 w-10 text-green-200 ">
            {data.number === 1 ? "👑" : data.number}
          </div>
          <div className="p-2 w-56  text-yellow-400">{data.username}</div>
        </div>

        <div className="p-2 w-16  text-red-400">{data.wpm}</div>
      </div>
    </li>
  );
}

function Heading() {
  return (
    <li className=" mt-16 pl-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-10">
          <div className="p-2 w-10 font-semibold text-gray-200">#</div>
          <div className="p-2 w-56 font-semibold text-gray-200">name</div>
        </div>

        <div className="p-2 w-16 font-semibold text-gray-200">wpm</div>
      </div>
    </li>
  );
}

const fakeData = [
  {
    number: 1,
    username: "rahulYadav",
    wpm: 89,
  },
  {
    number: 2,
    username: "rxiTo2_rxi",
    wpm: 102,
  },
  {
    number: 3,
    username: "__22ankur",
    wpm: 66,
  },
  {
    number: 4,
    username: "anj_ani2",
    wpm: 77,
  },
  {
    number: 5,
    username: "AitijhyaModak",
    wpm: 134,
  },
];
