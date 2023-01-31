import React from "react";

const Product = ({ data }) => {
  return (
    <>
      <div className="row text-center">
        {data.map((ele) => (
          <div key={ele._id} className={"crt col-md-2 mx-auto"}>
            <img src={ele.image} height={"120px"} width={"120px"} />
            <strong>{ele.title}</strong>
            <p>{ele.category}</p>
            <strong>{`${ele.price} $`}</strong>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
