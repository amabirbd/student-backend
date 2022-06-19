require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const xssClean = require("xss-clean");
const cors = require("cors");

const routes = require("./routes");

const app = express();

require("./config/mongoose"); // connect mongoose

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

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

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
//   res.json({
//     message: err.message,
//     error: err,
//   });
// });

module.exports = app;
