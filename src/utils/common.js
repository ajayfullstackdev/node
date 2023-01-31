import axios from "axios";

const getAllData = () => {
  axios
    .get("http://localhost:4000/api/products")
    .then((res) => {
      const data = res.data.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

console.log(getAllData());
