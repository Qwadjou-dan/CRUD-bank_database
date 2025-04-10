//imports
const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

//controllers
const signUpController = (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt
      .hash(password, 1)
      .then((hashPassword) => {
        const user = UserModel({
          name,
          email,
          password: hashPassword,
        });
        user
          .save()
          .then((user) => {
            res.status(201).json({ message: "User created", data: user });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const signInController = (req, res) => {
  const { email, password } = req.body;
  //locating the email
  UserModel.findOne({ email })
    .then((user) => {
      //compare the passwords
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              res.status(201).json({ message: "User signed in" });
            } else {
              res.json({ message: "email or password invalid" });
            }
          })
          .catch((err) => console.log(err));
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => console.log(err));
};

//export
module.exports = { signUpController, signInController };
