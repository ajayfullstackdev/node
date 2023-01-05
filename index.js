import express from "express";

import { readFile } from "./fileaccess.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to express!");
});

app.get("/products", async (req, res) => {
  try {
    const productInfo = JSON.parse(await readFile("./data/products.json"));

    res.json({
      status: "success",

      length: productInfo.length,

      data: productInfo,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",

      message: "Something went wrong!",
    });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const productInfo = JSON.parse(await readFile("./data/products.json"));

    const singleProduct = productInfo.find((ele) => ele.id == id);

    res.json({
      status: "success",

      data: singleProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",

      message: "Something went wrong!",
    });
  }
});

app.get("/products/:limit/:page", async (req, res) => {
  try {
    let { limit, page } = req.params;

    limit = Number(limit);
    page = Number(page);

    const productInfo = JSON.parse(await readFile("./data/products.json"));

    const startIndex = limit * (page - 1);

    const finalProduct = productInfo.slice(startIndex, startIndex + limit);

    res.json({
      status: "success",

      length: finalProduct.length,

      data: finalProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",

      message: "Something went wrong!",
    });
  }
});

app.get("/filterbyprice/:filterbyprice", async (req, res) => {
  try {
    let filterbyprice = req.params.filterbyprice;
    filterbyprice = Number(filterbyprice);

    let productInfo = JSON.parse(await readFile("./data/products.json"));

    productInfo = productInfo.filter((ele) => ele.price > filterbyprice);

    res.json({
      status: "success",

      length: productInfo.length,

      data: productInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",

      message: "Something went wrong!",
    });
  }
});

app.listen("4000", () => {
  console.log("server running.....");
});
