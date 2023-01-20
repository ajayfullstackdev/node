import Product from "../models/productModel.js";
import { cleanUp } from "../utils/cleanUp.js";

const insertProduct = (req, res) => {
  const { title, price, category } = req.body;

  const productItem = new Product({
    title,
    price,
    category,
  });

  productItem
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        status: "success",
        message: "successfully added",
      });
    })
    .catch((err) => {
      console.log(err, "Error");
    });
};

const getProducts = async (req, res) => {
  try {
    const query = cleanUp(req.query);

    console.log(query);

    const data = await Product.find(query);

    res.json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Find by id

const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export { insertProduct, getProducts, getProductById };
