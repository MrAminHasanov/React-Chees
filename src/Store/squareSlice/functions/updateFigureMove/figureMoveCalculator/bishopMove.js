import { addFigureMove } from "../../toolFunction/addFigureMove";
import { posToId } from "../../toolFunction/id_posFunctions";

export const bishopMove = (state, choosedFigure, id, contents) => {
    const startX = choosedFigure.pos.x;
    const startY = choosedFigure.pos.y;
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            let xCounter = startX;
            let yCounter = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += xDrt;
                yCounter += yDrt;
                const testSquareId = posToId(xCounter, yCounter);
                const square = contents[testSquareId];
                const isSquareEmpty = square?.side === undefined;
                if (isSquareEmpty) {
                    addFigureMove(state, id, testSquareId);
                    continue
                }

                const isInSquareEnemyFigure = square.side === !choosedFigure.side;
                if (isInSquareEnemyFigure) {
                    addFigureMove(state, id, testSquareId)
                }
                break
            }
        }
    }
}