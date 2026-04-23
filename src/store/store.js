import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/users/userSlice";
import todoReducer from "../redux/todos/todoSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todoReducer,
  },
});
