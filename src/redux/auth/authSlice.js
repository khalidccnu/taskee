import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFBUnHold: true,
  isUserLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFBUnHold: (state, action) => {
      state.isFBUnHold = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isUserLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setFBUnHold, setUserLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
