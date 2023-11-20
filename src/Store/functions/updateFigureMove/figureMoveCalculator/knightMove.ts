import { addFigureMove, posToId } from "../toolFunction/toolFunctions";

export const knightMove = (state, choosedFigure, id, contents) => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest: number = choosedFigure.pos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest: number = choosedFigure.pos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const moveableSquareId: string | number = posToId(xTest, yTest);

                const isInSquareNotAlliedFigure: Boolean = contents[moveableSquareId]?.side !== choosedFigure.side;
                const isSquareExist: Boolean = moveableSquareId !== null;

                if (isInSquareNotAlliedFigure && isSquareExist) {
                    addFigureMove(state, id, moveableSquareId)
                }
            }
        }
    }
}