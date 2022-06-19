const express = require("express");

const router = express.Router();

const StudentRoute = require("./student.route");

router.use("/student", StudentRoute);

module.exports = router;
