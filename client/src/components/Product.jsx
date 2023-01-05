import React from "react";
import { Link } from "react-router-dom";

const Product = ({ data }) => {
  return (
    <div className="row mx-auto">
      {data.map((ele) => (
        <div className="card col-4 mx-auto" style={{ width: "18rem" }}>
          <img
            src={ele.image}
            className="card-img-top"
            alt="..."
            height={"120px"}
            width={"240px"}
          />
          <div className="card-body">
            <h5 className="card-title">{ele.title}</h5>
            <p className="card-text">
              {ele.category} {ele.price}
            </p>
            <Link to={`/productdetails/${ele.id}`} className="btn btn-primary">
              check details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
