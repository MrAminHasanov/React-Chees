import { figures } from "./updateFigureMove/toolFunction/addFigureMove"
import { posToId } from "./updateFigureMove/toolFunction/id_posFunctions"

const isKingCanBeated = (props) => {
    if (canKnightBeatKing(props)) return true
    if (canBishoopOrQueenBeatKing(props)) return true
    if (canRookOrQueenBeatKing(props)) return true
    if (canPawnBeatKing(props)) return true

    return false
}

const canKnightBeatKing = ({ tableContent, kingPos, kingSide }) => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest = kingPos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest = kingPos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const dangerSquareId = posToId(xTest, yTest);
                if (dangerSquareId !== "squareNotExists") {
                    const dangerSquareContent = tableContent[dangerSquareId];
                    const isInDangerSquareEnemyKnight =
                        dangerSquareContent?.type === figures.knight &&
                        dangerSquareContent?.side === !kingSide
                    if (isInDangerSquareEnemyKnight) return true
                }
            }
        }
    }
}

const canBishoopOrQueenBeatKing = ({ tableContent, kingPos, kingSide }) => {
    const startX = kingPos.x;
    const startY = kingPos.y;
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            let xCounter = startX;
            let yCounter = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += xDrt;
                yCounter += yDrt;
                const dangerSquareId = posToId(xCounter, yCounter);
                const dangerSquare = tableContent[dangerSquareId];
                const isSquareEmpty = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareDangerFigure =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figures.queen || dangerSquare.type === figures.bishop);
                if (isInSquareDangerFigure) {
                    return true
                }
                break
            }
        }
    }
}

const canRookOrQueenBeatKing = ({ tableContent, kingPos, kingSide }) => {
    const startX = kingPos.x;
    const startY = kingPos.y;
    for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
        for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
            let xCounter = startX;
            let yCounter = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += ((1 + corOrder) / 2) * yxDrt;
                yCounter += ((-1 + corOrder) / -2) * yxDrt;
                const dangerSquareId = posToId(xCounter, yCounter);
                const dangerSquare = tableContent[dangerSquareId];

                const isSquareEmpty = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareEnemyFigure =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figures.rook || dangerSquare.type === figures.queen);
                if (isInSquareEnemyFigure) {
                    return true
                }
                break
            }
        }
    }
}

const canPawnBeatKing = ({ tableContent, kingPos, kingSide }) => {
    const pawnDirection = kingSide ? -1 : 1;

    const leftDioganalSquareId = posToId(kingPos.x + 1, kingPos.y + 1 * pawnDirection);
    const rightDioganalSquareId = posToId(kingPos.x - 1, kingPos.y + 1 * pawnDirection);
    const leftDioganalSquareFigure = tableContent[leftDioganalSquareId]
    const rightDioganalSquareFigure = tableContent[rightDioganalSquareId]
    const isInLeftDiognalaSquareEnemyPawn =
        leftDioganalSquareFigure?.side === !kingSide &&
        (leftDioganalSquareFigure?.type === figures.pawn);
    const isInRightDiognalaSquareEnemyPawn =
        rightDioganalSquareFigure?.side === !kingSide &&
        (rightDioganalSquareFigure?.type === figures.pawn)
    if (isInLeftDiognalaSquareEnemyPawn) return true
    if (isInRightDiognalaSquareEnemyPawn) return true
}

export default isKingCanBeated