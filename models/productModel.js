import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is mandatory"],
    },

    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    comfortLevel: {
      type: String,
      enum: {
        values: ["cheap", "managable", "luxury"],
        message: "Not the right comfort level value",
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre("save", function (next) {
  this.comfortLevel =
    this.price > 100000 ? "luxury" : this.price > 10000 ? "managable" : "cheap";

  next();
});

productSchema.post("save", function (doc, next) {
  console.log(doc, "Created");

  next();
});

// productSchema.pre(/^find/, function (next) {
//   this.find({ isActive: true });

//   next();
// });

productSchema.virtual("discountPercentage").get(function () {
  return this.price < 10000 ? "50%" : "20%";
});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
