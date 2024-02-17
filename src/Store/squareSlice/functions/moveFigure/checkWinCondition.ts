import isKingCanBeated from "../isKingCanBeated.ts"
import { idToPos } from "../toolFunction/id_posFunctions.ts";
import { contentInter, kingCanBeatedProps, stateIntarface } from "../../Types/stateInterface.ts";

const checkWinCondition = (state: stateIntarface): void => {
    const isMoveExis: boolean = state.isMoveExist;
    if (!isMoveExis) {
        const kingProps: kingCanBeatedProps = {
            tableContent: { ...state.content },
            kingPos: idToPos(state.kingsId[String(state.figureTurn)]),
            kingSide: state.figureTurn,
        }

        if (isKingCanBeated(kingProps)) {
            state.isTimerGoing = false;
            state.whoWin = !state.figureTurn;
            state.isGameStarted = false;
        }
        else {
            state.isTimerGoing = false;
            state.whoWin = "draw";
            state.isGameStarted = false;
        }
        return
    }

    if (checkDrawBecauseRepeat({ ...state.contentHistory })) {
        state.isTimerGoing = false;
        state.whoWin = "draw";
        state.isGameStarted = false;
    }
}

const checkDrawBecauseRepeat = (contentHistory: Array<contentInter>): boolean => {
    const movesCount: number = Object.keys(contentHistory).length - 1;
    if (movesCount > 7) {
        const isLastMoveEqualToFoureMoveBefore: boolean =
            JSON.stringify(contentHistory[movesCount]) ===
            JSON.stringify(contentHistory[movesCount - 4])
        const isFoureMoveBeforeEqualToEightMoveBefore: boolean =
            JSON.stringify(contentHistory[movesCount - 4]) ===
            JSON.stringify(contentHistory[movesCount - 8])
        return (
            isLastMoveEqualToFoureMoveBefore &&
            isFoureMoveBeforeEqualToEightMoveBefore
        );
    };
    return false
}

export default checkWinCondition;