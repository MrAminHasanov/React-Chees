import { figuresName } from "../Types/constFigureNames.ts"
import { kingCanBeatedProps, squareContentInter } from "../Types/stateInterface.ts"
import { posToId } from "./toolFunction/id_posFunctions.ts"

const isKingCanBeated = (props: kingCanBeatedProps): boolean => {
    return (
        canKnightBeatKing(props) ||
        canBishoopOrQueenBeatKing(props) ||
        canRookOrQueenBeatKing(props) ||
        canPawnBeatKing(props) ||
        canKingBeatKing(props)
    )
}

const canKnightBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    for (let xDrt = -1; xDrt <= 1; xDrt += 2) {
        for (let yDrt = -1; yDrt <= 1; yDrt += 2) {
            for (let diogDrt = -1; diogDrt <= 1; diogDrt += 2) {
                const xTest: number = kingPos.x + ((1.5 + (diogDrt * 0.5)) * xDrt);
                const yTest: number = kingPos.y + ((1.5 - (diogDrt * 0.5)) * yDrt);
                const dangerSquareId: number = posToId(xTest, yTest);
                if (xTest > 0 && xTest < 9 && yTest > 0 && yTest < 9) {
                    const dangerSquareContent: squareContentInter = tableContent[dangerSquareId];
                    const isInDangerSquareEnemyKnight: boolean =
                        dangerSquareContent?.type === figuresName.knight &&
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
            let xCounter: number = startX + xDrt;
            let yCounter: number = startY + yDrt;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                const dangerSquareId: number = posToId(xCounter, yCounter);
                xCounter += xDrt;
                yCounter += yDrt;
                const dangerSquare: squareContentInter = tableContent[dangerSquareId];
                const isSquareEmpty: boolean = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareDangerFigure: boolean =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figuresName.queen || dangerSquare.type === figuresName.bishop);
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
            let xCounter: number = startX + ((1 + corOrder) / 2) * yxDrt;
            let yCounter: number = startY + ((-1 + corOrder) / -2) * yxDrt;
            while ((xCounter > 0 && xCounter < 9) && (yCounter > 0 && yCounter < 9)) {
                const dangerSquareId: number = posToId(xCounter, yCounter);
                xCounter += ((1 + corOrder) / 2) * yxDrt;
                yCounter += ((-1 + corOrder) / -2) * yxDrt;
                const dangerSquare: squareContentInter = tableContent[dangerSquareId];

                const isSquareEmpty: boolean = dangerSquare?.side === undefined;
                if (isSquareEmpty) {
                    continue
                }

                const isInSquareEnemyFigure: boolean =
                    dangerSquare.side === !kingSide &&
                    (dangerSquare.type === figuresName.rook || dangerSquare.type === figuresName.queen);
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

    const leftDioganalSquareId: number = posToId(kingPos.x + 1, kingPos.y + 1 * pawnDirection);
    const rightDioganalSquareId: number = posToId(kingPos.x - 1, kingPos.y + 1 * pawnDirection);
    const leftDioganalSquareFigure: squareContentInter = tableContent[leftDioganalSquareId]
    const rightDioganalSquareFigure: squareContentInter = tableContent[rightDioganalSquareId]
    const isInLeftDiognalaSquareEnemyPawn: boolean =
        leftDioganalSquareFigure?.side === !kingSide &&
        (leftDioganalSquareFigure?.type === figuresName.pawn);
    const isInRightDiognalaSquareEnemyPawn: boolean =
        rightDioganalSquareFigure?.side === !kingSide &&
        (rightDioganalSquareFigure?.type === figuresName.pawn)

    return (isInLeftDiognalaSquareEnemyPawn || isInRightDiognalaSquareEnemyPawn)
}

const canKingBeatKing = ({ tableContent, kingPos, kingSide }: kingCanBeatedProps): boolean => {
    for (let xCof = -1; xCof <= 1; ++xCof) {
        for (let yCof = -1; yCof <= 1; ++yCof) {
            const xCounter: number = kingPos.x + xCof;
            const yCounter: number = kingPos.y + yCof;
            if (xCounter > 0 && xCounter < 9 && yCounter > 0 && yCounter < 9) {
                const dangerSquareId: number = posToId(xCounter, yCounter);
                const square: squareContentInter = tableContent[dangerSquareId];
                const isEnemyKingSquare = square.type === "King" && square.side !== kingSide;
                if (isEnemyKingSquare) return true
            }
        }
    }
    return false
}

export default isKingCanBeated