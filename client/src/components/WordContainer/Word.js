import { useState } from "react";
import styles from "./word.module.css";
import { useSelector } from "react-redux";

// function spreadLetters(letters,wrongIndex,correctIndex,activeIndex) {
//   let arr=[];
//   let index = Math.max(wrongIndex,correctIndex);
//   for (let i=0;i<letters.size();i++) {
//     if (i-1===index) arr.push({index === activeIndex ? <span className={styles.caret}>|</span> : null});
//     arr.push(<span
//       className={
//         tempkey === wrongIndex && activeIndex === index
//           ? styles.wrong
//           : tempkey <= correctIndex && activeIndex === index
//           ? styles.correct
//           : null
//       }
//       key={tempkey++}
//     >
//       letters[i]
//     </span>)
//   }

//   return arr;
// }

export default function Word({ index, correct }) {
  const word = useSelector((state) => state.testReducer.wordsArray[index]);
  const wrongIndex = useSelector((state) => state.testReducer.wrongTypedIndex);
  const correctIndex = useSelector(
    (state) => state.testReducer.correctTypedIndex
  );
  console.log(wrongIndex);
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
      // className={index === activeIndex ? styles.active : null}
    >
      {/* {index === activeIndex ? <span className={styles.caret} styles={{marginLeft: ``}}>|</span> : null} */}
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
