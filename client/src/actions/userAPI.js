import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000/" });

export async function signupAPI(formData) {
  try {
    const data = await instance.post("/user/signup", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signinAPI(formData) {
  try {
    const data = await instance.post("user/signin", formData);
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDataAPI(token) {
  try {
    const data = await instance.post("user/getuserdata", { token: token });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTestsStartedAPI(token) {
  try {
    const data = await instance.post("user/updateTestStarted", {
      token: token,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTestCompletedAPI(token, time, words, wpm) {
  try {
    const data = await instance.post("user/updateTestCompleted", {
      token: token,
      time: time,
      words: words,
      wpm: wpm,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}
