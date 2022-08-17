const { request, response } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const jsonParser = bodyParser.json();

const Task = require("./models/Task");

// Endpoint for all tasks
app.get("/alltasks", (request, response) => {
  Task.find({}, (err, tasks) => {
    response.json(tasks);
  });
});

app.post("/alltasks", jsonParser, async (req, res) => {
  console.log(req.body);
  const newTask = new Task({
    title: req.body.title,
    priority: req.body.priority,
    is_finished: req.body.is_finished,
  });
  try {
    await newTask.save();
    console.log(newTask);
    console.log("Object Saved");
    res.json({ message: "accepted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "not accepted" });
  }
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
  app.listen(process.env.SERVER_PORT, () =>
    console.log("Server Up and running")
  );
});
