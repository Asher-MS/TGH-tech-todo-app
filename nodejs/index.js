const { request, response, json } = require("express");
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

app.post("/alltasks", jsonParser, async (request, response) => {
  console.log(request.body);
  const newTask = new Task({
    title: request.body.title,
    priority: request.body.priority,
    is_finished: request.body.is_finished,
  });
  try {
    await newTask.save();
    console.log(newTask);
    console.log("Object Saved");
    response.status(200);
    response.json({ message: "accepted" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "not accepted" });
  }
});
app.delete("/alltasks", jsonParser, async (request, response) => {
  try {
    await Task.deleteOne({ __id: request.body.id });
    response.status(200);
    response.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Deleted" });
  }
});

//Endpoint for updating tasks
app.put("/markcomplete", jsonParser, async (request, response) => {
  try {
    await Task.findOneAndUpdate(
      { __id: request.body.id },
      { is_finished: true }
    );
    response.status(200);
    response.json({ message: "Marked Complete" });
  } catch {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Marked Complete" });
  }
});
app.put("/markincomplete", jsonParser, async (request, response) => {
  try {
    await Task.findOneAndUpdate(
      { __id: request.body.id },
      { is_finished: false }
    );
    console.log(a);
    response.status(200);
    response.json({ message: "Marked InComplete" });
  } catch {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Marked InComplete " });
  }
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
  app.listen(process.env.SERVER_PORT, () =>
    console.log("Server Up and running")
  );
});
