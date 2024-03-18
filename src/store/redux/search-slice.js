import { createSlice } from '@reduxjs/toolkit';

import { sortByNearestPlace } from '../../util/util';

const initialState = {
  keyword: undefined,
  markers: [],
  places: [],
  region: undefined,
  isSelected: undefined,
  isHover: undefined,
  category: undefined,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initState(state) {
      state.keyword = undefined;
      state.markers = [];
      state.places = [];
      state.isSelected = undefined;
      state.isHover = undefined;
    },
    initKeyword(state) {
      state.keyword = undefined;
    },
    initMarkers(state) {
      state.markers = [];
    },
    initRegion(state){
      state.region = undefined;
    },
    initCategory(state){
      state.category = 'SW8';
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setMarkers(state, action) {
      state.markers = action.payload;
    },
    setPlaces(state, action){
      state.places = action.payload;
    },
    setRegion(state, action) {
      state.region = action.payload;
    },
    setIsSelected(state, action) {
      state.isSelected = action.payload;
    },
    setIsHover(state, action) {
      state.isHover = action.payload;
    },
    setCategory(state, action) {
      switch (action.payload) {
        case '음식점':
          state.category = 'FD6';
          break;
        case '카페':
          state.category = 'CE7';
          break;
        case '엔터테인먼트':
          state.category = 'CT1';
          break;
        default:
          state.category = 'SW8';
      }
    },
    sortPlaces(state){
      state.places = sortByNearestPlace(state.places);
    }
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
