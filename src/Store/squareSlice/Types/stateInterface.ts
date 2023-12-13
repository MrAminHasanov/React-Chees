//#region state interfacs
export interface squareContentInter {
    side?: boolean,
    type?: string
}

export interface contentInter {
    [key: string]: squareContentInter
}

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

export interface stateIntarface {
    moveableSquares: moveableSquares,
    choosedFigureId: number | string,
    moveHistory: Array<contentInter>,
    isMoveExist: boolean,
    figureMove: figureMove,
    figureTurn: boolean,
    kingsId: kingsIdInter,
    content: contentInter,
    whoWin: string | boolean,
    castlingCondition: castlingCondition
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
}

export interface kingCanBeatedProps {
    tableContent: contentInter,
    kingSide: boolean,
    kingPos: pos
}
//#endregion