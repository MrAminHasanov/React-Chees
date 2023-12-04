import { createSlice } from "@reduxjs/toolkit";
import tableStartContent from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import checkWinCondition from "./functions/checkWinCondition";
import { updateFigureMove } from "./functions/updateFigureMove/updateFigureMove"

const sides = { white: true, black: false };

const initialState = {
  content: { ...tableStartContent },
  figureMove: { ...figureStartMove },
  moveHistory: [tableStartContent],
  moveableSquares: {},
  figureTurn: sides.white,
  choosedFigureId: null,
  kingsId: {
    [sides.white]: 60,
    [sides.black]: 4
  },
  isMoveExist: true,
  whoWin: undefined
};


export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    restartGame: (state) => {
      state.figureTurn = sides.white
      state.content = { ...tableStartContent }
      state.figureMove = { ...figureStartMove }
      state.moveHistory = [tableStartContent]
      state.isMoveExist = true
      state.whoWin = undefined
      state.kingsId = {
        [sides.white]: 60,
        [sides.black]: 4
      }
    },
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
        updateFigureMove(state);
        checkWinCondition(state)
      }
      state.choosedFigureId = null;
      state.moveableSquares = {};
    }
  }
});

export const { actions, reducer } = squearesSlice;
