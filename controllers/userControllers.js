import User from "../models/userModel.js";

const insertUser = (req, res) => {
  const { name, country } = req.body;

  const UserItem = new User({
    name,
    country,
  });

  UserItem.save()
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

const getUsers = async (req, res) => {
  try {
    const data = await User.find();

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

const getUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
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

const deleteUserById = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
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

const updateUserById = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: req.body });
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

export { insertUser, getUsers, getUserById, deleteUserById, updateUserById };
