//#region state interfacs
export interface squareContentInter {
    side?: boolean,
    type?: string
}

export type contentInter = Array<squareContentInter>


export interface kingsIdInter {
    [kingSide: string]: number,
}

interface moveableSquares {
    [squareId: string]: moveInfo
}

interface figureMove {
    [figureId: string]: moveableSquares
}

interface castlingCondition {
    [kingSide: string]: {
        "isKingMove": boolean,
        "isLeftRookMove": boolean,
        "isRightRookMove": boolean
    }
}

export interface move {
    movedFigure: string,
    movedFromTo: string
}

export interface stateIntarface {
    content: contentInter,
    moveableSquares: moveableSquares,
    figureMove: figureMove,

    choosedFigureId: number | string,
    figureTurn: boolean,

    gameTime: string,
    timeAddictionForMove: number,
    playerTime: {
        [playerSide: string]: number,
    },

    moveHistory: Array<move>,
    contentHistory: Array<contentInter>,

    isMoveExist: boolean,
    whoWin: string | boolean,
    isTimerGoing: boolean,
    needTransformPawn: boolean | number,
    isGameStarted: boolean

    kingsId: kingsIdInter,
    castlingCondition: castlingCondition,
}

// #endregion

//#region gobal interfacs
export interface pos {
    x: number,
    y: number
}
//#endregion

//#region updateFigureMove interfaces
export interface choosedFigureForUpdateMove {
    side: boolean,
    type: string,
    pos: {
        x: number,
        y: number
    }
}

export interface figureMoveProps {
    state: stateIntarface,
    choosedFigure: choosedFigureForUpdateMove,
    id: number,
    contents: contentInter
}
//#endregion

//#region addFigures interfaces
export interface moveInfo {
    "deleteFrom"?: number,
    "changedKingSide"?: boolean,
    "alsoMoveTo"?: {
        from: number,
        to: number
    },
    "kingMove"?: boolean,
    "leftRookMove"?: boolean,
    "rightRookMove"?: boolean,
    "canMoveTo": number | string,
    "pawnTransformEvent"?: boolean,
    "figure": string,
}

export interface kingCanBeatedProps {
    tableContent: contentInter,
    kingSide: boolean,
    kingPos: pos
}
//#endregion