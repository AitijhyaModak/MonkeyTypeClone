export default function TimeSelect({
  setTime,
  timeLeft,
  setTimeLeft,
  textAreaRef,
}) {
  function onTimeSelect(amount) {
    setTimeLeft(amount);
    setTime(amount);
    textAreaRef.current.focus();
    return;
  }

  return (
    <div className="mb-8 flex gap-10  bg-slate-900 w-fit mx-auto px-4 py-2 rounded-xl text-white cursor-pointer opacity-80 font-semibold">
      <div
        className="mda:hover:text-green-400 transition-all ease-linear"
        style={timeLeft === 15 ? { color: "rgb(59,130,246)" } : null}
        onClick={() => onTimeSelect(15)}
      >
        15
      </div>
      <div
        style={timeLeft === 30 ? { color: "rgb(59,130,246)" } : null}
        className="mda:hover:text-green-400 transition-all ease-linear"
        onClick={() => onTimeSelect(30)}
      >
        30
      </div>
      <div
        className="mda:hover:text-green-400 transition-all ease-linear"
        style={timeLeft === 60 ? { color: "rgb(59,130,246)" } : null}
        onClick={() => onTimeSelect(60)}
      >
        60
      </div>
    </div>
  );
}
