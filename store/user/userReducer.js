import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "aaa",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
