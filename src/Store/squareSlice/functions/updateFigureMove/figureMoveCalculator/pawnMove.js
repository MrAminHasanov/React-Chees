import { addFigureMove, figures } from "../toolFunction/addFigureMove";
import { posToId } from "../toolFunction/id_posFunctions";

const sides = { white: true, black: false };

export const pawnMove = (state, choosedFigure, id, contents) => {
    //переменая для коректировки напраления движения пешки в зависимости от его стороны 
    const pawnDirection = choosedFigure.side === sides.black ? 1 : -1;
    // #region verifyMoveDirectly
    const nextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * pawnDirection);
    const isNextSquareEmpty = contents[nextSquareId]?.side === undefined;
    if (isNextSquareEmpty) {
        addFigureMove(state, id, nextSquareId);
        const isThisPawnFirstMove =
            (choosedFigure.pos.y === 2 && choosedFigure.side === sides.black) ||
            (choosedFigure.pos.y === 7 && choosedFigure.side === sides.white)
        if (isThisPawnFirstMove) {
            const afterNextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
            const isAfterNextSquareEmpty = contents[afterNextSquareId]?.side === undefined;
            if (isAfterNextSquareEmpty) {
                addFigureMove(state, id, afterNextSquareId)
            }
        }
    }
    // #endregion
    // #region verifyDioganalBeating
    const leftDioganalSquareId = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection);
    const rightDioganalSquareId = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection);
    const isLeftDiognalaSquareEnemy = contents[leftDioganalSquareId]?.side === !choosedFigure.side;
    const isRightDiognalaSquareEnemy = contents[rightDioganalSquareId]?.side === !choosedFigure.side;
    if (isLeftDiognalaSquareEnemy)
        addFigureMove(state, id, leftDioganalSquareId);
    if (isRightDiognalaSquareEnemy)
        addFigureMove(state, id, rightDioganalSquareId);
    // #endregion
    // #region verifySpecialBeat
    const leftSquarePos = { x: choosedFigure.pos.x - 1, y: choosedFigure.pos.y };
    const rightSquarePos = { x: choosedFigure.pos.x + 1, y: choosedFigure.pos.y };
    const leftSquareId = posToId(leftSquarePos.x, leftSquarePos.y);
    const rightSquareId = posToId(rightSquarePos.x, rightSquarePos.y);
    const leftSquare = contents[leftSquareId];
    const rightSquare = contents[rightSquareId];

    const isInLeftSquareEnemyPawn =
        leftSquare?.type === figures.pawn &&
        leftSquare?.side === !choosedFigure.side;
    const isInRightSquareEnemyPawn =
        rightSquare?.type === figures.pawn &&
        rightSquare?.side === !choosedFigure.side;

    if (isInLeftSquareEnemyPawn || isInRightSquareEnemyPawn) {
        let pawnPos, pawnId;
        if (isInLeftSquareEnemyPawn) {
            pawnPos = leftSquarePos;
            pawnId = leftSquareId;
        } else {
            pawnPos = rightSquarePos;
            pawnId = rightSquareId;
        }

        const prevMove = state.moveHistory[state.moveHistory.length - 2];
        const pawnStartPosId = posToId(pawnPos.x, pawnPos.y + 2 * pawnDirection);
        const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
        if (wasPawnInStart) {
            const DioganalSquareId = posToId(pawnPos.x, pawnPos.y + 1 * pawnDirection);
            addFigureMove(state, id, DioganalSquareId, { deleteFrom: pawnId });
        }
    }
    //#endregion
}