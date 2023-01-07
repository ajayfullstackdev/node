import express from "express";
import morgan from "morgan";

const app = express();

// middleware

app.use(express.static("./public")); // index (default "/")

app.use(morgan("dev")); // meant for logging

let numOfRequests = 0;

app.use((req, res, next) => {
  numOfRequests += 1;
  next();
});

app.get("/noofrequests", (req, res) => {
  res.json({
    status: "success",
    numOfRequests,
  });
});

app.listen(8000, () => {
  console.log("Server running at...8k");
});
