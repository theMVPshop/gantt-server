const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getTasks = (req, res) => {
  let sql = `SELECT * FROM Tasks`;
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getTask = (req, res) => {
  let sql = `SELECT * FROM Tasks WHERE ?? = ?`;
  sql = mysql.format(sql, ["Tasks.task_id", req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
  console.log("getTask");
};

const createTask = (req, res) => {
  let sql = `INSERT INTO Tasks
    (id,
    title,
    start_date,
    end_date,
    hubspot_ticket,
    instructor, 
    teacher_assistant, 
    mode, 
    course_link,
    textbook,
    rocketchat,
    location,
    day_of_week,
    active_status,
    student_number_start,
    student_number_end,
    parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  sql = mysql.format(sql, [
    req.body.id,
    req.body.title,
    req.body.start_date,
    req.body.end_date,
    req.body.hubspot_ticket,
    req.body.instructor,
    req.body.teacher_assistant,
    req.body.mode,
    req.body.course_link,
    req.body.textbook,
    req.body.rocketchat,
    req.body.location,
    req.body.day_of_week,
    req.body.active_status,
    req.body.student_number_start,
    req.body.student_number_end,
    req.body.parent,
  ]);

  pool.query(sql, (err, result) => {
    if (err) return handleSQLError(res, err);
    return res.send(`New task created with id ${result.insertId}`);
  });
  console.log("createTask");
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  let sql = "UPDATE Tasks SET ? WHERE Tasks.id = ?";
  sql = mysql.format(sql, [body, id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    res.send(`Task with id ${id} updated`);
  });
  console.log("updateTask");
};

const deleteTask = (req, res) => {
  let sql = "DELETE FROM ?? WHERE ?? = ? OR ?? = ?";
  sql = mysql.format(sql, [
    "Tasks",
    "Tasks.id",
    req.params.id,
    "Tasks.parent",
    req.params.id,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(err, res);
    return res.send(
      `Deleted ${rows.affectedRows} task with id ${req.params.id}`
    );
  });
  console.log("deleteTask");
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
