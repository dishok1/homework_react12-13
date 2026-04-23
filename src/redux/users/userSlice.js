import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      // Зберігаємо в браузер, щоб не вилітало при оновленні сторінки
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("auth", "true");
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
