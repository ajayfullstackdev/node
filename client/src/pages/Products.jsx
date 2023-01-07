import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
  const { categoryid } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/product/api/productsInfo?categoryid=${categoryid}`
      )
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (productid) => {
    Navigate(`/products/category/${categoryid}/product/${productid}`);
  };

  return (
    <div>
      <div className="row">
        {data.map((ele) => (
          <div
            key={ele.id}
            className="col"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(ele.id)}
          >
            <img
              src={ele.images[0]}
              alt="img"
              height={"120px"}
              width={"120px"}
            />
            <p>{ele.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
