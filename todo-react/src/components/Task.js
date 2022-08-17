import { Card, Button, Text } from "@geist-ui/core";
import axios from "axios";
let API_URL = "http://localhost:3000/";
function Task(props) {
  let handleDone = function () {
    axios
      .put(props.finishurl, {
        id: props.id,
      })
      .then(() => {
        props.updateTasks();
      });
  };
  let handleCancel = function () {
    axios
      .put(props.cancelurl, {
        id: props.id,
      })
      .then(() => {
        props.updateTasks();
      });
  };
  let handleDelete = function () {
    axios.delete(props.deleteurl, { id: props.id }).then(() => {
      props.updateTasks();
    });
  };

  return (
    <div>
      <Card type={props.is_finished ? "cyan" : ""}>
        <Text h2 del={props.is_cancelled}>
          {props.title}
        </Text>
        <Text h4>Priority : {props.priority}</Text>
        <Button type="success" onClick={handleDone}>
          Done
        </Button>
        <Button type="warning" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="error" onClick={handleDelete}>
          Delete
        </Button>
      </Card>
    </div>
  );
}

export default Task;
