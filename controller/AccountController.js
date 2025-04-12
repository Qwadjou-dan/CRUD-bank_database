const AccountModel = require("../model/accountModel");
const { body, validationResult } = require("express-validator");

//validate account details
const validateAccountDetails = [
  body("accountNumber")
    .notEmpty()
    .withMessage("Account number is required")
    .custom(async (value) => {
      try {
        const accountNumberValue = await AccountModel.findOne({
          accountNumber: value,
        });
        if (accountNumberValue) {
          throw new Error("Account number already exist");
        }
      } catch (error) {
        throw new Error(error.message || "Error validating account number");
      }
    }),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .custom(async (value) => {
      try {
        const phoneNumberValue = await AccountModel.findOne({ phone: value });
        if (phoneNumberValue) {
          throw new Error("Phone number already exist");
        }
      } catch (error) {
        throw new Error(error.message || "Error validating phone number");
      }
    })
    .custom((value) => {
      try {
        const ghanaNum = /^(\+233|0)[0-9]{9}$/;
        const nigeriaNum = /^(\+234|0)[0-9]{10}$/;
        if (!ghanaNum.test(value) && !nigeriaNum.test(value)) {
          throw new Error(
            "Phone number must be a valid Ghanaian or Nigerian number"
          );
        }
      } catch (error) {
        throw new Error(error.message || "Error validating phone number");
      }
    }),
  body("name").notEmpty().trim().withMessage("Name must not be empty"),
];

const createAccountDetails = (req, res) => {
  const { name, address, phone, accountNumber, bankId } = req.body;
  try {
    //validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const AllErrMsgs = errors.array().map((err) => err.msg);
      res.status(404).json({ message: AllErrMsgs });
    }

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
  validateAccountDetails,
};
