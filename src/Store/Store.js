import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as squaresListReducer } from "./squareSlice/square.slice.ts";
import { reducer as skinManagmentReducer } from "./skinManagmentSlice/skinManagment.slice";

const reducers = combineReducers({
    squaresList: squaresListReducer,
    skinManagment: skinManagmentReducer,
});

export const store = configureStore({
    reducer: reducers,
});

