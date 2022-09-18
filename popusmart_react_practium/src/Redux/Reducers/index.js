import { combineReducers } from "@reduxjs/toolkit";
import { TodoReducer } from "./TodoReducer";
const reducers = combineReducers({
   Todos:TodoReducer
});

export default reducers;