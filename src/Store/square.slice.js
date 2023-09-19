import { createSlice } from "@reduxjs/toolkit";

const initialState = { content: {}, choosedFigure: null, turn: "white" };
for (let i = 0; i < 64; ++i) {
  if (i < 16) {
    if (i > 7) {
      initialState.content[i] = {
        type: "Pawn",
        side: "black"
      }
    } else {
      initialState.content[i] = ""
    }
  } else if (i > 47) {
    if (i < 56) {
      initialState.content[i] = {
        type: "Pawn",
        side: "white"
      }
    } else {
      initialState.content[i] = ""
    }
  } else {
    initialState.content[i] = ""
  }
};


const squaresPosition = {};
for (let i = 0; i < 64; ++i) {
  squaresPosition[i] = { x: (i % 8) + 1, y: Math.floor(i / 8) + 1 }
};
const posToId = (pos) => ((pos.y - 1) * 8 + pos.x - 1);
// const squereGetter = (X, Y, state) => state.content[posToId({ x: X, y: Y })];

export const squearesSlice = createSlice({
  name: "squaresList",
  initialState,
  reducers: {
    // setSquareContent: (state, { payload }) => {
    //   state[payload.id].content = payload.content;
    // },
    // removeSquareContent: (state, { payload: id }) => {
    //   state[id].content = "";
    // },
    restartSquares: (state) => {
      state = initialState;
    },
    selectFigure: (state, { payload: id }) => {
      const contents = state.content;
      if (contents[id].side === state.turn) {
        state.choosedFigure = id;
        const choosedFigure = {
          ...contents[id],
          pos: squaresPosition[id]
        }
        switch (choosedFigure.type) {
          case "Pawn":
            {
              //переменая для коректировки напраления движения в зависимости от стороны
              const sideCoefficient = choosedFigure.side === "black" ? 1 : -1;
              const nextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * sideCoefficient);
              if (
                choosedFigure.side === "black" &&
                contents[nextSquareId].side !== "white"
              ) {
                state.content[nextSquareId] = "potentialSquare"
                if (choosedFigure.pos.y === 2) {
                  const subsequentSquareId = posToId(choosedFigure.pos.x, 4);
                  if (contents[subsequentSquareId] !== "white") {
                    state.content[subsequentSquareId] = "potentialSquare"
                  }
                }
              }
            }
            break
          default: break
        }
      }
    }
  },
  moveFigure: (state, { payload: id }) => {
    const choosedFigure = {
      id: state.selectedFigure,
      position: squaresPosition[state.selectedFigure],
      ...state.content[state.selectedFigure]
    };
    const chosedSquare = {
      id: id,
      content: state.content[id],
      position: squaresPosition[id]
    }
  }
}
);



export const { actions, reducer } = squearesSlice;
