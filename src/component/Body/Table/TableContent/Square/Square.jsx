import classNames from 'classnames'
import { useActions } from '../../../../../Hooks/useActions/useActions';

import styles from './Square.module.scss'
import Pawn from './Figures/Pawn/Pawn'
import { useSelector } from 'react-redux';
import Knight from './Figures/Knight/Knight';
import Rook from './Figures/Rook/Rook';

function Square({ id, squeMathColor }) {
  const square = useSelector(state => state.squaresList.content[id]);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => state.squaresList.moveableSquares[id]);
  const isThisFigureSideTurn = useSelector(state => state.squaresList.figureTurn === square?.side);
  const { selectFigure, moveFigure } = useActions();

  const squeColor = squeMathColor === 0 ? styles.blackSquare : styles.whiteSquare;
  const isEmptySquare = square?.type === undefined;

  let squaeClassNames = classNames(styles.component, squeColor);
  let squareOnClick = () => "";

    if (isChoosedFigure) {
      squaeClassNames += " " + styles.choosedFigure
    }
    else if (isThisFigureSideTurn) {
      squareOnClick = () => selectFigure(id);
    }
    else {
      if (isEmptySquare) {
        if (isMoveableSquare)
          squaeClassNames += " " + styles.moveableSquare;
      }
      else {//this enemyFigure
        if (isMoveableSquare)
          squaeClassNames += " " + styles.takeableFigure;
      }
      squareOnClick = () => moveFigure(id);
    }

    const figureColor = ({ "--figureColor": square?.side === false ? "rgb(78, 78, 78)" : "white" })

    const figureSelector = () => {
      switch (square.type) {
        case "Pawn": {
          return <Pawn squeColor={squeColor} figureColor={figureColor} />
        }
        case "Knight": {
          return <Knight />
        }
        case "Rook": {
          return <Rook />
        }
        default:
          return "";
      }
    }
    return (
      <div id={id} className={squaeClassNames} >
        <div onClick={() => squareOnClick()} className={styles.figureContainer}>
          {
            figureSelector()
          }
        </div>
      </div>
    )
  }

  export default Square