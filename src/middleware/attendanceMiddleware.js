const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Attendance, Employee } = require("../model");
const dayjs = require("dayjs");
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "1234";

const authenticateAndCheckIn = async (req, res, next) => {
  try {
    const token = req.headers["attendance"];

    if (!token) {
      return res
        .status(403)
        .json({ status: 403, message: "No token provided", data: null });
    }

    return jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: 401, message: "Invalid token", data: null });
      }

      req.userId = decoded?.userId;

      next();
    });
  } catch (error) {
    return res.json({});
  }
};

const attendanceMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await Employee.findOne({ _id: userId }).sort({ checkIn: -1 });
    const prevAttendance = await Attendance.findOne({ userId }).sort({
      checkIn: -1,
    });
    if (!user) {
      return res.status(404).json({
        statu: 404,
        message: "User not found with this id",
        data: null,
      });
    } else {
      if (prevAttendance && prevAttendance.checkedIn) {
        const checkInTime = dayjs(prevAttendance.checkIn);
        const checkOutTime = dayjs(Date.now());
        const hours = checkOutTime.diff(checkInTime, "hour");
        if (hours < 4) {
          return res.status(400).send({
            data: null,
            message: "You can not mark checkOut before 4 hours",
            status: 400,
          });
        } else {
          await Attendance.updateOne(
            { _id: prevAttendance._id },
            { $set: { checkOut: Date.now(), checkedIn: false } }
          );
        }
      } else {
        const newUser = new Attendance({
          userId,
          checkIn: Date.now(),
          checkOut: null,
          checkedIn: true,
        });
        await newUser.save();
        return res.status(201).send({
          status: 201,
          message: "Your are Checked In",
          data: Date.now(),
        });
      }
    }

    req.userId = userId;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", data: null });
  }
};

module.exports = {
  attendanceMiddleware,
  authenticateAndCheckIn,
};
