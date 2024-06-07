export default function WPMcard({ data }) {
  return (
    <div className="rounded-3xl w-fit flex mt-10 gap-16 px-10 py-4 bg-[rgb(17,25,43)] items-center mx-auto">
      <WPM data={data} number={15}></WPM>
      <WPM data={data} number={30}></WPM>
      <WPM data={data} number={60}></WPM>
    </div>
  );
}

function WPM({ number, data }) {
  function showvalue() {
    if (number === 15) {
      if (data) {
        if (data && data.highestWPM_15) return data.highestWPM_15;
        else return "-";
      }
    } else if (number === 30) {
      if (data) {
        if (data && data.highestWPM_30) return data.highestWPM_30;
        else return "-";
      }
    } else if (number === 60) {
      if (data) {
        if (data && data.highestWPM_60) return data.highestWPM_60;
        else return "-";
      }
    }
  }

  return (
    <div className="">
      <p className="text-white text-center text-xl  ">{number} seconds</p>
      <p className="text-green-300 text-center mt-2 text-4xl">{showvalue()}</p>
    </div>
  );
}
