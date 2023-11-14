import { addFigureMove, posToId } from "../toolFunction/toolFunctions";

export const rookMove = (state, choosedFigure, id, contents) => {
    const startX = choosedFigure.pos.x;
    const startY = choosedFigure.pos.y;
    for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
        for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
            let xCounter = startX;
            let yCounter = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += ((1 + corOrder) / 2) * yxDrt;
                yCounter += ((-1 + corOrder) / -2) * yxDrt;
                const potentialSquareId = posToId(xCounter, yCounter);
                const square = contents[potentialSquareId];
                if (square?.side === undefined) {
                    addFigureMove(state, id, potentialSquareId)
                    continue
                }
                if (square.side === !choosedFigure.side) {
                    addFigureMove(state, id, potentialSquareId)
                }
                break
            }
        }
    }
}