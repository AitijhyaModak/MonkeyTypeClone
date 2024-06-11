export default function UserWPM({ data }) {
  return (
    <div className="sm:w-full rounded-3xl gap-16 px-10 py-4 bg-[rgb(17,25,43)]  w-fit mt-10 mx-auto">
      <p className="  text-2xl text-white text-center">wpm</p>
      <p className="text-5xl sm:mx-auto sm:px-0 text-center text-green-300 px-32">
        {data && data.wpm ? data.wpm : "-"}
      </p>
    </div>
  );
}
