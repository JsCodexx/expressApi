const {
  Login,
  SignupEmployee,
  AddUser,
  updatePassword,
} = require("../handlers");
const { isAdmin } = require("../middleware");

const router = require("express").Router();

router.post("/login", Login);
router.post("/signup_employee", isAdmin, SignupEmployee);
router.patch("/update_password", updatePassword);

module.exports = {
  user: router,
};
