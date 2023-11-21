export const figures = { pawn: "Pawn", knight: "Knight", rook: "Rook", bishop: "Bishop", queen: "Queen", king: "King" };

export const addFigureMove = (state, figureId, canMoveTo, deleteFrom, alsoGoTO, alsoGoFrom) => {
    state.figureMove[figureId][canMoveTo] = {};

    if (deleteFrom !== undefined) {
        state.figureMove[figureId][canMoveTo].deleteFrom = deleteFrom;
        return
    }

    if (alsoGoFrom !== undefined) {
        state.figureMove[figureId][canMoveTo].alsoGo = {
            "alsoGoFrom": alsoGoFrom,
            "alsoGoTo": alsoGoTO
        }
    }
}

export const idToPos = (id) => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
export const posToId = (x, y) => ((x > 0 && x < 9) && (y > 0 && y < 9)) ? ((y - 1) * 8 + x - 1) : "squareNotExists";
