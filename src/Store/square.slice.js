import { createSlice } from "@reduxjs/toolkit";
import squareContent from "./figuresStart.json";

const sides = { white: true, black: false };
const figures = { pawn: "Pawn", knight: "Knight", rook: "Rook", bishop: "Bishop", queen: "Queen", king: "King" };

const initialState = {
  content: squareContent, choosedFigureId: null, figureTurn: sides.white, figureMove: {}
};

const moveHistory = [initialState.content];

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    __updateMoves: (state) => {
      const __setMoveableSquare = (deleteFigure, moveFigure, figureId) => {
        state.moveableSquares[deleteFigure] = moveFigure;
      }

      state.figureMove = {};

      const contents = state.content;
      const figureTurn = state.figureTurn;
      Object.values(contents).forEach((square, id) => {
        if (square.side === figureTurn) {
          state.moveableSquares = {};
          const choosedFigure = {
            side: figureTurn,
            type: contents[id].type,
            pos: idToPos(id)
          }
          switch (choosedFigure.type) {
            case figures.pawn:
              {
                //переменая для коректировки напраления движения пешки в зависимости от его стороны 
                const pawnDirection = choosedFigure.side === sides.black ? 1 : -1;
                // #region verifyMoveDirectly
                const nextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * pawnDirection);
                if (contents[nextSquareId]?.side === undefined && nextSquareId !== null) {
                  __setMoveableSquare(nextSquareId, nextSquareId);
                  if ((choosedFigure.pos.y === 2 && choosedFigure.side === sides.black) ||
                    (choosedFigure.pos.y === 7 && choosedFigure.side === sides.white)) {
                    const subsequentSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
                    if (contents[subsequentSquareId]?.side === undefined) {
                      __setMoveableSquare(subsequentSquareId, subsequentSquareId)
                    }
                  }
                }
                // #endregion
                // #region verifyDioganalBeating
                const leftDioganalSquareId = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection)
                const rightDioganalSquareId = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection)
                if (contents[leftDioganalSquareId]?.side === !choosedFigure.side)
                  __setMoveableSquare(leftDioganalSquareId, leftDioganalSquareId);
                if (contents[rightDioganalSquareId]?.side === !choosedFigure.side)
                  __setMoveableSquare(rightDioganalSquareId, rightDioganalSquareId);
                // #endregion
                // #region verifySpecialBeat
                const leftSquarePos = { x: choosedFigure.pos.x - 1, y: choosedFigure.pos.y };
                const rightSquarePos = { x: choosedFigure.pos.x + 1, y: choosedFigure.pos.y };
                const leftSquareId = posToId(leftSquarePos.x, leftSquarePos.y);
                const rightSquareId = posToId(rightSquarePos.x, rightSquarePos.y);
                const leftSquare = contents[leftSquareId];
                const rightSquare = contents[rightSquareId];

                if (leftSquare?.type === figures.pawn && leftSquare?.side === !choosedFigure.side) {
                  const prevMove = moveHistory[moveHistory.length - 2];
                  const pawnStartPosId = posToId(leftSquarePos.x, leftSquarePos.y + 2 * pawnDirection);
                  const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
                  if (wasPawnInStart) {
                    const beatedPawnId = posToId(leftSquarePos.x, leftSquarePos.y + 1 * pawnDirection);
                    __setMoveableSquare(beatedPawnId, leftSquare);
                  }
                }
                if (rightSquare?.type === figures.pawn && rightSquare?.side === !choosedFigure.side) {
                  const prevMove = moveHistory[moveHistory.length - 2];
                  const pawnStartPosId = posToId(rightSquarePos.x, rightSquarePos.y + 2 * pawnDirection);
                  const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
                  if (wasPawnInStart) {
                    const beatedPawnId = posToId(rightSquarePos.x, rightSquarePos.y + 1 * pawnDirection);
                    __setMoveableSquare(beatedPawnId, rightSquareId)
                  }
                }
                //#endregion
                break
              }
            case figures.knight:
              {
                for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
                  for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
                    for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                      const xTest = choosedFigure.pos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                      const yTest = choosedFigure.pos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                      const potentialMobeableSquareId = posToId(xTest, yTest);
                      if (potentialMobeableSquareId !== null && contents[potentialMobeableSquareId]?.side !== choosedFigure.side) {
                        __setMoveableSquare(potentialMobeableSquareId, potentialMobeableSquareId)
                      }
                      //возможна Оптимизация
                    }
                  }
                }
                break
              }
            case figures.rook: {
              const startX = choosedFigure.pos.x;
              const startY = choosedFigure.pos.y;
              for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
                for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
                  let xCounter = startX;
                  let yCounter = startY;
                  while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                    xCounter += ((1 + corOrder) / 2) * yxDrt;
                    yCounter += ((-1 + corOrder) / -2) * yxDrt;
                    const potentialSquareId = posToId(xCounter, yCounter);
                    const square = contents[[potentialSquareId]];
                    if (square?.side === undefined) {
                      __setMoveableSquare(potentialSquareId, [potentialSquareId])
                      continue
                    }
                    if (square.side === !choosedFigure.side) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId)
                    }
                    break
                  }
                }
              }
              break
            }
            case figures.bishop: {
              const startX = choosedFigure.pos.x;
              const startY = choosedFigure.pos.y;
              for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
                for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
                  let xCounter = startX;
                  let yCounter = startY;
                  while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                    xCounter += xDrt;
                    yCounter += yDrt;
                    const potentialSquareId = posToId(xCounter, yCounter);
                    const square = contents[[potentialSquareId]];
                    if (square?.side === undefined) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId);
                      continue
                    }

                    if (square.side === !choosedFigure.side) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId)
                    }
                    break
                  }
                }
              }
              break
            }
            case figures.queen: {
              const startX = choosedFigure.pos.x;
              const startY = choosedFigure.pos.y;
              for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
                for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
                  let xCounter = startX;
                  let yCounter = startY;
                  while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                    xCounter += ((1 + corOrder) / 2) * yxDrt;
                    yCounter += ((-1 + corOrder) / -2) * yxDrt;
                    const potentialSquareId = posToId(xCounter, yCounter);
                    const square = contents[[potentialSquareId]];
                    if (square?.side === undefined) {
                      __setMoveableSquare(potentialSquareId, [potentialSquareId])
                      continue
                    }
                    if (square.side === !choosedFigure.side) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId)
                    }
                    break
                  }
                }
              }
              for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
                for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
                  let xCounter = startX;
                  let yCounter = startY;
                  while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                    xCounter += xDrt;
                    yCounter += yDrt;
                    const potentialSquareId = posToId(xCounter, yCounter);
                    const square = contents[[potentialSquareId]];
                    if (square?.side === undefined) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId);
                      continue
                    }

                    if (square.side === !choosedFigure.side) {
                      __setMoveableSquare(potentialSquareId, potentialSquareId)
                    }
                    break
                  }
                }
              }
              break
            }
            case figures.king: {
              const startX = choosedFigure.pos.x;
              const startY = choosedFigure.pos.y;
              for (let xCof = -1; xCof <= 1; ++xCof) {
                for (let yCof = -1; yCof <= 1; ++yCof) {
                  const xCounter = startX + xCof;
                  const yCounter = startY + yCof;
                  const potentialSquareId = posToId(xCounter, yCounter);
                  const square = contents[[potentialSquareId]];
                  if (square?.side !== choosedFigure.side) {
                    __setMoveableSquare(potentialSquareId, potentialSquareId)
                  }
                }
              }
              break
            }
            default: break
          }
        }
      });
    },
    selectFigure: (state, { payload: id }) => {
      console.log("hi");
      state.moveFigure = test(state);
    },
    moveFigure: (state, { payload: id }) => {
      const moveableSquare = state.moveableSquares[id]
      if (moveableSquare) {
        const choosedFigureId = state.choosedFigureId;
        state.content[moveableSquare] = {}
        state.content[id] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};
        state.figureTurn = !state.figureTurn
        moveHistory.push(state.content);
      }
      state.choosedFigureId = null;
      state.moveableSquares = {};
    }
  }
}
);

const test = () => {
  return { 1: "hi" }
}
const idToPos = (id) => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
const posToId = (x, y) => ((x > 0 && x < 9) && (y > 0 && y < 9)) ? ((y - 1) * 8 + x - 1) : null;

export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList