export default function ProfileCard({ data }) {
  return (
    <div className="md:mt-10 rounded-3xl gap-16 px-10 pt-7 py-4 bg-[rgb(17,25,43)] items-center w-fit mx-auto">
      <div className="flex flex-col">
        <span className="text-4xl sm:text-xl text-green-300 text-center mx-auto">
          {data && data.username}
        </span>
      </div>
      <div className="w-full mt-7 mb-7 h-2 rounded-lg bg-[rgba(116,116,117,0.44)]"></div>
      <div className="sm:gap-y-7 sm:gap-x-32 sm:justify-center flex-wrap flex justify-between gap-24 w-full">
        <div className="">
          <p className="text-white text-xl">tests started</p>
          <p className="text-3xl text-green-300 sm:text-center">
            {data && data.testsStarted}
          </p>
        </div>
        <div className="">
          <p className="text-white text-xl">tests completed</p>
          <p className="text-3xl text-green-300 sm:text-center">
            {data && data.testsCompleted}
          </p>
        </div>
        <div className="">
          <p className="text-white text-xl">time typed</p>
          <p className="text-3xl text-green-300 sm:text-center">
            {data && data.timeTyping} s
          </p>
        </div>
      </div>
    </div>
  );
}
