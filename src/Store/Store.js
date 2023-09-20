import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as squaresListReducer } from "./square.slice";

const reducers = combineReducers({
    squaresList: squaresListReducer,
});

export const store = configureStore({
    reducer: reducers
}); 


