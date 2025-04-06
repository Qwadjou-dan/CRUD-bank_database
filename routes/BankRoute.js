//imports
const express = require("express");
const {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
} = require("../controller/BankController");

const router = express.Router();

router.post("/bank", createBankDetails);
router.get("/bank/:id?", retrieveBankDetails);
router.put("/bank/:id", updateBankDetails);
router.delete("/bank/:id", deleteBankDetails);

module.exports = router;
