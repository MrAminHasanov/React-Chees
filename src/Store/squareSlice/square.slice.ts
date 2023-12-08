import { createSlice } from "@reduxjs/toolkit";

import tableStartContent from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import checkWinCondition from "./functions/checkWinCondition.ts";
import { updateFigureMove } from "./functions/updateFigureMove/updateFigureMove.ts"

import { stateIntarface, moveInfo } from "./Types/stateInterface.ts";
import { sides } from "./Types/connstEnums.ts";

const initialState: stateIntarface = {
  content: { ...tableStartContent },
  figureMove: { ...figureStartMove },
  moveHistory: [tableStartContent],
  moveableSquares: {},
  figureTurn: Boolean(sides.white),
  choosedFigureId: "notChosedFigure",
  kingsId: {
    [sides.white]: 60,
    [sides.black]: 4
  },
  castlingCondition: {
    [sides.white]: {
      "isKingMove": false,
      "isLeftRookMove": false,
      "isRightRookMove": false
    },
    [sides.black]: {
      "isKingMove": false,
      "isLeftRookMove": false,
      "isRightRookMove": false
    }
  },
  isMoveExist: true,
  whoWin: "undefined"
};

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    restartGame: (state: stateIntarface) => {
      state.figureTurn = Boolean(sides.white)
      state.content = { ...tableStartContent }
      state.figureMove = { ...figureStartMove }
      state.moveHistory = [tableStartContent]
      state.isMoveExist = true
      state.whoWin = "undefined"
      state.kingsId = {
        [sides.white]: 60,
        [sides.black]: 4
      }
      state.castlingCondition = {
        [sides.white]: {
          "isKingMove": false,
          "isLeftRookMove": false,
          "isRightRookMove": false
        },
        [sides.black]: {
          "isKingMove": false,
          "isLeftRookMove": false,
          "isRightRookMove": false
        }
      }
    },
    selectFigure: (state: stateIntarface, { payload: id }) => {
      state.choosedFigureId = id;
      if (id === null) state.moveableSquares = {}
      else state.moveableSquares = state.figureMove[id]
    },
    moveFigure: (state: stateIntarface, { payload: goTo }) => {
      const moveInformation: moveInfo = state.moveableSquares[goTo];
      const choosedFigureId: any = state.choosedFigureId;

      state.content[goTo] = state.content[choosedFigureId];
      state.content[choosedFigureId] = {};

      const needDeleteFrom: boolean =
        moveInformation.deleteFrom !== undefined;
      const needChangeKingPos: boolean =
        moveInformation.changedKingSide !== undefined;

      if (needDeleteFrom) {
        const needDeleteFigureId: any = moveInformation.deleteFrom;
        state.content[needDeleteFigureId] = {};
      }

      if (needChangeKingPos) {
        const kingSide: any = moveInformation.changedKingSide;
        state.kingsId[kingSide] = goTo;
      }

      if (moveInformation.kingMove) {
        state.castlingCondition[String(state.figureTurn)].isKingMove = true
      }

      if (moveInformation.leftRookMove) {
        state.castlingCondition[String(state.figureTurn)].isLeftRookMove = true
      }

      if (moveInformation.rightRookMove) {
        state.castlingCondition[String(state.figureTurn)].isRightRookMove = true
      }

      state.figureTurn = !state.figureTurn
      state.moveHistory = [...state.moveHistory, state.content];
      state.choosedFigureId = "notChosedFigure";
      state.moveableSquares = {};
      updateFigureMove(state);
      checkWinCondition(state)
    }
  }
});

export const { actions, reducer } = squearesSlice;

