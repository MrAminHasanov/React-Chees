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


const squaresPosition = {};
for (let i = 0; i < 64; ++i) {
  squaresPosition[i] = { x: (i % 8) + 1, y: Math.floor(i / 8) + 1 }
};
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
          ...contents[id],
          pos: squaresPosition[id]
        }
        switch (choosedFigure.type) {
          case figures.pawn:
            {
              //переменая для коректировки напраления движения в зависимости от стороны
              const pawnDirection = choosedFigure.side === sides.black ? 1 : -1;
              const nextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * pawnDirection);
              if (contents[nextSquareId]?.side === undefined) {
                state.moveableSquares[nextSquareId] = true;
                if ((choosedFigure.pos.y === 2 && turn === sides.black) ||
                  (choosedFigure.pos.y === 7 && turn === sides.white)) {
                  const subsequentSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
                  if (contents[subsequentSquareId]?.side === undefined) {
                    state.moveableSquares[subsequentSquareId] = true;
                  }
                }
              }
              const leftDioganalSquareId = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection)
              const rightDioganalSquareId = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection)
              if (contents[leftDioganalSquareId]?.side === !turn)
                state.moveableSquares[leftDioganalSquareId] = true;
              if (contents[rightDioganalSquareId]?.side === !turn)
                state.moveableSquares[rightDioganalSquareId] = true;
            }
            break
          default: break
        }
      }
    },
    moveFigure: (state, { payload: id }) => {
      if (state.moveableSquares[id]) {
        const choosedFigureId = state.choosedFigure;
        state.content[id] = state.content[choosedFigureId];
        state.content[choosedFigureId] = {};
        state.turn = !state.turn
      }
      state.moveableSquares = {};
    }
  }
}
);



export const { actions, reducer } = squearesSlice;
export const squaresList = state => state.squaresList