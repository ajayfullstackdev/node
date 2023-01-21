import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAirline = () => {
  const [val, setVal] = useState({
    name: "",
    country: "",
    slogan: "",
  });
  const { id } = useParams();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/airlines/${id}`).then((res) => {
      setVal(res.data.data);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/api/airlines/${id}`, val)
      .then((res) => {
        console.log(res.data);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <label>Name</label>
        <input
          type={"text"}
          name={"name"}
          onChange={handleChange}
          value={val.name}
        />

        <label>Country</label>
        <input
          type={"text"}
          name={"country"}
          onChange={handleChange}
          value={val.country}
        />

        <label>Slogan</label>
        <input
          type={"text"}
          name={"slogan"}
          onChange={handleChange}
          value={val.slogan}
        />

        <button onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EditAirline;
