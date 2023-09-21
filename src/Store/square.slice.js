import { createSlice } from "@reduxjs/toolkit";

const sides = { white: true, black: false };
const figures = { pawn: "Pawn" };
const initialState = { content: {}, choosedFigure: null, turn: sides.white, moveableSquares: {} };
for (let i = 0; i < 64; ++i) {
  if (i < 16) {
    if (i > 7) {
      initialState.content[i] = {
        type: figures.pawn,
        side: sides.black
      }
    } else {
      initialState.content[i] = {}
    }
  } else if (i > 47) {
    if (i < 56) {
      initialState.content[i] = {
        type: figures.pawn,
        side: sides.white
      }
    } else {
      initialState.content[i] = {}
    }
  } else {
    initialState.content[i] = {}
  }
};


const moveHistory = [initialState.content];
const idToPos = (id) => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
const posToId = (x, y) => ((y - 1) * 8 + x - 1);

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    selectFigure: (state, { payload: id }) => {
      const contents = state.content;
      const turn = state.turn;
      if (contents[id].side === turn) {
        state.moveableSquares = {};
        state.choosedFigure = id;
        const choosedFigure = {
          side: turn,
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
              if (contents[nextSquareId]?.side === undefined) {
                state.moveableSquares[nextSquareId] = nextSquareId;
                if ((choosedFigure.pos.y === 2 && choosedFigure.side === sides.black) ||
                  (choosedFigure.pos.y === 7 && choosedFigure.side === sides.white)) {
                  const subsequentSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
                  if (contents[subsequentSquareId]?.side === undefined) {
                    state.moveableSquares[subsequentSquareId] = subsequentSquareId;
                  }
                }
              }
              // #endregion
              // #region verifyDioganalBeating
              const leftDioganalSquareId = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection)
              const rightDioganalSquareId = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection)
              if (contents[leftDioganalSquareId]?.side === !choosedFigure.side)
                state.moveableSquares[leftDioganalSquareId] = leftDioganalSquareId;
              if (contents[rightDioganalSquareId]?.side === !choosedFigure.side)
                state.moveableSquares[rightDioganalSquareId] = rightDioganalSquareId;
              // #endregion
              // #region verifySpecialBeat
              const leftSquarePos = { x: choosedFigure.pos.x - 1, y: choosedFigure.pos.y };
              const rightSquarePos = { x: choosedFigure.pos.x + 1, y: choosedFigure.pos.y };
              const leftSquareId = posToId(leftSquarePos);
              const rightSquareId = posToId(rightSquarePos);
              const leftSquare = contents[leftSquareId];
              const rightSquare = contents[rightSquareId];

              if (leftSquare?.type === figures.pawn && leftSquare?.side === !choosedFigure.side) {
                const prevMove = Object.values(moveHistory[moveHistory.length - 1]);
                const pawnStartPosId = posToId(leftSquarePos.x, leftSquarePos.y + 2 * pawnDirection);
                const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
                if (wasPawnInStart) {
                  state.moveableSquares[idToPos(leftSquarePos.x, leftSquarePos.y + 1 * pawnDirection)] = leftSquareId;
                }
              }
              if (rightSquare?.type === figures.pawn && rightSquare?.side === !choosedFigure.side) {
                const prevMove = Object.values(moveHistory[moveHistory.length - 2]);
                const pawnStartPosId = posToId(rightSquarePos.x, rightSquarePos.y + 2 * pawnDirection);
                const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
                if (wasPawnInStart) {
                  state.moveableSquares[idToPos(rightSquarePos.x, rightSquarePos.y + 1 * pawnDirection)] = rightSquareId;
                }
              }
              //#endregion
            }
            break
          default: break
        }
      }
    },
    moveFigure: (state, { payload: id }) => {
      const moveableSquare = state.moveableSquares[id]
      if (moveableSquare) {
        const choosedFigureId = state.choosedFigure;
        state.content[moveableSquare] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};
        state.turn = !state.turn
        moveHistory.push = state.content;
      }
      state.choosedFigure = null;
      state.moveableSquares = {};
    }
  }
}
);



export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList