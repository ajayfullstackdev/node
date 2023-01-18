import express from "express";

import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ajay:jNeJqJtZRkE4QYBV@cluster0.2kqjkdb.mongodb.net/mongo_learn?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Database !"))
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is mandatory"],
    unique: [true, "Should be unique"], // Not seem to be working, existing bug
  },

  price: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema, "products");

const app = express();

app.use(express.json());

app.post("/product", (req, res) => {
  const { title, price, category } = req.body;

  const product = new Product({
    title,
    price,
    category,
  });

  product
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err, "Error");
    });
});

app.listen(4000, () => {
  console.log("Server running at 4k");
});
