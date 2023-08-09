const { Attendance } = require("../model");
const dayjs = require("dayjs");
const router = require("express").Router();

class EmployeeAttendance {
  checkInCheckOut = async (req, res) => {
    res.send({
      status: 200,
      data: null,
      message: "Successful",
    });
  };
  searchAttendance = async (req, res) => {
    try {
      const startDateString = req.query.startDate;
      const endDateString = req.query.endDate;

      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
      if (startDate > endDate || endDate > new Date(Date.now())) {
        return res.status(400).send({
          status: 400,
          message:
            "The start date can not be greater then the end date and the end date can not be max than todays date",
          data: null,
        });
      } else {
        const records = await Attendance.find({
          checkIn: {
            $gte: startDate,
            $lte: endDate,
          },
        });

        res
          .status(200)
          .send({ status: 200, data: records, message: "Successful" });
      }
    } catch (err) {
      return res.status(404).send({
        status: 404,
        data: null,
        message: "No record was found under the given dates",
      });
    }
  };
  getAttendances = async (req, res) => {
    try {
      const limit = req.query.limit;
      console.log(limit);
      if (limit === "undefined") {
        limit = 20;
        console.log(limit);
      }
      const Attendances = await Attendance.find({})
        .sort({ checkIn: -1 })
        .limit(limit);

      if (!Attendances) {
        return res
          .status(404)
          .send({ status: 404, message: "record not Found", data: null });
      } else {
        return res
          .status(200)
          .send({ status: 200, message: "Ok", data: Attendances });
      }
    } catch (err) {
      return res
        .status(500)
        .send({ status: 500, message: "Internal Server Error", data: err });
    }
  };
}

module.exports = { EmployeeAttendance };
