import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as squaresListReducer } from "./squareSlice/square.slice";
import { reducer as headerReducer } from "./headerSlice/header.slice";

const reducers = combineReducers({
    squaresList: squaresListReducer,
    header: headerReducer
});

export const store = configureStore({
    reducer: reducers
});


