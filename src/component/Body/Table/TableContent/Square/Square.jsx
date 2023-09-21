import classNames from 'classnames'
import { useActions } from '../../../../../Hooks/useActions/useActions';

import c from './Square.module.scss'
import Pawn from './Figures/Pawn/Pawn'
import { useSelector } from 'react-redux';

function Square({ id, squeMathColor }) {
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigure === id);
  const isMoveableSquare = useSelector(state => state.squaresList.moveableSquares[id]);
  const figure = useSelector(state => state.squaresList.content[id]);
  const isTurn = useSelector(state => state.squaresList.turn === figure?.side);

  const isEmptySquare = figure?.type === undefined;
  const isEnemyFigure = !isTurn && !isEmptySquare;

  const { selectFigure, moveFigure } = useActions();

  const squeColor = squeMathColor === 0 ? c.blackSquare : c.whiteSquare;
  const squaeClassNames = classNames(c.component, squeColor,
    isChoosedFigure && c.activeSquare,
    (isMoveableSquare && isEmptySquare) && c.potentialSquare,
    (isMoveableSquare && isEnemyFigure) && c.potentialFigureSquare)

  const squareOnClick = () => isTurn ? selectFigure(id) : moveFigure(id);

  const figureColor = ({ "--figureColor": figure?.side === false ? "rgb(78, 78, 78)" : "white" })

  const figureSelector = () => {
    switch (figure.type) {
      case "Pawn": {
        return <Pawn squeColor={squeColor} figureColor={figureColor} />
      }
      default:
        return "";
    }
  }
  return (
    <div id={id} className={squaeClassNames} >
      <div onClick={() => squareOnClick()} className={c.figureContainer}>
        {
          figureSelector()
        }
      </div>
    </div>
  )
}

export default Square