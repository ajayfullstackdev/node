import React from "react";

const CartFilter = ({ handleCountry }) => {
  const handleCountryClick = (e) => {
    handleCountry(e.target.value);
  };

  return (
    <div className="p-3">
      <label className="me-2">filter by country </label>
      <select onClick={handleCountryClick}>
        <option value={""}>Choose Country</option>

        <option value={"Sri Lanka"}>Sri Lanka</option>
        <option value={"India"}>India</option>
        <option value={"Dubai"}>Dubai</option>
        <option value={"Quatar"}>Quatar</option>
      </select>
    </div>
  );
};

export default CartFilter;
