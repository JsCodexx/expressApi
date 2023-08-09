const { User, Employee } = require("../model");
// Function to get all users

class EmployeeManagement {
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.send({ data: users, status: 200, message: "Successful" });
    } catch (error) {
      res
        .status(500)
        .send({ status: 500, data: null, message: "Server error." });
    }
  };

  // Function to get a single user by id
  getSingleUser = async (req, res) => {
    try {
      const user = await User.findOne({ employeeId: req.params.id });
      if (!user) {
        return res.status(404).send({
          status: 404,
          data: null,
          message: "User Not Found.",
        });
      }
      res.status(200).send({ data: user, status: 200, message: "Successful" });
    } catch (error) {
      res
        .status(500)
        .send({ status: 500, data: null, message: "Server error." });
    }
  };

  // Function to delete a user by id
  deleteUser = async (req, res) => {
    try {
      console.log("i am in dell");
      console.log(req.params.id);
      const deletedUser = await Employee.deleteOne({
        employeeId: req.params.id,
      });

      if (deletedUser?.deletedCount > 0) {
        res.status(200).send({
          data: deletedUser,
          status: 200,
          message: "User Deleted Successfully",
        });
      } else {
        return res.status(500).send({
          status: 500,
          data: null,
          message: "User Not Found.",
        });
      }
    } catch (error) {
      res.send({ status: 500, data: null, message: "Server error." });
    }
  };
  blockUser = async (req, res) => {
    try {
      const empId = req.params.id;
      if (!empId) {
        return res.status(400).send({
          status: 400,
          message: "Employee Id is required",
          data: null,
        });
      }
      const user = await User.findOne({ employeeId: empId });
      if (!user) {
        return res.status(404).send({
          status: 404,
          message: "Employee with this Id is not found",
          data: null,
        });
      } else {
        if (user?.status === "inActive") {
          return res.status(409).send({
            status: 409,
            message: "Employee with this Id is already blocked",
            data: user,
          });
        }
        await User.updateOne(
          { employeeId: empId },
          { $set: { status: "inActive", updatedAt: Date.now() } }
        );
        return res.status(200).send({
          status: 200,
          message: "User is Blocked",
          data: user,
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err,
        data: null,
      });
    }
  };
  unBlockUser = async (req, res) => {
    try {
      const empId = req.params.id;
      if (!empId) {
        return res.status(400).send({
          status: 400,
          message: "Employee Id is required",
          data: null,
        });
      }
      const user = await User.findOne({ employeeId: empId });
      if (!user) {
        return res.status(404).send({
          status: 404,
          message: "Employee with this Id is not found",
          data: null,
        });
      } else {
        if (user?.status === "Active") {
          return res.status(409).send({
            status: 409,
            message: "Employee with this Id is already Active",
            data: user,
          });
        }

        await User.updateOne(
          { employeeId: empId },
          { $set: { status: "Active", updatedAt: Date.now() } }
        );
        return res.status(200).send({
          status: 200,
          message: "User is Active again",
          data: user,
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err,
        data: null,
      });
    }
  };
}

module.exports = {
  EmployeeManagement,
};
