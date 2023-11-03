import { createSlice } from "@reduxjs/toolkit";
import squareContent from "./figuresStart.json";

const sides = { white: true, black: false };
const figures = { pawn: "Pawn", knight: "Knight", rook: "Rook", bishop: "Bishop", queen: "Queen", king: "King" };

const initialState = {
  content: squareContent, choosedFigureId: null, figureTurn: sides.white, moveableSquares: {}, figureMove: {}, moveHistory: []
};

initialState.moveHistory.push(initialState.content);

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    __updateMoves: (state) => {
      state.figureMove = 
      
    },
    selectFigure: (state, { payload: id }) => {
    },
    moveFigure: (state, { payload: id }) => {
      const moveableSquare = state.moveableSquares[id]
      if (moveableSquare) {
        const choosedFigureId = state.choosedFigureId;
        state.content[moveableSquare] = {}
        state.content[id] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};
        state.figureTurn = !state.figureTurn
        state.moveHistory.push(state.content);
      }
      state.choosedFigureId = null;
      state.moveableSquares = {};
    }
  }
}
);


const idToPos = (id) => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
const posToId = (x, y) => ((x > 0 && x < 9) && (y > 0 && y < 9)) ? ((y - 1) * 8 + x - 1) : null;


export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList