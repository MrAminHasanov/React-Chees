import { createSlice } from "@reduxjs/toolkit";
import tableStartContent from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";
import { updateFigureMove } from "./functions/updateFigureMove/updateFigureMove";

const sides = { white: true, black: false };

const initialState = {
  content: tableStartContent,
  figureTurn: sides.white,
  figureMove: figureStartMove,
  moveableSquares: {},
  choosedFigureId: null,
  moveHistory: [tableStartContent]
};


export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    selectFigure: (state, { payload: id }) => {
      state.choosedFigureId = id;
      state.moveableSquares = state.figureMove[id]
    },
    moveFigure: (state, { payload: id }) => {
      const movedSquare = state.moveableSquares[id]
      if (movedSquare) {
        const choosedFigureId = state.choosedFigureId;
        state.content[id] = {}
        state.content[movedSquare] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};
        state.figureTurn = !state.figureTurn
        state.moveHistory = [...state.moveHistory, state.content];
        updateFigureMove(state);
      }
      state.choosedFigureId = null;
      state.moveableSquares = {};
    }
  }
});

export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList