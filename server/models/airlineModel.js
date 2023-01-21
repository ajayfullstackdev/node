import mongoose from "mongoose";

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is mandatory"],
    unique: [true, "Should be unique"], // Not seem to be working, existing bug
  },

  country: {
    type: String,
  },

  slogan: {
    type: String,
  },
});

const Airline = mongoose.model("Airline", airlineSchema, "airlines");

export default Airline;
