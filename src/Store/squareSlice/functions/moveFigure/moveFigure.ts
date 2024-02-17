import checkWinCondition from "./checkWinCondition.ts";
import { updateFigureMove } from "../updateFigureMove/updateFigureMove.ts"
import { stateIntarface, moveInfo } from "../../Types/stateInterface.ts";
import { figures } from "../../Types/constFigureNames.ts";
import { idToPos } from "../toolFunction/id_posFunctions.ts";

const moveFigure = (state: stateIntarface, { payload: goTo }) => {
    const moveInformation: moveInfo = state.moveableSquares[goTo];
    const choosedFigureId: number | string = state.choosedFigureId;

    if ("pawnTransformEvent" in moveInformation) {
        state.needTransformPawn = goTo;
        return
    }

    state.content[goTo] = state.content[choosedFigureId];
    state.content[choosedFigureId] = figures.emptySquare;

    if ("deleteFrom" in moveInformation) {
        const needDeleteFigureId: any = moveInformation.deleteFrom;
        state.content[needDeleteFigureId] = figures.emptySquare;
    }

    if ("changedKingSide" in moveInformation) {
        const kingSide: any = moveInformation.changedKingSide;
        state.kingsId[kingSide] = goTo;
    }

    if (moveInformation.kingMove) {
        state.castlingCondition[String(state.figureTurn)].isKingMove = true;
    }

    if ("alsoMoveTo" in moveInformation) {
        const goToId: any = moveInformation.alsoMoveTo?.to;
        const fromToId: any = moveInformation.alsoMoveTo?.from;
        state.content[goToId] = state.content[fromToId];
        state.content[fromToId] = figures.emptySquare;
    }

    if (moveInformation.leftRookMove) {
        const figureSide: string = String(state.figureTurn);
        state.castlingCondition[figureSide].isLeftRookMove = true;
    }

    if (moveInformation.rightRookMove) {
        const figureSide: string = String(state.figureTurn);
        state.castlingCondition[figureSide].isRightRookMove = true;
    }


    state.playerTime[String(state.figureTurn)] += state.timeAddictionForMove * 1000
    const figureStartPos = idToPos(state.choosedFigureId);
    const figureStartCor = String.fromCharCode(96 + figureStartPos.x) + Math.abs(9 - figureStartPos.y)
    const figureFinalPos = idToPos(goTo);
    const figureFinalCor = String.fromCharCode(96 + figureFinalPos.x) + Math.abs(9 - figureFinalPos.y)

    state.moveHistory.push({
        movedFigure: moveInformation.figure,
        movedFromTo: `${figureStartCor} ${figureFinalCor}`
    })
    state.isTimerGoing = true;
    state.figureTurn = !state.figureTurn;
    state.contentHistory = [...state.contentHistory, state.content];
    state.choosedFigureId = "notChosedFigure";
    state.moveableSquares = {};
    updateFigureMove(state);
    checkWinCondition(state);
}


export default moveFigure;