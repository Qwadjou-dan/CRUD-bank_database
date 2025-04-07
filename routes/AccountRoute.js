const express = require("express");
const {
  createAccountDetails,
  retrieveAccountDetails,
  updateAccountDetails,
  deleteAccountDetails,
} = require("../controller/AccountController");

const router = express.Router();

router.post("/account", createAccountDetails);
router.get("/account", retrieveAccountDetails);
router.put("/account/:id", updateAccountDetails);
router.delete("/account/:id", deleteAccountDetails);

module.exports = router;
