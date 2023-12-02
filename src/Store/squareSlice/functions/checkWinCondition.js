import isKingCanBeated from "./isKingCanBeated"
import { idToPos } from "./toolFunction/id_posFunctions";

const checkWinCondition = (state) => {
    const isMoveExis = state.isMoveExist;
    if (!isMoveExis) {
        const kingProps = {
            tableContent: { ...state.content },
            kingPos: idToPos(state.kingsId[state.figureTurn]),
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

    const moveHistory = { ...state.moveHistory };
    if (checkDrawBecauseRepeat(moveHistory)) {
        state.whoWin = "draw";
    }
}

const checkDrawBecauseRepeat = (moveHistory) => {
    const movesCount = Object.keys(moveHistory).length - 1;
    if (movesCount > 7) {
        const isLastMoveEqualToFoureMoveBefore =
            JSON.stringify(moveHistory[movesCount]) ===
            JSON.stringify(moveHistory[movesCount - 4])
        const isFoureMoveBeforeEqualToEightMoveBefore =
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