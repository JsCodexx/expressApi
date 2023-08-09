const mongoose = require("mongoose");

const users = mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    required: true,
    type: Array,
    default: [], // empty array means no permission by default (no user)
    ref: "Role",
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", users);

module.exports = {
  User,
};
