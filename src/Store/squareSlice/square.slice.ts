import { updateFigureMove } from './functions/updateFigureMove/updateFigureMove.ts';
import { createSlice } from "@reduxjs/toolkit";

import tableStartJSON from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import { stateIntarface } from "./Types/stateInterface.ts";
import { figures, sides } from "./Types/constFigureNames.ts";
import moveFigure from "./functions/moveFigure/moveFigure.ts";
import transformJsonToTableContent from "./functions/toolFunction/transformJsonTable.ts";
import { deepObjectCloning } from './functions/deepObjectCloning.ts';

const initialState: stateIntarface = {
  content: transformJsonToTableContent(tableStartJSON),
  figureMove: { ...figureStartMove },
  moveableSquares: {},

  choosedFigureId: "notChosedFigure",
  figureTurn: sides.white,

  gameTime: "1:0",
  timeAddictionForMove: 5,
  playerTime: {
    [String(sides.white)]: 1 * 1000 * 60,
    [String(sides.black)]: 1 * 1000 * 60,
  },

  moveHistory: [],
  contentHistory: [transformJsonToTableContent(tableStartJSON)],

  //only calculation params
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
  //status
  needTransformPawn: false,
  isMoveExist: true,
  whoWin: "undefined",
  isTimerGoing: false,
  isGameStarted: false
};

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
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
        state.isTimerGoing = false;
      } else {
        state.playerTime[String(playerSide)] -= 100;
      }
    },
    surend: (state) => {
      state.whoWin = !state.figureTurn;
      state.isTimerGoing = false;
    },
    addTime: (state) => {
      state.playerTime[String(state.figureTurn)] += 30 * 1000;
    },
    prevMove: (state) => {
      if (state.contentHistory.length > 1) {
        state.content = state.contentHistory[state.contentHistory.length - 2];
        state.figureTurn = !state.figureTurn;
        state.moveableSquares = {};
        state.choosedFigureId = "notChosedFigure";
        state.contentHistory.pop();
        state.moveHistory.pop();
        updateFigureMove(state);
      }
    },
    switchGameTimer: (state) => {
      state.isTimerGoing = !state.isTimerGoing;
    },
    setGameTime: (state: stateIntarface, { payload: gameTime }) => {
      state.gameTime = gameTime;
    },
    setPlayerTime: (state: stateIntarface) => {
      const [minutes, seconds] = state.gameTime.split(":");
      state.playerTime = {
        [String(sides.white)]: Number(minutes) * 1000 * 60 + Number(seconds) * 1000,
        [String(sides.black)]: Number(minutes) * 1000 * 60 + Number(seconds) * 1000,
      }
    },
    setTimeAddictionForMove: (state: stateIntarface, { payload: timeAddictionForMove }) => {
      state.timeAddictionForMove = timeAddictionForMove;
    },
    setGameStarting: (state: stateIntarface, { payload: isGameStarted }) => {
      state.isGameStarted = isGameStarted;
    },
    restartGame: (state: stateIntarface) => {
      const initialStateClone = deepObjectCloning(initialState, ["gameTime", "timeAddictionForMove"]);
      Object.keys(initialStateClone).forEach((stateKey) => state[stateKey] = initialStateClone[stateKey])
    },

  }
});

export const { actions, reducer } = squearesSlice;

