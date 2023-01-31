import "./config.js";

import express from "express";
import mongoose from "mongoose";
import router from "./routes/productRoutes.js";
import globalErrorHandling from "./controllers/errorController.js";
import cors from "cors";

mongoose.set("strictQuery", false);

const DBConnectionString = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(DBConnectionString)
  .then(() => console.log("Connected to Database !"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   console.log("Middleware 1");

//   next();
// });

// app.use((req, res, next) => {
//   console.log("Middleware 2");
// });

app.use("/api", router);
app.use(globalErrorHandling);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
