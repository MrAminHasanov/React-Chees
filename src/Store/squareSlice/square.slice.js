import { createSlice } from "@reduxjs/toolkit";
import tableStartContent from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import checkWinCondition from "./functions/checkWinCondition";
import { updateFigureMove } from "./functions/updateFigureMove/updateFigureMove"

const sides = { white: true, black: false };

const initialState = {
  content: tableStartContent,
  figureTurn: sides.white,
  figureMove: figureStartMove,
  moveableSquares: {},
  choosedFigureId: null,
  moveHistory: [tableStartContent],
  kingsId: {
    [sides.white]: 60,
    [sides.black]: 4
  }
};


export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    selectFigure: (state, { payload: id }) => {
      state.choosedFigureId = id;
      if (id === null) state.moveableSquares = {}
      else state.moveableSquares = state.figureMove[id]
    },
    moveFigure: (state, { payload: goTo }) => {
      const moveInformation = state.moveableSquares[goTo];
      const isMoveExis = moveInformation !== undefined;

      if (isMoveExis) {
        const choosedFigureId = state.choosedFigureId;
        state.content[goTo] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};

        const needDeleteFrom = moveInformation.deleteFrom !== undefined;
        const needChangeKingPos = moveInformation.changeKingPos !== undefined;

        if (needDeleteFrom) {
          const needDeleteFigureId = moveInformation.deleteFrom;
          state.content[needDeleteFigureId] = {};
        }
        else if (needChangeKingPos) {
          const kingSide = moveInformation.changeKingPos.kingSide;
          state.kingsId[kingSide] = goTo;
        }

        state.figureTurn = !state.figureTurn
        state.moveHistory = [...state.moveHistory, state.content];
        checkWinCondition(state.figureMove)
        updateFigureMove(state);
      }
      state.choosedFigureId = null;
      state.moveableSquares = {};
    }
  }
});

export const { actions, reducer } = squearesSlice;