const express = require("express");
const {
  signUpController,
  signInController,
} = require("../controller/UserController");

const router = express.Router();

router.post("/users", signUpController);
router.post("/signin", signInController);

module.exports = router;
