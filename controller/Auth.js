//imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authorization = (req, res, next) => {
  try {
    //extract token from authorization header
    const authorizationHeader = req.get("Authorization");
    //check if the token is present
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //extracting token from header
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token format invalid" });
    }

    //verify token with secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized, token invalid" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = Authorization;
