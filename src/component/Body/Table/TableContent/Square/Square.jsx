import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';

import styles from './Square.module.scss';
import Pawn from './Figures/Pawn/Pawn';
import Knight from './Figures/Knight/Knight';
import Rook from './Figures/Rook/Rook';
import Bishop from './Figures/Bishop/Bishop';
import Queen from "./Figures/Queen/Queen";
import King from './Figures/King/King';
const figures = {
  "Pawn": <Pawn />,
  "Knight": <Knight />,
  "Rook": <Rook />,
  "Bishop": <Bishop />,
  "Queen": <Queen />,
  "King": <King />,
}

function Square({ id, squareMathColor }) {
  const square = useSelector(state => state.squaresList.content[id]);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => state.squaresList.moveableSquares[id]);
  const isThisFigureSideTurn = useSelector(state => state.squaresList.figureTurn === square?.side);
  const { selectFigure, moveFigure } = useActions();
  const squareContent = figures[square.type];

  const squareColor = (squareMathColor === 0 ? "#995252" : "#edeed1");
  const isEmptySquare = square?.type === undefined;

  let squareClassNames = classNames(styles.component);
  let squareOnClick = () => "";

  if (isChoosedFigure) {
    squareClassNames += " " + styles.choosedFigure
  }
  else if (isThisFigureSideTurn) {
    squareOnClick = () => selectFigure(id);
  }
  else {
    if (isEmptySquare) {
      if (isMoveableSquare)
        squareClassNames += " " + styles.moveableSquare;
    }
    else {
      //this enemyFigure
      if (isMoveableSquare)
        squareClassNames += " " + styles.takeableFigure;
    }
    squareOnClick = () => moveFigure(id);
  }

  const figureColor = (square?.side === false ? "rgb(78, 78, 78)" : "white")

  return (
    <div id={id} className={squareClassNames} style={{ "--squareColor": squareColor, "--figureColor": figureColor }} >
      <div onClick={() => squareOnClick()} className={styles.figureContainer}>
        {
          squareContent
        }
      </div>
    </div>
  )
}

export default Square