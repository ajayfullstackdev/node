import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/category/api/categoryInfo")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (id) => {
    Navigate(`/products/category/${id}`);
  };

  return (
    <div>
      <h4 className="text-center">Categories to Shop</h4>

      <div className="row">
        {data.map((ele) => (
          <div
            key={ele.id}
            className="col"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(ele.id)}
          >
            <img src={ele.image} alt="img" height={"120px"} width={"120px"} />
            <p>{ele.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
