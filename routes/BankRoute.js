//imports
const express = require("express");
const { body } = require("express-validator");
const {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
} = require("../controller/BankController");
const BankModel = require("../model/BankModel");

const router = express.Router();

router.post(
  "/bank",
  [
    body("name").notEmpty().trim().withMessage("Name field empty"),
    body("phone")
      .isMobilePhone("en-GH")
      .withMessage("number invalid")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankPhoneNumber) => {
          if (bankPhoneNumber) {
            return Promise.reject("phone number in use");
          }
        });
      }),
  ],
  createBankDetails
); //what goes inside the body is the particular field you want to validate
router.get("/bank/:id?", retrieveBankDetails);
router.put("/bank/:id", updateBankDetails);
router.delete("/bank/:id", deleteBankDetails);

module.exports = router;
