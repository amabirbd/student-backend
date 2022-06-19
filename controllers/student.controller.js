const httpStatus = require("http-status");
const { StudentModel } = require("../models/student.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const bcrypt = require("bcrypt");

const getStudents = catchAsync(async (req, res) => {
  const students = await StudentModel.find({}, { name: true, email: true });
  return apiResponse(res, httpStatus.OK, {
    data: students,
  });
});

const getStudent = catchAsync(async (req, res) => {
  const student = await StudentModel.findOne(
    { _id: req.params._id },
    { name: true, email: true }
  );
  return apiResponse(res, httpStatus.OK, { data: student });
});

const addStudent = catchAsync(async (req, res) => {
  const { name, address, email, password } = req.body;

  //   const hashedPassword = await bcrypt.hash(password, 10);

  const newStudent = new StudentModel({ name, address, email });
  await newStudent.save();

  return apiResponse(res, httpStatus.CREATED, {
    data: newStudent,
    message: "student added",
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const update = await StudentModel.updateOne(
    { _id: req.params._id },
    { name, email }
  );

  return apiResponse(
    res,
    httpStatus.ACCEPTED,
    { message: "student information updated" },
    update
  );
});

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
