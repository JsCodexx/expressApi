const {
  authenticateAndCheckIn,
  attendanceMiddleware,
} = require("./attendanceMiddleware");

const {isAdmin} = require("./isAdmin");

module.exports = {
  authenticateAndCheckIn,
  attendanceMiddleware,
  isAdmin,
};
