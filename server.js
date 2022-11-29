const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const employeeRouter = require("./routes/employee");
mongoose
  .connect("mongodb://localhost:27017/teramars", {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));
app.use(express.json());
app.use("/user", userRouter);
app.use("/employee", employeeRouter);

app.listen(3000, () => {
  console.log("server running on port 3000...");
});
