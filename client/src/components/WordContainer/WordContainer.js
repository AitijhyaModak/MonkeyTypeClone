import Word from "./Word";

export default function WordContainer({ wordsArray }) {
  return (
    <div className="p-32">
      <div className="flex gap-3 flex-wrap text-2xl text-gray-400 font-semibold">
        {wordsArray.map((word) => (
          <Word word={word}></Word>
        ))}
      </div>
    </div>
  );
}
