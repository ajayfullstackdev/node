import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const { productid } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/product/api/productsInfo?productid=${productid}`
      )
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="row">
        {data?.map((ele) => (
          <div
            key={ele.id}
            className="mx-auto text-center"
            style={{ cursor: "pointer", border: "1px solid black" }}
            onClick={() => handleClick(ele.id)}
          >
            <h4>{ele.title}</h4>

            {ele.images.map((ele) => (
              <img
                src={ele}
                alt="img"
                height={"120px"}
                width={"120px"}
                key={ele}
              />
            ))}

            <p>{ele.description}</p>

            <strong>{`${ele.price} USD`}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
