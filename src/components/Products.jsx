import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products?limit=2&page=${pageNo}`)
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalCount / 2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  const handlePagination = (i) => {
    setPageNo(i);
  };

  return (
    <>
      <div className="container">
        <Product data={data} />
      </div>
      <div className="ms-5 mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {[...new Array(totalPages)]?.map((ele, i) => (
              <li className="page-item" key={i}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePagination(i)}
                >
                  {++i}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Products;
