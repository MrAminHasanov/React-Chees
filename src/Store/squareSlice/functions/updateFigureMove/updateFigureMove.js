import { bishopMove } from "./figureMoveCalculator/bishopMove";
import { kingMove } from "./figureMoveCalculator/kingMove";
import { knightMove } from "./figureMoveCalculator/knightMove";
import { pawnMove } from "./figureMoveCalculator/pawnMove";
import { queenMove } from "./figureMoveCalculator/queenMove";
import { rookMove } from "./figureMoveCalculator/rookMove";

import { idToPos, figures } from "./toolFunction/toolFunctions";

const figureMovesCalculator = {
    [figures.pawn]: (state, choosedFigure, id, contents) => pawnMove(state, choosedFigure, id, contents),
    [figures.rook]: (state, choosedFigure, id, contents) => rookMove(state, choosedFigure, id, contents),
    [figures.bishop]: (state, choosedFigure, id, contents) => bishopMove(state, choosedFigure, id, contents),
    [figures.knight]: (state, choosedFigure, id, contents) => knightMove(state, choosedFigure, id, contents),
    [figures.queen]: (state, choosedFigure, id, contents) => queenMove(state, choosedFigure, id, contents),
    [figures.king]: (state, choosedFigure, id, contents) => kingMove(state, choosedFigure, id, contents)
}

export const updateFigureMove = (state) => {
    const contents = state.content;
    const figureTurn = state.figureTurn;
    state.figureMove = {};

    Object.values(contents).forEach((square, id) => {
        if (square.side === figureTurn) {
            state.figureMove[id] = {}
            const choosedFigure = {
                side: figureTurn,
                type: contents[id].type,
                pos: idToPos(id)
            }
            figureMovesCalculator[choosedFigure.type](state, choosedFigure, id, contents)
        };
    })
}
