import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TasksState, Task } from '../interfaces/Task_interfaces';

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        description: string;
      }>
    ) => {
      const { id, name, description } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          name,
          description,
        };
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  tasksSlice.reducer
);

export const { addTask, updateTask, removeTask } = tasksSlice.actions;

export const selectTasks = (state: { tasks: TasksState }) =>
  state.tasks.tasks;

export default persistedReducer;
