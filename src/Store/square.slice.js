import { createSlice } from "@reduxjs/toolkit";

const startSquares = {};
const generateStartSquares = () => {
  let squeareColor = true;
  for (let i = 0; i < 64; ++i) {
    startSquares[i] = {
      Pos: [Math.floor(i / 8) + 1, (i % 8) + 1],
      color: squeareColor ? "black" : "white",
      content: " ",
    };
    if (!(i % 8 === 7)) {
      squeareColor = !squeareColor;
    }
  }
};
generateStartSquares();

export const squearesSlice = createSlice({
  name: "squearesList",
  startSquares,
  reducers: {
    setSquareContent: (state, { payload: content, id }) => {
      state[id].content = content;
    },
    restartSquares: (state) => {
      state = { ...startSquares };
    },
  },
});

export const { actions, reducer } = squearesSlice;
