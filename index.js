//imports
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const bankRoute = require("./routes/BankRoute");
const accountRoute = require("./routes/AccountRoute");
const userRoute = require("./routes/UserRoute");
require("dotenv").config();

//initialize
const server = express();

//middleware
server.use(bodyParser.json());

//routes
server.use(bankRoute);
server.use(accountRoute);
server.use(userRoute);

//start server
mongoose.connect(process.env.MONGO_DB).then((result) => {
  server.listen(5050, "localhost", () => {
    console.log("Server is running on port 5050");
  });
});
