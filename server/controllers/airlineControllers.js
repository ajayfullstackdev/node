import Airline from "../models/AirlineModel.js";
import { cleanUp } from "../utils/cleanUp.js";

const insertAirline = (req, res) => {
  const { name, country, slogan } = req.body;

  const AirlineItem = new Airline({
    name,
    country,
    slogan,
  });

  AirlineItem.save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        status: "success",
        message: "successfully added",
      });
    })
    .catch((err) => {
      console.log(err, "Error");
    });
};

const getAirlines = async (req, res) => {
  try {
    const query = cleanUp(req.query);

    console.log(query);

    const data = await Airline.find(query);

    res.json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Find by id

const getAirlineById = async (req, res) => {
  try {
    const data = await Airline.findById(req.params.id);
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteAirlineById = async (req, res) => {
  try {
    await Airline.deleteOne({ _id: req.params.id });
    res.json({
      status: "success",
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateAirlineById = async (req, res) => {
  try {
    await Airline.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({
      status: "success",
      message: "successfully updated",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  insertAirline,
  getAirlines,
  getAirlineById,
  deleteAirlineById,
  updateAirlineById,
};
