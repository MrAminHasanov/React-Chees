import { kingCanBeatedProps, moveInfo } from './../../Types/stateInterface';
import isKingCanBeated from "../isKingCanBeated.ts";
import { idToPos } from "./id_posFunctions.ts";
import { contentInter, pos, stateIntarface } from "../../Types/stateInterface.ts"

export const addFigureMove = (
    state: stateIntarface,
    figureId: number,
    moveInfo: moveInfo
): void => {
    if (moveInfo.canMoveTo === "squareNotExists") return

    const moveVariattion: kingCanBeatedProps = buildKingProps(state, figureId, moveInfo);
    if (!isKingCanBeated(moveVariattion)) {
        state.isMoveExist = true
        state.figureMove[figureId][moveInfo.canMoveTo] = moveInfo
    }
}

const buildKingProps =
    (
        state: stateIntarface,
        figureId: number,
        moveInfo: moveInfo,
    ): kingCanBeatedProps => {
        const moveVariattion: contentInter = { ...state.content };
        moveVariattion[moveInfo.canMoveTo] = state.content[figureId];
        moveVariattion[figureId] = {};

        if ("deleteFrom" in moveInfo) {
            const deletedFigureId: any = moveInfo.deleteFrom;
            moveVariattion[deletedFigureId] = {};
        }

        const kingPos: pos = "kingMove" in moveInfo
            ? idToPos(moveInfo.canMoveTo)
            : idToPos(state.kingsId[String(state.figureTurn)]);

        return {
            tableContent: moveVariattion,
            kingPos: kingPos,
            kingSide: state.figureTurn,
        }
    }

