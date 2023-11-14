import { addFigureMove, posToId, figures } from "../toolFunction/toolFunctions";

const sides = { white: true, black: false };

export const pawnMove = (state, choosedFigure, id, contents) => {
    //переменая для коректировки напраления движения пешки в зависимости от его стороны 
    const pawnDirection = choosedFigure.side === sides.black ? 1 : -1;
    // #region verifyMoveDirectly
    const nextSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + 1 * pawnDirection);
    if (contents[nextSquareId]?.side === undefined && nextSquareId !== null) {
        addFigureMove(state, id, nextSquareId);
        if ((choosedFigure.pos.y === 2 && choosedFigure.side === sides.black) ||
            (choosedFigure.pos.y === 7 && choosedFigure.side === sides.white)) {
            const subsequentSquareId = posToId(choosedFigure.pos.x, choosedFigure.pos.y + (2 * pawnDirection));
            if (contents[subsequentSquareId]?.side === undefined) {
                addFigureMove(state, id, subsequentSquareId)
            }
        }
    }
    // #endregion
    // #region verifyDioganalBeating
    const leftDioganalSquareId = posToId(choosedFigure.pos.x + 1, choosedFigure.pos.y + 1 * pawnDirection)
    const rightDioganalSquareId = posToId(choosedFigure.pos.x - 1, choosedFigure.pos.y + 1 * pawnDirection)
    if (contents[leftDioganalSquareId]?.side === !choosedFigure.side)
        addFigureMove(state, id, leftDioganalSquareId);
    if (contents[rightDioganalSquareId]?.side === !choosedFigure.side)
        addFigureMove(state, id, rightDioganalSquareId);
    // #endregion
    // #region verifySpecialBeat
    const leftSquarePos = { x: choosedFigure.pos.x - 1, y: choosedFigure.pos.y };
    const rightSquarePos = { x: choosedFigure.pos.x + 1, y: choosedFigure.pos.y };
    const leftSquareId = posToId(leftSquarePos.x, leftSquarePos.y);
    const rightSquareId = posToId(rightSquarePos.x, rightSquarePos.y);
    const leftSquare = contents[leftSquareId];
    const rightSquare = contents[rightSquareId];

    if (leftSquare?.type === figures.pawn && leftSquare?.side === !choosedFigure.side) {
        const prevMove = state.moveHistory[state.moveHistory.length - 2];
        const pawnStartPosId = posToId(leftSquarePos.x, leftSquarePos.y + 2 * pawnDirection);
        const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
        if (wasPawnInStart) {
            const beatedPawnId = posToId(leftSquarePos.x, leftSquarePos.y + 1 * pawnDirection);
            addFigureMove(state, id, leftSquareId, beatedPawnId);
        }
    }
    if (rightSquare?.type === figures.pawn && rightSquare?.side === !choosedFigure.side) {
        const prevMove = state.moveHistory[state.moveHistory.length - 2];
        const pawnStartPosId = posToId(rightSquarePos.x, rightSquarePos.y + 2 * pawnDirection);
        const wasPawnInStart = prevMove[pawnStartPosId]?.type === figures.pawn;
        if (wasPawnInStart) {
            const beatedPawnId = posToId(rightSquarePos.x, rightSquarePos.y + 1 * pawnDirection);
            addFigureMove(state, id, rightSquareId, beatedPawnId)
        }
    }
    //#endregion
}