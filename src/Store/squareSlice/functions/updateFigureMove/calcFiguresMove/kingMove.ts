import { contentInter, figureMoveProps, kingCanBeatedProps, squareContentInter } from "../../../Types/stateInterface.ts";
import isKingCanBeated from "../../isKingCanBeated.ts";
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
    //#castingTest
    const isKingMove: boolean =
        state.castlingCondition[String(choosedFigure.side)].isKingMove;
    if (!isKingMove) {
        const isRightRookMove: boolean =
            state.castlingCondition[String(choosedFigure.side)].isRightRookMove;
        const isLeftRookMove: boolean =
            state.castlingCondition[String(choosedFigure.side)].isLeftRookMove;
        if (!isRightRookMove) {
            let isSquaresBetweenKingRookEmpty: boolean = true;
            for (let xCounter: number = 5; xCounter < 8; ++xCounter) {
                const potentialSquareId: any = posToId(xCounter, startY);
                const potentialSquare: squareContentInter = contents[potentialSquareId]
                const isSquareEmpty: boolean = potentialSquare?.side === undefined;
                if (!isSquareEmpty) {
                    isSquaresBetweenKingRookEmpty = false
                    break
                }
            }
            if (isSquaresBetweenKingRookEmpty) {
                const isKingCanBeatedProps: kingCanBeatedProps = {
                    tableContent: buildAlternativeContents({ ...contents }, choosedFigure.side),
                    kingPos: {
                        x: choosedFigure.pos.x + 1,
                        y: choosedFigure.pos.y
                    },
                    kingSide: choosedFigure.side
                }
                const isKingBeAttacekWhileMove: boolean = isKingCanBeated()
            }
        }
    }
}

const buildAlternativeContents = (contents, kinsSide): contentInter => {

};
