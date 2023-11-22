import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedSkin: "Pixel-Chess" }

export const squearesSlice = createSlice({
    name: "squaresList",
    initialState,
    reducers: {
        setTableSkin: (state, { payload: selectedSkin }) => {
            state.selectedSkin = selectedSkin;
        },
    }
});

export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList