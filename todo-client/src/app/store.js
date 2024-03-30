import { createSlice, configureStore } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoggedIn: false,
  },
  reducers: {
    setIsLogged: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    addTodo(state, action) {
      const newTodo = action.payload;
      state.todos.push(newTodo);
    },
    getTodos(state, action) {
      state.todos = action.payload;
    },
    getTodo: (state, action) => {},
    updateTodo: (state, action) => {},
    removeTodo: (state, action) => {},
  },
});

export const {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  removeTodo,
  setIsLogged,
} = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});
