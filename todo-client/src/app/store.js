import { createSlice, configureStore } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setIsLogged: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addTodo: (state, action) => {
      // Handle both direct todo object and ApiResponse structure
      const newTodo = action.payload.data || action.payload;
      state.todos.unshift(newTodo); // Add to beginning of array
      state.error = null;
    },
    getTodos: (state, action) => {
      // Handle both direct array and ApiResponse structure
      const todos = action.payload.data || action.payload;
      state.todos = Array.isArray(todos) ? todos : [];
      state.error = null;
    },
    updateTodo: (state, action) => {
      // Handle both direct todo object and ApiResponse structure
      const updatedTodo = action.payload.data || action.payload;
      const index = state.todos.findIndex(todo => todo._id === updatedTodo._id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
      state.error = null;
    },
    removeTodo: (state, action) => {
      const deletedTodoId = action.payload;
      state.todos = state.todos.filter(todo => todo._id !== deletedTodoId);
      state.error = null;
    },
    clearTodos: (state) => {
      state.todos = [];
      state.error = null;
    },
  },
});

export const {
  addTodo,
  getTodos,
  updateTodo,
  removeTodo,
  setIsLogged,
  setLoading,
  setError,
  clearError,
  clearTodos,
} = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});
