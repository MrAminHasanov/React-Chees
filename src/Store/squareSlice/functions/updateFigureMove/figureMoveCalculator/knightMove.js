import { addFigureMove } from "../../toolFunction/addFigureMove";
import { posToId } from "../../toolFunction/id_posFunctions";

export const knightMove = (state, choosedFigure, id, contents) => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest = choosedFigure.pos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest = choosedFigure.pos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const moveableSquareId = posToId(xTest, yTest);

                const isInSquareNotAlliedFigure = contents[moveableSquareId]?.side !== choosedFigure.side;
                const isSquareExist = moveableSquareId !== null;

                if (isInSquareNotAlliedFigure && isSquareExist) {
                    addFigureMove(state, id, moveableSquareId)
                }
            }
        }
    }
}