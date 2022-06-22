const httpStatus = require("http-status");
const { StudentModel } = require("../models/student.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const bcrypt = require("bcrypt");

// Get Students
const getStudents = catchAsync(async (req, res) => {
  const students = await StudentModel.find({}, { name: true, email: true });
  return apiResponse(res, httpStatus.OK, {
    data: students,
  });
});

//Get student
const getStudent = catchAsync(async (req, res) => {
  const student = await StudentModel.findOne(
    { _id: req.params._id },
    { name: true, email: true }
  );
  return apiResponse(res, httpStatus.OK, { data: student });
});

// Add Student
const addStudent = catchAsync(async (req, res) => {
  const { name, address, email, password } = req.body;

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

  const newStudent = new StudentModel({
    name,
    address,
    email,
    password: hashedPassword,
  });
  await newStudent.save();

  return apiResponse(res, httpStatus.CREATED, {
    data: newStudent,
    message: "student added",
  });
});

// Update Student
const updateStudent = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const update = await StudentModel.updateOne(
    { _id: req.params._id },
    { name, address, email }
  );

  return apiResponse(
    res,
    httpStatus.ACCEPTED,
    { message: "student information updated" },
    update
  );
});

// Delete Student
const deleteStudent = catchAsync(async (req, res) => {
  const drop = await StudentModel.deleteOne({ _id: req.params._id });
  return apiResponse(
    res,
    httpStatus.ACCEPTED,
    { message: "student deleted" },
    drop
  );
});

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
