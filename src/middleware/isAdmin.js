const { User } = require("../model");
const { Role } = require("../model/roles");

const isAdmin = async (req, res, next) => {
  try {
    const role = req.headers.id;
    const foundUser = await Role.findOne({ _id: role });
    if (
      foundUser &&
      foundUser.access.includes("manage_employee") &&
      foundUser.title === "hr_manager"
    ) {
      next();
    } else {
      res.send({
        status: 401,
        data: null,
        message: "Unauthorized. Only admin users can create new users.",
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      data: null,
      message: error,
    });
  }
};

module.exports = {
  isAdmin,
};
