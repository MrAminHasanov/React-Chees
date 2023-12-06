import { figures } from "../Types/connstEnums.ts"
import { kingCanBeatedProps, squareContentInter } from "../Types/stateInterface.ts"
import { posToId } from "./toolFunction/id_posFunctions.ts"

const isKingCanBeated = (props: kingCanBeatedProps): boolean => {
    if (canKnightBeatKing(props)) return true
    if (canBishoopOrQueenBeatKing(props)) return true
    if (canRookOrQueenBeatKing(props)) return true
    if (canPawnBeatKing(props)) return true
    return false
}

const canKnightBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest: number = kingPos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest: number = kingPos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const dangerSquareId: number | string = posToId(xTest, yTest);
                if (dangerSquareId !== "squareNotExists") {
                    const dangerSquareContent: squareContentInter = tableContent[dangerSquareId];
                    const isInDangerSquareEnemyKnight: boolean =
                        dangerSquareContent?.type === figures.knight &&
                        dangerSquareContent?.side === !kingSide
                    if (isInDangerSquareEnemyKnight) return true
                }
            }
        }
    }
    return false
}

const canBishoopOrQueenBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    const startX: number = kingPos.x;
    const startY: number = kingPos.y;
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            let xCounter: number = startX;
            let yCounter: number = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += xDrt;
                yCounter += yDrt;
                const dangerSquareId: number | string = posToId(xCounter, yCounter);
                const dangerSquare: squareContentInter = tableContent[dangerSquareId];
                const isSquareEmpty: boolean = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareDangerFigure: boolean =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figures.queen || dangerSquare.type === figures.bishop);
                if (isInSquareDangerFigure) {
                    return true
                }
                break
            }
        }
    }
    return false
}

const canRookOrQueenBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    const startX: number = kingPos.x;
    const startY: number = kingPos.y;
    for (let corOrder = -1; corOrder <= 1; corOrder += 2) {
        for (let yxDrt = -1; yxDrt <= 1; yxDrt += 2) {
            let xCounter: number = startX;
            let yCounter: number = startY;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                xCounter += ((1 + corOrder) / 2) * yxDrt;
                yCounter += ((-1 + corOrder) / -2) * yxDrt;
                const dangerSquareId: number | string = posToId(xCounter, yCounter);
                const dangerSquare: squareContentInter = tableContent[dangerSquareId];

                const isSquareEmpty: boolean = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareEnemyFigure: boolean =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figures.rook || dangerSquare.type === figures.queen);
                if (isInSquareEnemyFigure) {
                    return true
                }
                break
            }
        }
    }
    return false
}

const canPawnBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    const pawnDirection: number = kingSide ? -1 : 1;

    const leftDioganalSquareId: number | string = posToId(kingPos.x + 1, kingPos.y + 1 * pawnDirection);
    const rightDioganalSquareId: number | string = posToId(kingPos.x - 1, kingPos.y + 1 * pawnDirection);
    const leftDioganalSquareFigure: squareContentInter = tableContent[leftDioganalSquareId]
    const rightDioganalSquareFigure: squareContentInter = tableContent[rightDioganalSquareId]
    const isInLeftDiognalaSquareEnemyPawn: boolean =
        leftDioganalSquareFigure?.side === !kingSide &&
        (leftDioganalSquareFigure?.type === figures.pawn);
    const isInRightDiognalaSquareEnemyPawn: boolean =
        rightDioganalSquareFigure?.side === !kingSide &&
        (rightDioganalSquareFigure?.type === figures.pawn)
    if (isInLeftDiognalaSquareEnemyPawn) return true
    if (isInRightDiognalaSquareEnemyPawn) return true
    return false
}

export default isKingCanBeated