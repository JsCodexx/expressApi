const { EmployeeManagement } = require("../handlers");
const { isAdmin } = require("../middleware");

const router = require("express").Router();

const user = new EmployeeManagement();

router.get("/:id", isAdmin, user.getSingleUser);
router.get("/", isAdmin, user.getAllUsers);
router.delete("/:id", isAdmin, user.deleteUser);
router.patch("/:id", isAdmin, user.blockUser);
router.patch("/un_block/:id", isAdmin, user.unBlockUser);

module.exports = {
  employeeManagement: router,
};
