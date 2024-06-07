export default function ProfileCard({ data }) {
  return (
    <div className="rounded-3xl gap-16 px-10 pt-7 py-4 bg-[rgb(17,25,43)] items-center w-fit mx-auto">
      <div className="flex flex-col">
        <span className="text-4xl text-green-300 text-center mx-auto">
          {data && data.username}
        </span>
      </div>
      <div className="w-full mt-7 mb-7 h-2 rounded-lg bg-[rgba(116,116,117,0.44)]"></div>
      <div className="flex justify-between gap-24 w-full">
        <div>
          <p className="text-white">tests started</p>
          <p className="text-3xl text-green-300">{data && data.testsStarted}</p>
        </div>
        <div>
          <p className="text-white">tests completed</p>
          <p className="text-3xl text-green-300">
            {data && data.testsCompleted}
          </p>
        </div>
        <div>
          <p className="text-white">time typing</p>
          <p className="text-3xl text-green-300">{data && data.timeTyping}</p>
        </div>
      </div>
    </div>
  );
}
