export const squareSelectors = {
    "figureSide": state => state.squaresList.figureTurn,
    "squareContent": (state, id: number) => state.squaresList.content[id],

    "whoWin": state => state.squaresList.whoWin,
    "isChoosedFigure": (state, id: number) => state.squaresList.choosedFigureId === id,
    "isMoveableSquare": (state, id: number) => !!state.squaresList.moveableSquares[id],
    "needTransfromPawn": state => state.squaresList.needTransformPawn,
    "playerTime": (state, playerSide: string) => state.squaresList.playerTime[playerSide],
    "isTimerGoing": state => state.squaresList.isTimerGoing,
    "moveHistory": state => state.squaresList.moveHistory,
    "isGameContinues": state => state.squaresList.whoWin === "undefined",
    "isGameStarted": state => state.squaresList.isGameStarted,
    "gameTime": state => state.squaresList.gameTime,
    "timeAddictionForMove": state => state.squaresList.timeAddictionForMove
}