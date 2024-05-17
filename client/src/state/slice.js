import { createSlice } from "@reduxjs/toolkit";
import { words } from "../words/wordlist";

function helper(words) {
  const shuffled = words.sort(() => 0.5 - Math.random());
  const wordsArray = shuffled.slice(0, 50);
  return wordsArray;
}

const testSlice = createSlice({
  name: "test",
  initialState: {
    typed: "",
    wordsArray: [],
    currentIndexTyping: 0,
    correctlyTypedTillIndex: -1,
    wrongTypedIndex: -1,
    correctTypedIndex: -1,
    currentWord: "",
    mistakes: 0,
    wordsTyped: 0,
    characters: 0,
  },
  reducers: {
    setTest(state) {
      if (state.wordsArray.length) return;
      helper(words);
      state.wordsArray = helper(words);
      state.currentWord = state.wordsArray[0];
    },
    incrementActiveIndex(state) {
      state.currentIndexTyping++;
      state.currentWord = state.wordsArray[state.currentIndexTyping];
      state.correctlyTypedTillIndex++;
      state.correctTypedIndex = -1;
      state.wrongTypedIndex = -1;
      state.wordsTyped++;
    },
    changeCurrentIndexInWord(state) {
      state.currentIndexInWord = state.currentTyped.length - 1;
    },
    setWrongIndex(state, action) {
      state.wrongTypedIndex = action.payload;
      state.mistakes++;
    },
    setCorrectTypedIndex(state, action) {
      state.correctTypedIndex = action.payload;
      state.characters++;
    },
    resetState(state) {
      state.typed = "";
      state.wordsArray = [];
      state.currentIndexTyping = 0;
      state.correctlyTypedTillIndex = -1;
      state.wrongTypedIndex = -1;
      state.correctTypedIndex = -1;
      state.currentWord = "";
      state.mistakes = 0;
      state.wordsTyped = 0;
      state.characters = 0;
    },
    resetStateButNotWords(state) {
      state.typed = "";
      state.currentIndexTyping = 0;
      state.correctlyTypedTillIndex = -1;
      state.wrongTypedIndex = -1;
      state.correctTypedIndex = -1;
      state.mistakes = 0;
      state.wordsTyped = 0;
      state.characters = 0;
      state.currentWord = state.wordsArray[0];
    },
  },
});

export const {
  setTest,
  incrementActiveIndex,
  changeCurrentIndexInWord,
  setWrongIndex,
  setCorrectTypedIndex,
  resetState,
  resetStateButNotWords,
} = testSlice.actions;
export default testSlice.reducer;
