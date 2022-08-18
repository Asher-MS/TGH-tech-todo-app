const { request, response, json } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const jsonParser = bodyParser.json();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost",
  })
);
const Task = require("./models/Task");
const User = require("./models/User");

app.use(async (request, response, next) => {
  // -----------------------------------------------------------------------
  // authentication middleware
  if (request.url == "/signup") {
    return next();
  }

  // parse login and password from headers
  const b64auth = (request.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  // Verify login and password are set and correct

  // Access granted...
  let p = new Promise((resolve, reject) => {
    User.exists({ username: login, password: password }, (err, doc) => {
      if (doc) {
        console.log("Authentication succesfull");

        resolve(true);
      } else {
        console.log("Authentication unsuccesfull");
        console.log(login);
        console.log(password);
        console.log(err);
        resolve(false);
      }
    });
  });

  if (await p) {
    console.log("return next()");
    request.user = login;
    return next();
  } else {
    // Access denied...
    response.set("WWW-Authenticate", 'Basic realm="401"'); // change this
    response.status(401).send("Authentication required."); // custom message
  }

  // -----------------------------------------------------------------------
});

app.post("/signup", jsonParser, async (request, response) => {
  const b64auth = (request.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  const newUser = new User({
    username: login,
    password: password,
  });
  try {
    await newUser.save();
    response.status(200);
    response.json({ message: "succesfull" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "not succesfull" });
  }
});

// Endpoint for all tasks
app.get("/alltasks", (request, response) => {
  Task.find({ user: request.user }, (err, tasks) => {
    console.log("Current logged in User is " + request.user);
    let sortedtasks = [];
    tasks.forEach((task) => {
      if (!task.is_finished) sortedtasks.push(task);
    });
    tasks.forEach((task) => {
      if (task.is_cancelled && !sortedtasks.includes(task))
        sortedtasks.push(task);
    });
    tasks.forEach((task) => {
      if (!sortedtasks.includes(task)) sortedtasks.push(task);
    });
    response.status(200);
    response.json(sortedtasks);
  });
});

app.post("/alltasks", jsonParser, async (request, response) => {
  console.log(request.body);
  const newTask = new Task({
    user: request.user,
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
    let a = await Task.findOneAndUpdate(
      { _id: request.body.id },
      { is_finished: true },
      { new: true }
    );
    console.log(a);
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
    let a = await Task.findOneAndUpdate(
      { _id: request.body.id },
      { is_finished: false },
      { new: true }
    );
    console.log(a);

    response.status(200);
    response.json({ message: "Marked InComplete" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Marked InComplete " });
  }
});
app.put("/markcancelled", jsonParser, async (request, response) => {
  try {
    let a = await Task.findOneAndUpdate(
      { _id: request.body.id },
      { is_cancelled: true },
      { new: true }
    );
    console.log(a);
    response.status(200);
    response.json({ message: "Marked Cancelled" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Marked Cacelled" });
  }
});
app.put("/marknotcancelled", jsonParser, async (request, response) => {
  try {
    let a = await Task.findOneAndUpdate(
      { _id: request.body.id },
      { is_cancelled: false },
      { new: true }
    );
    console.log(a);
    response.status(200);
    response.json({ message: "Marked not Cancelled" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ message: "Not Marked not Cacelled" });
  }
});

app.get("/report", (request, response) => {
  Task.find({}, (err, tasks) => {
    let no_of_pending_tasks = 0;
    let no_of_cancelled_tasks = 0;
    let no_of_completed_tasks = 0;
    tasks.forEach((task) => {
      if (task.is_finished) {
        no_of_completed_tasks++;
      } else {
        no_of_pending_tasks++;
      }
      if (task.is_cancelled) no_of_cancelled_tasks++;
    });

    response.status(200);
    response.json({
      no_of_pending_tasks: no_of_pending_tasks,
      no_of_completed_tasks: no_of_completed_tasks,
      no_of_cancelled_tasks: no_of_cancelled_tasks,
    });
  });
});
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
  app.listen(process.env.SERVER_PORT, () =>
    console.log("Server Up and running")
  );
});
