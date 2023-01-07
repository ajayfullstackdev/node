import { readFile } from "../filesystem/readFile.js";

import { URL } from "url";

const storagePath = new URL("../data/products.json", import.meta.url);

const productsInfo = async (req, res) => {
  try {
    const { categoryid, productid } = req.query;
    const productsData = await readFile(storagePath);
    let productsFinal = productsData ? JSON.parse(productsData) : [];

    if (categoryid) {
      productsFinal = productsFinal.filter(
        (ele) => ele.category.id == categoryid
      );
    }

    if (productid) {
      productsFinal = [productsFinal.find((ele) => ele.id == productid)];
    }

    res.json({
      status: "success",
      length: productsFinal.length,
      data: productsFinal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong !",
    });
  }
};

export { productsInfo };
