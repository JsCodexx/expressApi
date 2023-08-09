const mongoose = require("mongoose");
const { Schema } = mongoose;

const employee = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cnic: {
    type: String,
    required: true,
  },
});
const Employee = mongoose.model("Employee", employee);

module.exports = {
  Employee,
};
