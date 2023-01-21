import express from "express";
import mongoose from "mongoose";

import router from "./routes/userRoutes.js";

mongoose
  .connect(
    "mongodb+srv://ajay:YYQgYu4X4beKs2HA@cluster0.2kqjkdb.mongodb.net/mongo_learn?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(4000, () => {
  console.log("server running at 4k");
});
