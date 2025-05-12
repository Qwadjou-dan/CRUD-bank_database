//imports
const express = require("express");
const { body } = require("express-validator");
const {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
  validateBankDetails,
} = require("../controller/BankController");
const BankModel = require("../model/BankModel");
const Authorization = require("../controller/Auth");

const router = express.Router();

router.post("/bank", Authorization, validateBankDetails, createBankDetails); //what goes inside the body is the particular field you want to validate
router.get("/bank/:id?", retrieveBankDetails);
router.put("/bank/:id", updateBankDetails);
router.delete("/bank/:id", deleteBankDetails);

module.exports = router;
