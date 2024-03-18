import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: undefined,
  markerCenter: undefined,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    initMap(state){
      state.map = undefined;
    },
    initCenter(state){
      state.markerCenter = undefined;
    },
    setMap(state, action){
      state.map = action.payload;
    },
    setBounds(state, action){
      state.map.setBounds(action.payload);
    },
    setMarkerCenter(state, action){
      state.markerCenter = action.payload;
    },
  }
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;