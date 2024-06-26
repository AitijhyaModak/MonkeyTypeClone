import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//sigup in done
//sign in done
//get user data done
const saltRounds = 10;

const router = express.Router();

async function authMiddleware(req, res, next) {
  const token = req.body.token;

  if (!token) res.status(400).json({ message: "unauthorized" });

  try {
    const decoded = jwt.verify(token, "secret");
    if (decoded) {
      req.body.decoded = decoded;
      next();
    } else res.status(400).json({ message: "unauthorized" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/getuserdata", authMiddleware, getUserData);
router.post("/updateTestStarted", authMiddleware, updateTestsStarted);
router.post("/updateTestCompleted", authMiddleware, updateTestCompleted);
router.post("/leaderboard", getLeaderBoardData);

async function getLeaderBoardData(req, res) {
  try {
    const dataArray = await User.find({}, "username wpm -_id")
      .sort({ wpm: -1 })
      .limit(10);
    res.status(200).json({ dataArray: dataArray });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error occured" });
  }
}

async function signup(req, res) {
  const { email, password, username } = req.body;

  try {
    const checkUser = await User.findOne({ email: email });

    if (checkUser != undefined) throw new Error("User already exists");

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      await User.create({ email: email, password: hash, username: username });
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const data = await User.findOne({ email: email });

    if (!data) throw new Error("User does not exists");

    const jwtData = jwt.sign(
      {
        data: data,
      },
      "secret"
    );

    const result = await bcrypt.compare(password, data.password);

    if (result) res.status(200).json({ data: jwtData });
    else throw new Error("Incorrect password");

    //
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
}

async function getUserData(req, res) {
  const decoded = req.body.decoded;

  try {
    const userRecord = await User.findOne({ email: decoded.data.email });
    res.status(200).json({ userData: userRecord });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTestsStarted(req, res) {
  const decoded = req.body.decoded;

  try {
    const userData = await User.findOne({ email: decoded.data.email });
    await User.findOneAndUpdate(
      { email: userData.email },
      { testsStarted: userData.testsStarted + 1 }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failure" });
  }
}

async function updateTestCompleted(req, res) {
  const decoded = req.body.decoded;
  const body = req.body;
  body.wpm15 = 0;
  body.wpm30 = 0;
  body.wpm60 = 0;

  if (body.time == 15) body.wpm15 = body.wpm;
  if (body.time == 30) body.wpm30 = body.wpm;
  if (body.time == 60) body.wpm60 = body.wpm;

  try {
    const user = await User.findOne({ email: decoded.data.email });

    await User.findOneAndUpdate(
      { email: user.email },
      {
        wordsTyped: user.wordsTyped + body.words,
        timeTyping: user.timeTyping + body.time,
        testsCompleted: user.testsCompleted + 1,
        highestWPM_15: Math.max(user.highestWPM_15, body.wpm15),
        highestWPM_30: Math.max(user.highestWPM_30, body.wpm30),
        highestWPM_60: Math.max(user.highestWPM_60, body.wpm60),
        wpm: Math.ceil(
          (user.wpm * user.testsCompleted + body.wpm) /
            (user.testsCompleted + 1)
        ),
      }
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failure" });
  }
}

export default router;
