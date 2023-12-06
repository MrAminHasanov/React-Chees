import { squareContentInter } from "../../../Types/stateInterface.ts";
import { addFigureMove } from "../../toolFunction/addFigureMove.ts";
import { posToId } from "../../toolFunction/id_posFunctions.ts";

export const rookMove = ({ state, choosedFigure, id, contents }): void => {
    const startX: number = choosedFigure.pos.x;
    const startY: number = choosedFigure.pos.y;
    for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
        for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
            let xCounter: number = startX;
            let yCounter: number = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += ((1 + corOrder) / 2) * yxDrt;
                yCounter += ((-1 + corOrder) / -2) * yxDrt;
                const testSquareId: number | string = posToId(xCounter, yCounter);
                const square: squareContentInter = contents[testSquareId];

                const isSquareEmpty: boolean = square?.side === undefined;
                if (isSquareEmpty) {
                    addFigureMove(state, id, { canMoveTo: testSquareId })
                    continue
                }

                const isInSquareEnemyFigure: boolean = square.side === !choosedFigure.side;
                if (isInSquareEnemyFigure) {
                    addFigureMove(state, id, { canMoveTo: testSquareId })
                }
                break
            }
        }
    }
}