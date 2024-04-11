import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    setWordsArray(state, action) {
      state.wordsArray = action.payload;
      state.currentWord = state.wordsArray[0];
    },
    incrementActiveIndex(state) {
      state.currentIndexTyping++;
      state.currentWord = state.wordsArray[state.currentIndexTyping];
      state.correctlyTypedTillIndex++;
      state.correctTypedIndex = -1;
      state.wrongTypedIndex = -1;
    },
    changeCurrentIndexInWord(state) {
      state.currentIndexInWord = state.currentTyped.length - 1;
    },
    setWrongIndex(state, action) {
      state.wrongTypedIndex = action.payload;
    },
    setCorrectTypedIndex(state, action) {
      state.correctTypedIndex = action.payload;
    },
  },
});

export const {
  setWordsArray,
  incrementActiveIndex,
  changeCurrentIndexInWord,
  setWrongIndex,
  setCorrectTypedIndex,
} = testSlice.actions;
export default testSlice.reducer;
