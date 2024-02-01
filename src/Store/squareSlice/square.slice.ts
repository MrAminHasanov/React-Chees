import { updateFigureMove } from './functions/updateFigureMove/updateFigureMove.ts';
import { createSlice } from "@reduxjs/toolkit";

import tableStartJSON from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import { stateIntarface } from "./Types/stateInterface.ts";
import { figures, sides } from "./Types/constFigureNames.ts";
import moveFigure from "./functions/moveFigure/moveFigure.ts";
import transformJsonToTableContent from "./functions/toolFunction/transformJsonTable.ts";

const tableStartFigures = transformJsonToTableContent(tableStartJSON)

const initialState: stateIntarface = {
  content: { ...tableStartFigures },
  figureMove: { ...figureStartMove },
  moveHistory: [tableStartFigures],
  moveableSquares: {},
  figureTurn: sides.white,
  choosedFigureId: "notChosedFigure",
  needTransformPawn: false,
  kingsId: {
    [String(sides.white)]: 60,
    [String(sides.black)]: 4
  },
  castlingCondition: {
    [String(sides.white)]: {
      "isKingMove": false,
      "isLeftRookMove": false,
      "isRightRookMove": false
    },
    [String(sides.black)]: {
      "isKingMove": false,
      "isLeftRookMove": false,
      "isRightRookMove": false
    }
  },
  isMoveExist: true,
  whoWin: "undefined",
  playerTime: {
    [String(sides.white)]: 1 * 1000 * 60,
    [String(sides.black)]: 1 * 1000 * 60,
  },
  isGameStarted: false
};

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    restartGame: (state: stateIntarface) => {
      state.figureTurn = sides.white;
      state.content = { ...tableStartFigures };
      state.figureMove = { ...figureStartMove };
      state.moveHistory = [tableStartFigures];
      state.needTransformPawn = false;
      state.needTransformPawn = false;
      state.whoWin = "undefined";
      state.isGameStarted = false;
      state.playerTime = {
        [String(sides.white)]: 10 * 1000 * 60,
        [String(sides.black)]: 10 * 1000 * 60,
      }
      state.kingsId = {
        [String(sides.white)]: 60,
        [String(sides.black)]: 4
      }
      state.castlingCondition = {
        [String(sides.white)]: {
          "isKingMove": false,
          "isLeftRookMove": false,
          "isRightRookMove": false
        },
        [String(sides.black)]: {
          "isKingMove": false,
          "isLeftRookMove": false,
          "isRightRookMove": false
        }
      }
    },
    selectFigure: (state: stateIntarface, { payload: id }) => {
      state.choosedFigureId = id;
      state.moveableSquares =
        id === "notChosedFigure"
          ? {}
          : state.figureMove[id];
    },
    moveFigure,
    transformPawn: (state: stateIntarface, { payload }) => {
      const { transformTo, transformSquareId } = payload;
      const pawnId = state.choosedFigureId;

      state.content[pawnId] = figures[transformTo];
      state.needTransformPawn = false;

      delete state.moveableSquares[transformSquareId].pawnTransformEvent;
      moveFigure(state, { payload: transformSquareId });
    },
    decrimnetTimerTime: (state: stateIntarface) => {
      const playerSide = state.figureTurn;
      const playerTime = state.playerTime[String(playerSide)];
      if (playerTime < 1) {
        state.whoWin = !playerSide;
        state.isGameStarted = false;
      } else {
        state.playerTime[String(playerSide)] -= 1000;
      }
    },
    surend: (state) => {
      state.whoWin = !state.figureTurn;
    },
    addTime: (state) => {
      state.playerTime[String(state.figureTurn)] += 30 * 1000
    },
    prevMove: (state) => {
      if (state.moveHistory.length > 1) {
        state.content = state.moveHistory[state.moveHistory.length - 2];
        state.figureTurn = !state.figureTurn;
        state.moveHistory.pop();
        updateFigureMove(state);
      }
    },
    pauseGame: (state) => {
      state.isGameStarted = !state.isGameStarted;
    }
  }
});

export const { actions, reducer } = squearesSlice;