require("dotenv").config();
const express = require("express");

const usersRouter = require("./routers/users.js");
const tasksRouter = require("./routers/tasks.js");
const holidaysRouter = require("./routers/holidays.js");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  next();
});

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/holidays", holidaysRouter);

// TO DO: Create a /tasks route

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
