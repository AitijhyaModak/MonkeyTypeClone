import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL);
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  } catch (error) {
    console.log(error);
  }
}

connectToDb();
