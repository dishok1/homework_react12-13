import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3030/todos";

export const fetchTodos = createAsyncThunk("todos/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/add", async (newTodo) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },
);

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
