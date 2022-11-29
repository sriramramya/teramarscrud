const express = require("express");
const employeeRoute = express.Router();
const employeeController = require("../controllers/employee");
const authcontroller = require("../controllers/authController");

employeeRoute.post(
  "/create",
  authcontroller.authCheck,
  employeeController.createEmployee
);
employeeRoute.get("/getEmployeeData", employeeController.getEmployee);
employeeRoute.post(
  "/update",
  authcontroller.authCheck,
  employeeController.updateEmployee
);
employeeRoute.delete(
  "/delete",
  authcontroller.authCheck,
  employeeController.deleteEmployee
);

module.exports = employeeRoute;
