import { figureMoveProps, squareContentInter } from "../../../Types/stateInterface.ts";
import { addFigureMove } from "../../toolFunction/addFigureMove.ts";
import { posToId } from "../../toolFunction/id_posFunctions.ts";

export const kingMove = ({ state, choosedFigure, id, contents }: figureMoveProps) => {
    const startX: number = choosedFigure.pos.x;
    const startY: number = choosedFigure.pos.y;
    for (let xCof = -1; xCof <= 1; ++xCof) {
        for (let yCof = -1; yCof <= 1; ++yCof) {
            const xCounter: number = startX + xCof;
            const yCounter: number = startY + yCof;
            const potentialSquareId: number | string = posToId(xCounter, yCounter);
            const square: squareContentInter = contents[potentialSquareId];
            if (square?.side !== choosedFigure.side) {
                addFigureMove(state, id, { changedKingSide: choosedFigure.side, canMoveTo: potentialSquareId, kingMove: true })
            }
        }
    }
}