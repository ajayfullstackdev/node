import Product from "../models/productModel.js";
// import AdvancedFiltering from "../utils/advancedFiltering.js";
import AdvancedFiltering from "../utils/advancedFilteringFunction.js";

const insertProduct = async (req, res) => {
  const productItem = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    message: "successfully added",
    data: productItem,
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

const updateProduct = async (req, res) => {
  const updatedItem = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "successfully updated",
    data: updatedItem,
  });
};

const updateProductDetails = async (req, res) => {
  // const updatedItems = await Product.findOneAndUpdate(req.query, req.body, {
  //   new: true,
  // });

  const updatedItems = await Product.updateMany(req.query, req.body);

  res.status(201).json({
    status: "success",
    message: "successfully updated",
    data: updatedItems,
  });
};

const deleteProduct = async (req, res) => {
  try {
    const productDeleted = await Product.deleteMany(req.query);

    res.status(200).json({
      status: "success",
      message: "successfully deleted",
      data: productDeleted,
    });
  } catch (err) {
    next(err);
  }
};

export {
  insertProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductDetails,
  deleteProduct,
};
