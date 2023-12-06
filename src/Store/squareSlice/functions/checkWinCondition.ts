import isKingCanBeated from "./isKingCanBeated.ts"
import { idToPos } from "./toolFunction/id_posFunctions.ts";
import { contentInter, kingCanBeatedProps, stateIntarface } from "../Types/stateInterface.ts";

const checkWinCondition = (state: stateIntarface): void => {
    const isMoveExis: boolean = state.isMoveExist;
    if (!isMoveExis) {
        const kingProps: kingCanBeatedProps = {
            tableContent: { ...state.content },
            kingPos: idToPos(state.kingsId[String(state.figureTurn)]),
            kingSide: state.figureTurn,
        }

        if (isKingCanBeated(kingProps)) {
            state.whoWin = !state.figureTurn;
            return
        }
        else {
            state.whoWin = "draw";
            return
        }
    }

    if (checkDrawBecauseRepeat({ ...state.moveHistory })) {
        state.whoWin = "draw";
    }
}

const checkDrawBecauseRepeat = (moveHistory: Array<contentInter>): boolean => {
    const movesCount: number = Object.keys(moveHistory).length - 1;
    if (movesCount > 7) {
        const isLastMoveEqualToFoureMoveBefore: boolean =
            JSON.stringify(moveHistory[movesCount]) ===
            JSON.stringify(moveHistory[movesCount - 4])
        const isFoureMoveBeforeEqualToEightMoveBefore: boolean =
            JSON.stringify(moveHistory[movesCount - 4]) ===
            JSON.stringify(moveHistory[movesCount - 8])
        if (
            isLastMoveEqualToFoureMoveBefore &&
            isFoureMoveBeforeEqualToEightMoveBefore
        ) return true;
    }
    return false
}

export default checkWinCondition;