import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice";
import filterSlice from "./slice/filterSlice";
import userSlice from "./slice/userSlice";
import dataSlice from "./slice/dataSlice";

const rootReducer = combineReducers({
  api: apiReducer,
  filter: filterSlice,
  profile: userSlice,
  data: dataSlice,
});

export default rootReducer;
