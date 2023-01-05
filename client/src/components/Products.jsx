import React, { useEffect, useState } from "react";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div>
      <Product data={data} />
    </div>
  );
};

export default Products;
