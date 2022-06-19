const express = require("express");
const router = express.Router();

const {
  getStudentValidation,
  addStudentValidation,
  updateStudentValidation,
  deleteStudentValidation,
} = require("../validations/student.validation");

const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("./../controllers/student.controller");

router.get("/", getStudents);
router.post("/", addStudentValidation, addStudent);
router.get("/:_id", getStudentValidation, getStudent);
router.put("/:_id", updateStudentValidation, updateStudent);
router.delete("/:_id", deleteStudentValidation, deleteStudent);

module.exports = router;
