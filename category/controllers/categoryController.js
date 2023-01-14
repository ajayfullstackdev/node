import { readFile } from "../filesystem/readFile.js";
import fetch from "node-fetch";

import { URL } from "url";

const storagePath = new URL("../data/category.json", import.meta.url);

const categoryInfo = async (req, res) => {
  try {
    let { categoryid } = req.query;

    const categoryData = await readFile(storagePath);
    let categoryFinal = categoryData ? JSON.parse(categoryData) : [];

    console.log(categoryid);

    if (categoryid) {
      let res = await fetch("http://localhost:4000/product/api/productsInfo");
      let result = await res.json();

      categoryFinal = result.data.filter(
        (ele) => ele.category.id == categoryid
      );
    }

    res.json({
      status: "success",
      length: categoryFinal.length,
      data: categoryFinal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong !",
    });
  }
};

export { categoryInfo };
