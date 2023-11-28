import { createSlice } from "@reduxjs/toolkit";
import skinsSvg from "./skinsSvg/skinsSvg"

const initialState = {
    selectedSkinKey: "Rpg-Chess",
    selectedSkin: skinsSvg["Rpg-Chess"],
    skinsList: Object.keys(skinsSvg)
}        

export const skinManagmentSlice = createSlice({
    name: "skinManagment",
    initialState,
    reducers: {
        setTableSkin: (state, { payload: selectedSkin }) => {
            state.selectedSkinKey = selectedSkin;
            state.selectedSkin = skinsSvg[selectedSkin];
        },
    }
});

export const { actions, reducer } = skinManagmentSlice;