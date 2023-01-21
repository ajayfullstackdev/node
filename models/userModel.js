import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is mandatory"],
    unique: [true, "Should be unique"], // Not seem to be working, existing bug
  },

  country: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
