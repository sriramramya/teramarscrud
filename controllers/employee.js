const Employee = require("../models/employeeModel");
const User = require("../models/userModel");

exports.createEmployee = async (req, res) => {
  try {
    let { name, dateOfJoining, department } = req.body;
    let createdByUserId = req.user._id;
    const employee = await Employee.create({
      name,
      dateOfJoining,
      department,
      createdByUserId,
    });
    if (employee) {
      res.json({ message: "Employee created success", employeeData: employee });
    }
  } catch (error) {
    console.log(errpr);
    res.json({ message: "employee creation failed", error });
  }
};
exports.getEmployee = async (req, res) => {
  try {
    const employeeData = await User.find();
    res
      .status(200)
      .json({ messge: "employee data fetched succes", employeeData });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error while fetching employee data", error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    let auth = await checkUserAccess(req, res);
    if (!auth.status) {
      return res.status(403).json({ message: auth.message });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    res.status(200).json({
      status: "Employee data updated success",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error while updating employee data", error });
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    let auth = await checkUserAccess(req, res);
    if (!auth.status) {
      return res.status(403).json({ message: auth.message });
    }
    await Employee.findByIdAndDelete(req.body.id);

    res.status(204).json({
      message: "data deleted success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error while deleting employee data", error });
  }
};

async function checkUserAccess(req, res) {
  const employee = await Employee.findById(req.body.id);
  if (!employee) {
    return {
      status: false,
      message: "No employee found with this employee id",
    };
  }
  if (String(employee.createdByUserId) != String(req.user._id)) {
    return {
      status: false,
      message: "You are not authorised to do this activity",
    };
  }
  return { status: true };
}
