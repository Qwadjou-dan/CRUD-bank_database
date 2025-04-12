const express = require("express");
const {
  createAccountDetails,
  retrieveAccountDetails,
  updateAccountDetails,
  deleteAccountDetails,
  validateAccountDetails,
} = require("../controller/AccountController");

const router = express.Router();

router.post("/account", validateAccountDetails, createAccountDetails);
router.get("/account", retrieveAccountDetails);
router.put("/account/:id", updateAccountDetails);
router.delete("/account/:id", deleteAccountDetails);

module.exports = router;
