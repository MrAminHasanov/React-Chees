import { figures } from "../../../Types/connstEnums.ts";
import { figureMoveProps, pos, squareContentInter } from "../../../Types/stateInterface.ts";
import { addFigureMove } from "../../toolFunction/addFigureMove.ts";
import { posToId } from "../../toolFunction/id_posFunctions.ts";

const sides = { white: true, black: false };

export const pawnMove = ({ state, choosedFigure, id, contents }: figureMoveProps): void => {
    //переменая для коректировки напраления движения пешки в зависимости от его стороны 
    const pawnDirection: number = choosedFigure.side === sides.black ? 1 : -1;
    // #region verifyMoveDirectly
    const nextSquareId: number | string = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * pawnDirection);
    const isNextSquareEmpty: boolean = contents[nextSquareId]?.side === undefined;
    if (isNextSquareEmpty) {
        addFigureMove(state, id, { canMoveTo: nextSquareId });
        const isThisPawnFirstMove: boolean =
            (choosedFigure.pos.y === 2 && choosedFigure.side === sides.black) ||
            (choosedFigure.pos.y === 7 && choosedFigure.side === sides.white)
        if (isThisPawnFirstMove) {
            const afterNextSquareId: number | string = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
            const isAfterNextSquareEmpty: boolean = contents[afterNextSquareId]?.side === undefined;
            if (isAfterNextSquareEmpty) {
                addFigureMove(state, id, { canMoveTo: afterNextSquareId })
            }
        }
    }
    // #endregion
    // #region verifyDioganalBeating
    const leftDioganalSquareId: number | string = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection);
    const rightDioganalSquareId: number | string = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection);
    const isLeftDiognalaSquareEnemy: boolean = contents[leftDioganalSquareId]?.side === !choosedFigure.side;
    const isRightDiognalaSquareEnemy: boolean = contents[rightDioganalSquareId]?.side === !choosedFigure.side;
    if (isLeftDiognalaSquareEnemy)
        addFigureMove(state, id, { canMoveTo: leftDioganalSquareId });
    if (isRightDiognalaSquareEnemy)
        addFigureMove(state, id, { canMoveTo: rightDioganalSquareId });
    // #endregion
    // #region verifySpecialBeat
    const leftSquarePos: pos = { x: choosedFigure.pos.x - 1, y: choosedFigure.pos.y };
    const rightSquarePos: pos = { x: choosedFigure.pos.x + 1, y: choosedFigure.pos.y };
    const leftSquareId: number | string = posToId(leftSquarePos.x, leftSquarePos.y);
    const rightSquareId: number | string = posToId(rightSquarePos.x, rightSquarePos.y);
    const leftSquare: squareContentInter = contents[leftSquareId];
    const rightSquare: squareContentInter = contents[rightSquareId];

    const isInLeftSquareEnemyPawn: boolean =
        leftSquare?.type === figures.pawn &&
        leftSquare?.side === !choosedFigure.side;
    const isInRightSquareEnemyPawn: boolean =
        rightSquare?.type === figures.pawn &&
        rightSquare?.side === !choosedFigure.side;

    if (isInLeftSquareEnemyPawn || isInRightSquareEnemyPawn) {
        let pawnPos: pos, pawnId: any;
        if (isInLeftSquareEnemyPawn) {
            pawnPos = leftSquarePos;
            pawnId = leftSquareId;
        } else {
            pawnPos = rightSquarePos;
            pawnId = rightSquareId;
        }

        const prevMove: object = state.moveHistory[state.moveHistory.length - 2];
        const pawnStartPosId: number | string = posToId(pawnPos.x, pawnPos.y + 2 * pawnDirection);
        const wasPawnInStart: boolean = prevMove[pawnStartPosId]?.type === figures.pawn;
        if (wasPawnInStart) {
            const DioganalSquareId: number | string = posToId(pawnPos.x, pawnPos.y + 1 * pawnDirection);
            addFigureMove(state, id, { deleteFrom: pawnId, canMoveTo: DioganalSquareId });
        }
    }
    //#endregion
}