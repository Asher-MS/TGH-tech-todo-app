import logo from "./logo.svg";
import "./App.css";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { Input, Text, Button } from "@geist-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Task from "./components/Task";
let API_URL = "http://localhost:8000/";
function App() {
  let [tasks, setTasks] = useState([]);
  let currentTask = "task";
  let currentPriority = 1;

  let [pendingTasks, setPendingTasks] = useState(0);
  let [completeTasks, setCompleteTasks] = useState(0);
  let [cancelledTasks, setCancelledTasks] = useState(0);

  let updateTasks = function () {
    axios.get(API_URL + "alltasks").then((res) => {
      setTasks(res.data);
    });
    axios.get(API_URL + "report").then((res) => {
      setPendingTasks(res.data.no_of_pending_tasks);
      setCompleteTasks(res.data.no_of_completed_tasks);
      setCancelledTasks(res.data.no_of_cancelled_tasks);
    });
  };

  let addTask = function () {
    axios
      .post(API_URL + "alltasks", {
        title: currentTask,
        priority: currentPriority,
        is_finished: false,
        is_cancelled: false,
      })
      .then(() => {
        console.log("Task added ");
        updateTasks();
      });
  };

  useEffect(() => {
    updateTasks();
  }, []);
  return (
    <GeistProvider>
      <CssBaseline />
      <div className="App">
        <Text h1>TODO APP</Text>
        <Input
          placeholder="Task"
          onChange={(e) => {
            currentTask = e.target.value;
          }}
        />
        <Input
          placeholder="Priority"
          onChange={(e) => {
            currentPriority = e.target.value;
          }}
        />
        <Button type="success" onClick={addTask}>
          Add
        </Button>
        <div>
          <Text>Pending Tasks : {pendingTasks} </Text>
          <Text>Complete Tasks : {completeTasks} </Text>
          <Text>Cacelled Tasks : {cancelledTasks} </Text>
        </div>
        {tasks.map((task) => {
          return (
            <Task
              id={task._id}
              title={task.title}
              priority={task.priority}
              is_finished={task.is_finished}
              is_cancelled={task.is_cancelled}
              updateTasks={updateTasks}
              finishurl={
                API_URL + (task.is_finished ? "markincomplete" : "markcomplete")
              }
              cancelurl={
                API_URL +
                (task.is_cancelled ? "marknotcancelled" : "markcancelled")
              }
              deleteurl={API_URL + "alltasks"}
            ></Task>
          );
        })}
      </div>
    </GeistProvider>
  );
}

export default App;
