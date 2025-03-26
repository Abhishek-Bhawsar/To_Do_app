import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
    const user = localStorage.getItem("user");  //set user data in localStorage
    return user ? JSON.parse(user) : null;
  };
  
  // Redux actions to handle user authentication
  const authSlice = createSlice({
    name: "auth",
    initialState: { user: loadAuthState() },
    reducers: {
      login: (state, action) => {
        state.user = { username: action.payload.username };
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      },
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;