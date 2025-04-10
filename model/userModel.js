//imports
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;
const UserSchema = Schema({
  name: {
    type: String, //type of data
    required: true, //data must be filled
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create and connect schema to model
const UserModel = mongoose.model("User", UserSchema);

//export model
module.exports = UserModel;
