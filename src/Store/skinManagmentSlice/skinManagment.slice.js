import { createSlice } from "@reduxjs/toolkit";
import skins from "./skins/skins"

const initialState = {
    selectedSkinKey: "Kingdoom-Chess",
    selectedSkin: skins["Kingdoom-Chess"],
    skinsList: Object.keys(skins)
}        

export const skinManagmentSlice = createSlice({
    name: "skinManagment",
    initialState,
    reducers: {
        setTableSkin: (state, { payload: selectedSkin }) => {
            state.selectedSkinKey = selectedSkin;
            state.selectedSkin = skins[selectedSkin];
        },
    }
});

export const { actions, reducer } = skinManagmentSlice;