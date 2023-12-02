import isKingCanBeated from "../isKingCanBeated";
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
        state.isMoveExist = true
        state.figureMove[figureId][canMoveTo] = potentialMove
    }
}

const buildMoveVariattion = (state, figureId, canMoveTo, potentailMove) => {
    const moveVariattion = { ...state.content };
    moveVariattion[canMoveTo] = state.content[figureId];
    moveVariattion[figureId] = {};

    const needDeleteFrom = potentailMove.deleteFrom !== undefined;
    if (needDeleteFrom) {
        const deletedFigureId = potentailMove.deleteFrom;
        moveVariattion[deletedFigureId] = {};
    }

    const kingPos = potentailMove.changeKingPos !== undefined
        ? idToPos(canMoveTo)
        : idToPos(state.kingsId[state.figureTurn]);

    return {
        tableContent: moveVariattion,
        kingPos: kingPos,
        kingSide: state.figureTurn,
    }
}

