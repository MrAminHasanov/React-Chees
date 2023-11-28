import isKingCanBeated from "./isKingCanBeated";

export const figures = { pawn: "Pawn", knight: "Knight", rook: "Rook", bishop: "Bishop", queen: "Queen", king: "King" };

export const addFigureMove = (state, figureId, canMoveTo, specialMoves = {}) => {
    if (canMoveTo === "squareNotExists") return
    const potentialMove = {};

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
            kingSide: specialMoves.kingSide
        };
    }

    const moveVariattion = buildMoveVariattion(state, figureId, canMoveTo, potentialMove);
    if (!isKingCanBeated(moveVariattion)) {
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
    }
}

export const idToPos = (id) => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
export const posToId = (x, y) => ((x > 0 && x < 9) && (y > 0 && y < 9)) ? ((y - 1) * 8 + x - 1) : "squareNotExists";

