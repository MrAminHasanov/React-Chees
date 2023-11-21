import { createSlice } from "@reduxjs/toolkit";

const initialState = { tableSkins: "Classic" }

export const squearesSlice = createSlice({
    name: "squaresList",
    initialState,
    reducers: {
        setTableSkin: (state, { payload: selectedSkin }) => {
            state.tableSkins = selectedSkin;
        },
    }
});

export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList