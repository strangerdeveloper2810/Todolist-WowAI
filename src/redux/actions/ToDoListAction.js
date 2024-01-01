import {
  ADD_TASK,
  DONE_TASK,
  DELETE_TASK,
  CHANGE_THEME,
  EDIT_TASK,
  UPDATE_TASK,
} from "../types/ToDoListType";

export const AddTaskAction = (newTask) => {
  return {
    type: ADD_TASK,
    newTask,
  };
};

export const DoneTaskAction = (taskId) => {
  return {
    type: DONE_TASK,
    taskId,
  };
};

export const DeleteTaskAction = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

export const ChangeThemeAction = (themeId) => {
  return {
    type: CHANGE_THEME,
    themeId,
  };
};

export const EditTaskAction = task => {
  return {
    type: EDIT_TASK,
    task
  }
}

export const UpdateTaskAction = taskName => {
  return {
    type: UPDATE_TASK,
    taskName
  }
}