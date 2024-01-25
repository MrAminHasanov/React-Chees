import figuresSvg from "./figuresSvg/figuresSvg";
import squaresSvg from "./squaresSvg/squaresSvg";
import tableSvg from "./tableSvg/tableSvg";
import styles from "./styles.module.scss"
import emptyFigureMove from "./emptySquareMoveSvg/emptyFigureMove"
import figureSize from "./figureSize";

const rpgSkin = {
    table: tableSvg,
    squares: squaresSvg,
    figures: figuresSvg,
    squareStyles: styles,
    emptySquareMove: emptyFigureMove,
    figureSize: figureSize
}

export default rpgSkin