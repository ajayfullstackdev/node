import React, { useEffect, useState } from "react";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/products?limit=2&page=${1}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });

    fetch(`http://localhost:8000/products`)
      .then((response) => response.json())
      .then((data) => {
        setPages(data.slice(0, data.length / 2));
      });
  }, []);

  const handleClick = (page) => {
    console.log(page);
    fetch(`http://localhost:8000/products?limit=2&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div>
      <Product data={data} />
      <nav
        aria-label="Page navigation example"
        style={{ backgroundColor: "#f5e7e6" }}
        className="p-2"
      >
        <ul className="pagination">
          {pages?.map((ele, i) => (
            <li className="page-item">
              <span
                className="page-link"
                onClick={() => handleClick(i)}
                style={{ cursor: "pointer" }}
              >
                {++i}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Products;
