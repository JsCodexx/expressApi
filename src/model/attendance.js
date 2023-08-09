const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendance = Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  checkIn: { type: Date, required: false },
  checkOut: { type: Date, required: false },
  checkedIn: { type: Boolean, default: false },
});

const Attendance = mongoose.model("Attendance", attendance);

module.exports = {
  Attendance,
};
