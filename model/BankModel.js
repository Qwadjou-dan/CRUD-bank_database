//imports
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;
const BankSchema = Schema({
  name: {
    type: String, //type of data
    required: true, //data must be filled
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    // required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  account: [
    //square bracket is used bcos nultiple data will be displayed
    {
      accountId: {
        type: Schema.Types.ObjectId, //To be able to access every data under the id
        ref: "Account", //collection name used in the aacountModel
      },
    },
  ],
});

//create and connect schema to model
const BankModel = mongoose.model("Bank", BankSchema);

//export model
module.exports = BankModel;
