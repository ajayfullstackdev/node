import "./config.js";

import express from "express";
import mongoose from "mongoose";
import router from "./routes/productRoutes.js";
import globalErrorHandling from "./controllers/errorController.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";

mongoose.set("strictQuery", false);

const DBConnectionString = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(DBConnectionString)
  .then(() => console.log("Connected to Database !"))
  .catch((err) => {
    console.log(err);
  });

const rateLimiter = rateLimit({
  max: 3,
  windowMs: 60000,
  message: "Too many requests being hit from the same IP address",
});

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use(cors());
// app.use(morgan("combined")); // meant for logging

app.use(
  morgan((token, req, res) => {
    return [
      `Method Name: ${token.method(req, res)}`,

      `Status Code: ${token.status(req, res)}`,

      `User name: ${req.headers.user}`,

      `Client name: ${req.headers["client-name"]}`,
    ];
  })
);

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
