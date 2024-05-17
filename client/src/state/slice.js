import { createSlice } from "@reduxjs/toolkit";
import { words } from "../words/wordlist";

function helper(words, number) {
  const shuffled = words.sort(() => 0.5 - Math.random());
  const wordsArray = shuffled.slice(0, number);
  return wordsArray;
}

const testSlice = createSlice({
  name: "test",
  initialState: {
    wordsArray: [],
    memoryArrayForRepeat: [],
    currentIndexTyping: 0,
    correctlyTypedTillIndex: -1,
    wrongTypedIndex: -1,
    correctTypedIndex: -1,
    currentWord: "",
    mistakes: 0,
    wordsTyped: 0,
    characters: 0,
    time: 30,
  },
  reducers: {
    setTest(state) {
      if (state.wordsArray.length) return;
      helper(words);
      state.wordsArray = helper(words, 50);
      state.currentWord = state.wordsArray[0];
    },
    incrementActiveIndex(state) {
      state.memoryArrayForRepeat = [
        ...state.memoryArrayForRepeat,
        state.wordsArray[state.currentIndexTyping],
      ];
      state.currentIndexTyping++;
      state.currentWord = state.wordsArray[state.currentIndexTyping];
      state.correctlyTypedTillIndex++;
      state.correctTypedIndex = -1;
      state.wrongTypedIndex = -1;
      state.wordsTyped++;
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
      state.memoryArrayForRepeat = [];
    },
    resetStateButNotWords(state) {
      if (state.memoryArrayForRepeat.length > 50)
        state.wordsArray = state.memoryArrayForRepeat;
      else {
        let temporary = state.memoryArrayForRepeat;
        state.wordsArray = temporary.concat(
          state.wordsArray.slice(state.currentIndexTyping, 51)
        );
      }
      state.memoryArrayForRepeat = [];
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
    deleteAndaddWords(state) {
      state.wordsArray = state.wordsArray.slice(
        state.currentIndexTyping,
        state.wordsArray.length
      );
      let additional = helper(words, state.currentIndexTyping);
      state.wordsArray = state.wordsArray.concat(additional);
      state.currentIndexTyping = 0;
      state.currentWord = state.wordsArray[state.currentIndexTyping];
      state.correctlyTypedTillIndex = -1;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
  },
});

export const {
  setTest,
  incrementActiveIndex,
  setWrongIndex,
  setCorrectTypedIndex,
  resetState,
  resetStateButNotWords,
  deleteAndaddWords,
  setTime,
} = testSlice.actions;
export default testSlice.reducer;
