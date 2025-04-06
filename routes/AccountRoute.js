const express = require("express");
const {
  createAccountDetails,
  retrieveAccountDetails,
  updateAccountDetails,
} = require("../controller/AccountController");

const router = express.Router();

router.post("/account", createAccountDetails);
router.get("/account", retrieveAccountDetails);
router.put("/account", updateAccountDetails);

module.exports = router;
