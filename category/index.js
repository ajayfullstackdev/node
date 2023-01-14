import express from "express";
import cors from "cors";

import categoryRoute from "./routes/categoryRoute.js";

const app = express();

app.use(cors()); // Dealing with CORS error from our browser
app.use(express.json()); // Body parsing

app.use("/category", categoryRoute);

app.listen(5000, () => {
  console.log("Server running.....at 5k");
});
