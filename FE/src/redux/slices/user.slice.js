import { createSlice } from "@reduxjs/toolkit";
// import { getLocalStore } from "../../utils/local";

const initialState = {
  // user: getLocalStore("TOKEN_USERR"),
  // user: getLocalStore("TOKEN_USERR")
};

const user = createSlice({
  name: `user`,
  initialState,
  reducers: {},
});

export const {} = user.actions;

export default user.reducer;
