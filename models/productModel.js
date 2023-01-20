import mongoose from "mongoose";

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

export default Product;
