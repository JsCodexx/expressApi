const employee = require("express").Router();
const { Employee } = require("../model");
const { User } = require("../model");
const bcrypt = require("bcrypt");
SignupEmployee = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, age, cnic, password } =
    req.body;
  const newEmployee = new Employee({
    firstName,
    lastName,
    mobileNumber,
    email,
    age,
    cnic,
  });

  try {
    const employeeExist = await Employee.findOne({ cnic });
    if (employeeExist) {
      return res.status(422).send("CNIC already exists");
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const response = await newEmployee.save();
    if (response) {
      const newUser = new User({
        employeeId: response._id,
        designation: [],
        password: hash,
      });
      const userResponse = await newUser.save();
      if (userResponse) {
        return res.json({ response });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Employee saved:", response);
    res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { SignupEmployee };
