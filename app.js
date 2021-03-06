if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const xssClean = require("xss-clean");
const cors = require("cors");
const passport = require("passport");

const routes = require("./routes");

const app = express();

require("./config/mongoose"); // connect mongoose

// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));

app.use(logger("dev"));
app.use(express.json());
app.use(xssClean());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes); // routes

module.exports = app;
