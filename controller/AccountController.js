const AccountModel = require("../model/accountModel");

const createAccountDetails = (req, res) => {
  const { name, address, phone, accountNumber, bankId } = req.body;
  try {
    const account = AccountModel({
      name,
      address,
      phone,
      accountNumber,
      bankId,
    });
    account
      .save()
      .then((account) => {
        res.status(201).json({ message: "Account created", data: account });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const retrieveAccountDetails = (req, res) => {
  try {
    AccountModel.find()
      .populate("bankId", "name location address -_id") //this enables which data we want to display from the bank
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const updateAccountDetails = (req, res) => {
  const { name, address, phone, accountNumber } = req.body;
  const id = req.params.id;

  try {
    AccountModel.findById(id).then((account) => {
      if (account) {
        account.name = name;
        account.address = address;
        account.phone = phone;
        account.accountNumber = accountNumber;

        account
          .save()
          .then((update) => {
            res.status(200).json(update);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(404).json({ message: "error" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAccountDetails = async (req, res) => {
  const id = req.params.id;
  const deleteId = await AccountModel.findByIdAndDelete(id);
  if (deleteId) {
    await deleteId.deleteOne();
    res.status(201).json("Account Deleted");
  } else {
    res.status(404).json("Account not found");
  }
};

module.exports = {
  createAccountDetails,
  retrieveAccountDetails,
  updateAccountDetails,
  deleteAccountDetails,
};
