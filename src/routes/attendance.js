const { EmployeeAttendance } = require("../handlers");
const {
  authenticateAndCheckIn,
  attendanceMiddleware,
  isAdmin,
} = require("../middleware");

const router = require("express").Router();

const handler = new EmployeeAttendance();

router.post(
  "/checkInOut",
  authenticateAndCheckIn,
  attendanceMiddleware,
  handler.checkInCheckOut
);
router.get("/find", handler.searchAttendance);
router.get("/attendances", isAdmin, handler.getAttendances);

module.exports = {
  attendance: router,
};
