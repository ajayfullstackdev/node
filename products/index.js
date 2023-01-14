import express from "express";
import cors from "cors";

import productRoute from "./routes/productRoute.js";

const app = express();

app.use(cors()); // Dealing with CORS error from our browser
app.use(express.json()); // Body parsing

app.use("/product", productRoute);

app.listen(4000, () => {
  console.log("Server running.....at 4k");
});
