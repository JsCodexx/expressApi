const router = require("express").Router();
const { user } = require("./user");
const { attendance } = require("./attendance");
const {employeeManagement} = require("./employeeManagement");
router.use("/", user);
router.use("/", attendance);
router.use("/employee", employeeManagement);
module.exports = { router };
