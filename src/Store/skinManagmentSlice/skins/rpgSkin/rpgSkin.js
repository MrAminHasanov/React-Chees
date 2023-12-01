import rpgFiguresSvg from "./rpgFiguresSvg/rpgFiguresSvg";
import rpgSquaresSvg from "./rpgSquaresSvg/rpgSquaresSvg";
import rpgTableSvg from "./rpgTableSvg/rpgTableSvg";
import rpgStyles from "./rpgStyles.module.scss"
import rpgEmptyFigureMove from "./rpgEmptySquareMoveSvg/rpgEmptyFigureMove"

const rpgSkin = {
    table: rpgTableSvg,
    squares: rpgSquaresSvg,
    figures: rpgFiguresSvg,
    squareStyles: rpgStyles,
    emptySquareMove: rpgEmptyFigureMove
}

export default rpgSkin