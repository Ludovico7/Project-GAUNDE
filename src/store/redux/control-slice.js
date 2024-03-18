import { createSlice } from "@reduxjs/toolkit";

const controlSlice = createSlice({
  name: 'control',
  initialState: {isOpen: false},
  reducers: {
    setIsOpen(state, action){
      state.isOpen = action.payload;
    }
  }
})

export const controlActions = controlSlice.actions;

export default controlSlice.reducer;