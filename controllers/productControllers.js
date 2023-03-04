import Product from "../models/productModel.js";
// import AdvancedFiltering from "../utils/advancedFiltering.js";
import AdvancedFiltering from "../utils/advancedFilteringFunction.js";
import catchErrorAsync from "../utils/catchErrorAsync.js";
import ApiErrorModel from "../utils/apiErrorModel.js";

const insertProduct = catchErrorAsync(async (req, res) => {
  const productItem = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    message: "successfully added",
    data: productItem,
  });
});

const getProducts = catchErrorAsync(async (req, res) => {
  console.log(req.query);

  const queryStringFinal = new AdvancedFiltering(req.query, Product.find())
    .find()
    .sort()
    .pagination()
    .limitFields();

  const data = await queryStringFinal.queryString;

  const totalCount = await Product.find().count();

  res.json({
    status: "success",
    length: data.length,
    totalCount,
    data,
  });
});

// Find by id

const getProductById = catchErrorAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id);

  if (!data) {
    return next(new ApiErrorModel("No Product available", 404));
  }

  res.json({
    status: "success",
    data,
  });
});

const updateProduct = catchErrorAsync(async (req, res) => {
  const updatedItem = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "successfully updated",
    data: updatedItem,
  });
});

const updateProductDetails = catchErrorAsync(async (req, res) => {
  // const updatedItems = await Product.findOneAndUpdate(req.query, req.body, {
  //   new: true,
  // });

  const updatedItems = await Product.updateMany(req.query, req.body);

  res.status(201).json({
    status: "success",
    message: "successfully updated",
    data: updatedItems,
  });
});

const deleteProduct = catchErrorAsync(async (req, res) => {
  const productDeleted = await Product.deleteMany(req.query);

  res.status(200).json({
    status: "success",
    message: "successfully deleted",
    data: productDeleted,
  });
});

const aggregateProducts = catchErrorAsync(async (req, res) => {
  const data = await Product.aggregate([
    {
      $match: {
        price: { $lte: 100 },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" },
      },
    },
    {
      $addFields: {
        category: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        avgPrice: -1,
      },
    },
    {
      $match: {
        category: { $nin: ["men's clothing", "jewelery"] },
      },
    },
  ]);

  res.json({
    status: "success",
    data,
  });
});

const productAdmin = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Admin related data",
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  insertProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductDetails,
  deleteProduct,
  aggregateProducts,
  productAdmin,
};
