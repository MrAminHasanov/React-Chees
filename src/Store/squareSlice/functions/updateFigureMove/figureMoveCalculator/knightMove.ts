import { figureMoveProps } from "../../../Types/stateInterface.ts";
import { addFigureMove } from "../../toolFunction/addFigureMove.ts";
import { posToId } from "../../toolFunction/id_posFunctions.ts";

export const knightMove = ({ state, choosedFigure, id, contents }: figureMoveProps): void => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest: number = choosedFigure.pos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest: number = choosedFigure.pos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const moveableSquareId: number | string = posToId(xTest, yTest);

                const isInSquareNotAlliedFigure: boolean = contents[moveableSquareId]?.side !== choosedFigure.side;
                const isSquareExist: boolean = moveableSquareId !== null;

                if (isInSquareNotAlliedFigure && isSquareExist) {
                    addFigureMove(state, id, { canMoveTo: moveableSquareId })
                }
            }
        }
    }
}