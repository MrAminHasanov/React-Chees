import { bishopMove } from "./calcFiguresMove/bishopMove.ts";
import { kingMove } from "./calcFiguresMove/kingMove.ts";
import { knightMove } from "./calcFiguresMove/knightMove.ts";
import { pawnMove } from "./calcFiguresMove/pawnMove.ts";
import { queenMove } from "./calcFiguresMove/queenMove.ts";
import { rookMove } from "./calcFiguresMove/rookMove.ts";

import { idToPos } from "../toolFunction/id_posFunctions.ts";
import { figuresName } from "../../Types/constFigureNames.ts";
import { stateIntarface, squareContentInter, figureMoveProps, choosedFigureForUpdateMove, contentInter } from "../../Types/stateInterface.ts"

const figureMovesCalculator = {
    [figuresName.pawn]: (figureMoveProps: figureMoveProps) => pawnMove(figureMoveProps),
    [figuresName.rook]: (figureMoveProps: figureMoveProps) => rookMove(figureMoveProps),
    [figuresName.king]: (figureMoveProps: figureMoveProps) => kingMove(figureMoveProps),
    [figuresName.queen]: (figureMoveProps: figureMoveProps) => queenMove(figureMoveProps),
    [figuresName.bishop]: (figureMoveProps: figureMoveProps) => bishopMove(figureMoveProps),
    [figuresName.knight]: (figureMoveProps: figureMoveProps) => knightMove(figureMoveProps)
}

export const updateFigureMove = (state: stateIntarface): void => {
    const contents: contentInter = { ...state.content };
    const figureTurn: boolean = state.figureTurn;
    state.isMoveExist = false;
    state.figureMove = {};

    Object.values(contents).forEach((square: squareContentInter, id: number): void => {
        state.figureMove[id] = {}
        if (square.side === figureTurn) {
            const choosedFigure: choosedFigureForUpdateMove = {
                side: figureTurn,
                type: String(contents[id].type),
                pos: idToPos(id)
            }
            figureMovesCalculator[choosedFigure.type]({ state, choosedFigure, id, contents })
        };
    })
}
