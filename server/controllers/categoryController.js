import { readFile } from "../filesystem/readFile.js";

import { URL } from "url";

const storagePath = new URL("../data/category.json", import.meta.url);

const categoryInfo = async (req, res) => {
  try {
    const categoryData = await readFile(storagePath);
    const categoryFinal = categoryData ? JSON.parse(categoryData) : [];

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
