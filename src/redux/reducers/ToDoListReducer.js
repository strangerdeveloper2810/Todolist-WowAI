import { ToDoListDarkTheme } from "../../themes/ToDoListDarkTheme";
import {
  ADD_TASK,
  DELETE_TASK,
  DONE_TASK,
  CHANGE_THEME,
  EDIT_TASK,
  UPDATE_TASK,
} from "../types/ToDoListType";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { arrTheme } from "../../themes/ThemeManager";
const initialState = {
  ThemeDefault: ToDoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "Learn ReactJS", done: true },
    { id: "task-2", taskName: "Learn NodeJS", done: true },
    { id: "task-3", taskName: "Learn Angular", done: false },
    { id: "task-4", taskName: "Learn VueJS", done: false },
  ],
  taskEdit: { id: "-1", taskName: "", done: false },
};

const Error = withReactContent(Swal);

const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      // Kiểm tra input có bị rỗng không
      if (action.newTask.taskName.trim() === "") {
        Error.fire({
          icon: "error",
          title: "Oops...",
          text: "Task name is required!",
        });
        return { ...state };
      }

      // Kiểm tra taskName có bị trùng không
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );

      if (index !== -1) {
        Error.fire({
          icon: "error",
          title: "Oops...",
          text: "Task name is exists!",
        });
        return { ...state };
      }

      taskListUpdate.push(action.newTask);
      state.taskList = taskListUpdate;
      Swal.fire(
        'Success!',
        `Adding Success!`,
        'success'
      )
      return { ...state };
    }

    case DONE_TASK: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      return { ...state, taskList: taskListUpdate };
    }

    case DELETE_TASK: {
      // Option 1
      // let taskListUpdate = [...state.taskList];
      // let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      // if (index !== -1) {
      //   taskListUpdate.splice(index, 1);
      // }
      // return { ...state, taskList: taskListUpdate };

      // Option 2
      // let taskListUpdate = [...state.taskList];
      // let result = taskListUpdate.filter((task) => task.id !== action.taskId);
      // return { ...state, taskList: result };

      // Option 3
      Swal.fire(
        'Success!',
        `Delete Success!`,
        'success'
      ) 
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }

    case CHANGE_THEME: {
      // eslint-disable-next-line eqeqeq
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      console.log(theme);
      if (theme) {
        state.ThemeDefault = { ...theme.theme };
      }

      return { ...state };
    }

    case EDIT_TASK: {
      return { ...state, taskEdit: action.task };
    }
    
    case UPDATE_TASK: {
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", taskName: "", done: false };
      Swal.fire(
        'Success!',
        `Updating Success!`,
        'success'
      )
      return { ...state };
    }
    

   

    default:
      return state;
  }
};

export default ToDoListReducer;
