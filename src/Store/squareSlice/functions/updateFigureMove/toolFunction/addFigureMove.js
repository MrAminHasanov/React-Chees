import isKingCanBeated from "../../isKingCanBeated";
import { idToPos } from "./id_posFunctions";

export const figures = { pawn: "Pawn", knight: "Knight", rook: "Rook", bishop: "Bishop", queen: "Queen", king: "King" };

export const addFigureMove = (state, figureId, canMoveTo, specialMoves = {}) => {
    if (canMoveTo === "squareNotExists") return
    const potentialMove = { history: state.moveHistory };

    if (specialMoves.deleteFrom !== undefined) {
        potentialMove.deleteFrom = specialMoves.deleteFrom
    }

    if (specialMoves.alsoGoFrom !== undefined) {
        potentialMove.alsoGo = {
            "alsoGoFrom": specialMoves.alsoGoFrom,
            "alsoGoTo": specialMoves.alsoGoTO
        }
    }

    if (specialMoves.changeKingPos !== undefined) {
        potentialMove.changeKingPos = {
            kingSide: specialMoves.changeKingPos.kingSide
        };
    }

    const moveVariattion = buildMoveVariattion(state, figureId, canMoveTo, potentialMove);
    if (!isKingCanBeated(moveVariattion)) {
        if (state.figureMove[figureId] === undefined) state.figureMove[figureId] = {}
        state.figureMove[figureId][canMoveTo] = potentialMove
    }
}

const buildMoveVariattion = (state, figureId, canMoveTo, potentailMove) => {
    const moveVariattion = { ...state.content };
    moveVariattion[canMoveTo] = state.content[figureId];
    moveVariattion[figureId] = {};
    let kingPos;

    const needDeleteFrom = potentailMove.deleteFrom !== undefined;
    if (needDeleteFrom) {
        const deletedFigureId = potentailMove.deleteFrom;
        moveVariattion[deletedFigureId] = {};
    }

    if (potentailMove.changeKingPos !== undefined) {
        kingPos = idToPos(canMoveTo);
    } else {
        const kingSide = state.figureTurn;
        kingPos = idToPos(state.kingsId[kingSide]);
    }

    state.test = { ...moveVariattion }
    return {
        tableContent: moveVariattion,
        kingPos: kingPos,
        kingSide: state.figureTurn,
        figureId: figureId
    }

}

