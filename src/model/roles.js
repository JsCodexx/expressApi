const mongoose = require("mongoose");

const roles = mongoose.Schema({
  _id: {
    type: Number,
  },

  title: {
    type: String,
    required: true,
  },
  access: {
    type: Array,
    default: [],
  },
});

const Role = mongoose.model("Role", roles);

module.exports = {
  Role,
};
