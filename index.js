import express from "express";
import mongoose from "mongoose";
import globalErrorHandling from "./controllers/errorController.js";
import router from "./routes/productRoutes.js";

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://ajay:YYQgYu4X4beKs2HA@cluster0.2kqjkdb.mongodb.net/mongo_learn?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Database !"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Middleware 1");

//   next();
// });

// app.use((req, res, next) => {
//   console.log("Middleware 2");
// });

app.use("/api", router);
app.use(globalErrorHandling);

app.listen(4000, () => {
  console.log("Server running at 4k");
});
