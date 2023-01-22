import Product from "../models/productModel.js";
// import AdvancedFiltering from "../utils/advancedFiltering.js";
import AdvancedFiltering from "../utils/advancedFilteringFunction.js";

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
    console.log(req.query);

    const queryStringFinal = new AdvancedFiltering(req.query, Product.find())
      .find()
      .sort()
      .pagination()
      .limitFields();

    const data = await queryStringFinal.queryString;

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
