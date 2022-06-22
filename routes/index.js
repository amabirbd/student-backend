const express = require("express");

const router = express.Router();

const StudentRoute = require("./student.route");

router.use("/students", StudentRoute);

module.exports = router;
