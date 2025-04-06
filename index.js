//imports
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const bankRoute = require("./routes/BankRoute");
const accountRoute = require("./routes/AccountRoute");

//initialize
const server = express();

//middleware
server.use(bodyParser.json());

//routes
server.use(bankRoute);
server.use(accountRoute);

//start server
mongoose
  .connect(
    "mongodb+srv://DanDb:D7QVMoIApVYnjCQB@cluster0.8kbvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    server.listen(5050, "localhost", () => {
      console.log("Server is running on port 5050");
    });
  });
