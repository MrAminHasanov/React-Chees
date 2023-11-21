import { addFigureMove, posToId } from "../toolFunction/toolFunctions";

export const kingMove = (state, choosedFigure, id, contents) => {
    const startX = choosedFigure.pos.x;
    const startY = choosedFigure.pos.y;
    for (let xCof = -1; xCof <= 1; ++xCof) {
        for (let yCof = -1; yCof <= 1; ++yCof) {
            const xCounter = startX + xCof;
            const yCounter = startY + yCof;
            const potentialSquareId = posToId(xCounter, yCounter);
            const square = contents[potentialSquareId];
            if (square?.side !== choosedFigure.side) {
                addFigureMove(state, id, potentialSquareId)
            }
        }
    }
}