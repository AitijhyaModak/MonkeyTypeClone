import styles from "./word.module.css";
import { useSelector } from "react-redux";

export default function Word({ index, correct, locRef }) {
  const word = useSelector((state) => state.testReducer.wordsArray[index]);
  const wrongIndex = useSelector((state) => state.testReducer.wrongTypedIndex);
  const correctIndex = useSelector(
    (state) => state.testReducer.correctTypedIndex
  );
  const activeIndex = useSelector(
    (state) => state.testReducer.currentIndexTyping
  );
  let letters = [];
  let tempkey = 0;
  for (let i of word) letters.push(i);
  return (
    <div
      className={`${correct ? styles.correct : styles.normal} ${
        index === activeIndex ? styles.active : null
      }`}
    >
      {index === activeIndex ? (
        <span ref={locRef} className="h-0 w-0  text-yellow-800">
          ⇛
        </span>
      ) : null}

      {letters.map((i) => (
        <span
          className={
            tempkey === wrongIndex && activeIndex === index
              ? styles.wrong
              : tempkey <= correctIndex && activeIndex === index
              ? styles.correct
              : null
          }
          key={tempkey++}
        >
          {i}
        </span>
      ))}
    </div>
  );
}
