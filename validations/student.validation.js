const Joi = require("joi");
const { validate } = require("../utils/validate");

const getStudent = {
  params: Joi.object({
    _id: Joi.string().required(),
  }),
};

const addStudent = {
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
  }),
};

const updateStudent = {
  params: Joi.object({
    _id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

const deleteStudent = {
  params: Joi.object({
    _id: Joi.string().required(),
  }),
};

module.exports = {
  getStudentValidation: validate(getStudent),
  addStudentValidation: validate(addStudent),
  updateStudentValidation: validate(updateStudent),
  deleteStudentValidation: validate(deleteStudent),
};
