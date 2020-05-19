/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const Open = () => console.log("✅ DB Connection Success");
const Errors = (error) => console.log(`🚫 Error on Database : ${error}`);

db.once("open", Open);
db.on("error", Errors);
