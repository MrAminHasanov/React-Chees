import { createSlice } from "@reduxjs/toolkit";

import tableStartJSON from "./JSON/figuresStart.json";
import figureStartMove from "./JSON/figureStartMove.json";

import checkWinCondition from "./functions/checkWinCondition.ts";
import { updateFigureMove } from "./functions/updateFigureMove/updateFigureMove.ts"

import { stateIntarface, moveInfo } from "./Types/stateInterface.ts";
import { figures, sides } from "./Types/constFigureNames.ts";
import transformJsonToTableContent from "./functions/toolFunction/transformJsonTable.ts";


const tableStartFigures = transformJsonToTableContent(tableStartJSON)

const initialState: stateIntarface = {
  content: { ...tableStartFigures },
  figureMove: { ...figureStartMove },
  moveHistory: [tableStartFigures],
  moveableSquares: {},
  figureTurn: Boolean(sides.white),
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
  whoWin: "undefined"
};

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    restartGame: (state: stateIntarface) => {
      state.figureTurn = Boolean(sides.white)
      state.content = { ...tableStartFigures }
      state.figureMove = { ...figureStartMove }
      state.moveHistory = [tableStartFigures]
      state.needTransformPawn = false
      state.whoWin = "undefined"
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
          : state.figureMove[id]
    },
    moveFigure: moveFigure,
    transformPawn: (state: stateIntarface, { payload }) => {
      const { transformTo, transformSquareId } = payload;
      const pawnId = state.choosedFigureId;

      console.log(figures[transformTo]);
      state.content[pawnId] = figures[transformTo];
      state.needTransformPawn = false;

      delete state.moveableSquares[transformSquareId].pawnTransformEvent;
      moveFigure(state, { payload: transformSquareId })
    }
  }
});

function moveFigure(state: stateIntarface, { payload: goTo }) {
  const moveInformation: moveInfo = state.moveableSquares[goTo];
  const choosedFigureId: number | string = state.choosedFigureId;

  if ("pawnTransformEvent" in moveInformation) {
    state.needTransformPawn = goTo;
    return
  }

  state.content[goTo] = state.content[choosedFigureId];
  state.content[choosedFigureId] = figures.emptySquare;

  if ("deleteFrom" in moveInformation) {
    const needDeleteFigureId: any = moveInformation.deleteFrom;
    state.content[needDeleteFigureId] = figures.emptySquare;
  }

  if ("changedKingSide" in moveInformation) {
    const kingSide: any = moveInformation.changedKingSide;
    state.kingsId[kingSide] = goTo;
  }

  if (moveInformation.kingMove) {
    state.castlingCondition[String(state.figureTurn)].isKingMove = true;
  }

  if ("alsoMoveTo" in moveInformation) {
    const goToId: any = moveInformation.alsoMoveTo?.to;
    const fromToId: any = moveInformation.alsoMoveTo?.from;
    state.content[goToId] = state.content[fromToId];
    state.content[fromToId] = figures.emptySquare;
  }

  if (moveInformation.leftRookMove) {
    const figureSide: string = String(state.figureTurn);
    state.castlingCondition[figureSide].isLeftRookMove = true;
  }

  if (moveInformation.rightRookMove) {
    const figureSide: string = String(state.figureTurn);
    state.castlingCondition[figureSide].isRightRookMove = true;
  }

  state.figureTurn = !state.figureTurn
  state.moveHistory = [...state.moveHistory, state.content];
  state.choosedFigureId = "notChosedFigure";
  state.moveableSquares = {};
  updateFigureMove(state);
  checkWinCondition(state);
}

export const { actions, reducer } = squearesSlice;

