const BankModel = require("../model/BankModel");

const createBankDetails = (req, res) => {
  try {
    const { name, location, address, phone, accountNumber } = req.body;

    const bank = BankModel({
      name,
      location,
      address,
      phone,
      accountNumber,
    });

    bank
      .save()
      .then(() => {
        res.status(201).json(bank);
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
