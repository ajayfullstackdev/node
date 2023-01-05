import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8000/products?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="row mx-auto">
        <div className="col-4 mx-auto">
          <img src={data.image} className="card-img-top" alt="..." />
        </div>

        <div className="col-8 mx-auto">
          <h5 className="">{data.title}</h5>
          <p className="">
            {`
          ${data.description} ${data.category} ${data.price} $
          
          `}
          </p>
          <a href="#" className="btn btn-primary">
            Buy Now
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
