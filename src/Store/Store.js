import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as squaresListReducer } from "./squareSlice/square.slice.ts";
import { reducer as skinManagmentReducer } from "./skinManagmentSlice/skinManagment.slice";
import { api } from "./api/api.ts";

const reducers = combineReducers({
    squaresList: squaresListReducer,
    skinManagment: skinManagmentReducer,
    [api.reducerPath]: api.reducer
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

