import { IoMenuSharp } from "react-icons/io5";

export default function Nav() {
  return (
    <nav className=" flex items-center justify-between h-20 p-16">
      <span className="text-cyan-400 font-bold text-4xl">amType</span>

      <div className="flex items-center gap-10 mt-3">
        <span className="text-xl text-white hover:text-green-400 cursor-pointer">
          Guest
        </span>
        <IoMenuSharp
          color="white"
          size={30}
          className="hover:fill-green-400 cursor-pointer"
        ></IoMenuSharp>
      </div>
    </nav>
  );
}
