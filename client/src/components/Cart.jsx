import React, { useState, useEffect } from "react";
import axios from "axios";
import CartFilter from "./CartFilter";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [isdeleted, setDeleted] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/airlines`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isdeleted]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/airlines?country=${country}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country]);

  const handleCountry = (country) => {
    setCountry(country);
  };

  const handleDelte = (id) => {
    axios
      .delete(`http://localhost:4000/api/airlines/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeleted(!isdeleted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditHandler = (id) => {
    Navigate(`/single/${id}`);
  };

  return (
    <>
      <CartFilter handleCountry={handleCountry} />
      <div className="row">
        {data.map((ele) => (
          <div key={ele._id} className="crt col-2">
            <strong>{ele.name}</strong>
            <p>{ele.country}</p>
            <p>{ele.slogan}</p>
            <i
              className="bi bi-pen-fill text-primary"
              onClick={() => EditHandler(ele._id)}
            ></i>
            <i
              className="bi bi-trash text-primary ms-3"
              onClick={() => handleDelte(ele._id)}
            ></i>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
