import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");// get the task from local storage
  return data ? JSON.parse(data) : [];
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: loadFromLocalStorage() },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      console.log("removeTask", state.tasks);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = {
            ...state.tasks[updatedTaskIndex],
            ...action.payload, //only new changes will be updated
          };
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      },
    loadTasks: (state) => {
      state.tasks = loadFromLocalStorage();
    },
  },
});

export const { addTask, removeTask,updateTask, loadTasks } = taskSlice.actions;
export default taskSlice.reducer;