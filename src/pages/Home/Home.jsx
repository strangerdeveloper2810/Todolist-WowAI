import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Container } from "../../Components/Container/Container";
import { Dropdown } from "../../Components/Dropdown/Dropdown";
import { Heading3 } from "../../Components/Heading/Heading";
import { TextField } from "../../Components/Text/TextField";
import { Button } from "../../Components/Button/Button";
import { Table, Thead, Th, Tr } from "../../Components/Table/Table";
import {
  AddTaskAction,
  DeleteTaskAction,
  DoneTaskAction,
  ChangeThemeAction,
  EditTaskAction,
  UpdateTaskAction,
} from "../../redux/actions/ToDoListAction";
import { arrTheme } from "../../themes/ThemeManager";
export default function Home() {
  const dispatch = useDispatch();
  const themeDefault = useSelector(
    (state) => state.ToDoListReducer.ThemeDefault
  );
  const taskList = useSelector((state) => state.ToDoListReducer.taskList);
  const taskEdit = useSelector((state) => state.ToDoListReducer.taskEdit);
  const prevTaskEditId = React.useRef(taskEdit.id);

  const [taskName, setTaskName] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const renderTaskToDo = () => {
    return taskList
      .filter((task) => !task.done)
      .map((task, index) => (
        <Tr key={index}>
          <Th>{task.taskName}</Th>
          <Th className="text-end">
            <Button
              className="ms-2"
              onClick={() => {
                setDisabled(false);
                dispatch(EditTaskAction(task));
              }}
            >
              <i className="fa fa-edit"></i>
            </Button>

            <Button
              className="ms-2"
              onClick={() => {
                dispatch(DoneTaskAction(task.id));
              }}
            >
              <i className="fa fa-check"></i>
            </Button>

            <Button
              className="ms-2"
              onClick={() => {
                dispatch(DeleteTaskAction(task.id));
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Th>
        </Tr>
      ));
  };

  const renderTaskCompleted = () => {
    return taskList
      .filter((task) => task.done)
      .map((task, index) => (
        <Tr key={index}>
          <Th>{task.taskName}</Th>
          <Th className="text-end">
            <Button
              className="ms-2"
              onClick={() => {
                dispatch(DeleteTaskAction(task.id));
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Th>
        </Tr>
      ));
  };

  const renderTheme = () => {
    return arrTheme.map((theme, index) => (
      <option value={theme.id} key={index}>
        {theme.name}
      </option>
    ));
  };

  React.useEffect(() => {
    if (taskEdit.id !== prevTaskEditId.current) {
      setTaskName(taskEdit.taskName);
    }
  }, [taskEdit.id, taskEdit.taskName]);

  return (
    <ThemeProvider theme={themeDefault}>
      <Container className="w-50">
        <Dropdown
          onChange={(event) => {
            let { value } = event.target;
            dispatch(ChangeThemeAction(value));
          }}
        >
          {renderTheme()}
        </Dropdown>
        <Heading3>To Do List</Heading3>
        <TextField
          value={taskName}
          name="taskName"
          label="Task name"
          className="w-50"
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />
        <Button
          className="ms-2"
          onClick={() => {
            let newTask = {
              id: Date.now(),
              taskName: taskName,
              done: false,
            };
            dispatch(AddTaskAction(newTask));
          }}
        >
          <i className="fa fa-plus"> Add Task</i>
        </Button>

        {disabled ? (
          <Button
            className="ms-2"
            disabled
            onClick={() => {
              dispatch(UpdateTaskAction(taskName));
            }}
          >
            <i className="fa fa-upload"> Update Task</i>
          </Button>
        ) : (
          <Button
            className="ms-2"
            onClick={() => {
              setDisabled(true);
              setTaskName("");
              dispatch(UpdateTaskAction(taskName));
            }}
          >
            <i className="fa fa-upload"></i>
            Update Task
          </Button>
        )}

        <hr />
        <Heading3>Task To Do</Heading3>
        <Table>
          <Thead>{renderTaskToDo()}</Thead>
        </Table>

        <Heading3>Task Complete</Heading3>
        <Table>
          <Thead>{renderTaskCompleted()}</Thead>
        </Table>
      </Container>
    </ThemeProvider>
  );
}
