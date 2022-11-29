const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeModel = new mongoose.Schema({
  name: {
    type: String,
  },
  dateOfJoining: {
    type: Date,
  },
  department: {
    type: String,
  },
  createdByUserId: { type: Schema.Types.ObjectId, ref: "User" },
});
const Employee = mongoose.model("Employee", employeeModel);
module.exports = Employee;
