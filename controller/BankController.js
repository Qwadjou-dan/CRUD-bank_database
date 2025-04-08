const BankModel = require("../model/BankModel");
const { validationResult } = require("express-validator");

const createBankDetails = (req, res) => {
  try {
    //validation check
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      res.json({ message: error.array()[0].msg });
    }
    //get the data from the request body
    const { name, location, address, phone, accountNumber } = req.body;
    //create and push data to the model
    const bank = BankModel({
      name,
      location,
      address,
      phone,
      accountNumber,
    });
    //save data in the model and give a response
    bank
      .save()
      .then((bank) => {
        res
          .status(201)
          .json({ message: "Bank created successfully", data: bank });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const retrieveBankDetails = (req, res) => {
  //retrieve only one data using the id
  let { id } = req.params;

  if (id) {
    BankModel.findById(id)
      .then((bank) => {
        res.status(201).json(bank);
      })
      .catch((err) => console.log(err));
  } else {
    //retrieve every data
    BankModel.find()
      .then((bank) => {
        res.status(201).json(bank);
      })
      .catch((err) => console.log(err));
  }
};

const updateBankDetails = (req, res) => {
  const { id, name, location, address, phone, accountNumber } = req.body;

  BankModel.findById(id)
    .then((bank) => {
      if (bank) {
        bank.name = name;
        bank.location = location;
        bank.address = address;
        bank.phone = phone;
        bank.accountNumber = accountNumber;
        bank
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(500).json({ message: "error" });
      }
    })
    .catch((err) => console.log(err));
};

const deleteBankDetails = async (req, res) => {
  const deleteId = await BankModel.findByIdAndDelete(req.params.id);
  if (deleteId) {
    await deleteId.deleteOne();
    res.status(201).json("Bank Deleted");
  } else {
    res.status(500).json("Bank not found");
  }
};

module.exports = {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
};
