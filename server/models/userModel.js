import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  highestWPM_15: {
    type: Number,
    default: 0,
  },
  highestWPM_30: {
    type: Number,
    default: 0,
  },
  highestWPM_60: {
    type: Number,
    default: 0,
  },
  wordsTyped: {
    type: Number,
    default: 0,
  },
  testsStarted: {
    type: Number,
    default: 0,
  },
  testsCompleted: {
    type: Number,
    default: 0,
  },
  timeTyping: {
    type: Number,
    default: 0,
  },
  wpm: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
