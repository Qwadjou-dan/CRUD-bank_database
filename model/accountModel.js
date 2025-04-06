//imports
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;
const AccountSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  bankId: {
    type: Schema.Types.ObjectId, //To be able to access every data under the id
    ref: "Bank", //collection name used in the bankModel
    required: true,
  },
});

//create and connect schema to model
const AccountModel = mongoose.model("Account", AccountSchema);

//export model
module.exports = AccountModel;
