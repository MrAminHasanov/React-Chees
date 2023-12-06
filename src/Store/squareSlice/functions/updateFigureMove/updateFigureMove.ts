import { bishopMove } from "./figureMoveCalculator/bishopMove.ts";
import { kingMove } from "./figureMoveCalculator/kingMove.ts";
import { knightMove } from "./figureMoveCalculator/knightMove.ts";
import { pawnMove } from "./figureMoveCalculator/pawnMove.ts";
import { queenMove } from "./figureMoveCalculator/queenMove.ts";
import { rookMove } from "./figureMoveCalculator/rookMove.ts";

import { idToPos } from "../toolFunction/id_posFunctions.ts";
import { figures } from "../../Types/connstEnums.ts";
import { stateIntarface, squareContentInter, figureMoveProps, choosedFigureForUpdateMove } from "../../Types/stateInterface.ts"

const figureMovesCalculator = {
    [figures.pawn]: (figureMoveProps: figureMoveProps) => pawnMove(figureMoveProps),
    [figures.rook]: (figureMoveProps: figureMoveProps) => rookMove(figureMoveProps),
    [figures.king]: (figureMoveProps: figureMoveProps) => kingMove(figureMoveProps),
    [figures.queen]: (figureMoveProps: figureMoveProps) => queenMove(figureMoveProps),
    [figures.bishop]: (figureMoveProps: figureMoveProps) => bishopMove(figureMoveProps),
    [figures.knight]: (figureMoveProps: figureMoveProps) => knightMove(figureMoveProps)
}

export const updateFigureMove = (state: stateIntarface): void => {
    const contents: object = { ...state.content };
    const figureTurn: boolean = state.figureTurn;
    state.isMoveExist = false;
    state.figureMove = {};

    Object.values(contents).forEach((square: squareContentInter, id: number): void => {
        state.figureMove[id] = {}
        if (square.side === figureTurn) {
            const choosedFigure: choosedFigureForUpdateMove = {
                side: figureTurn,
                type: contents[id].type,
                pos: idToPos(id)
            }
            figureMovesCalculator[choosedFigure.type]({ state, choosedFigure, id, contents })
        };
    })
}
