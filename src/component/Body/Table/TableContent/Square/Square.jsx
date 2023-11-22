import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import c from './Square.module.scss';

import Figures from './Figures/Figures';

function Square({ id, squareMathColor }) {
  const activeSkin = useSelector(state => state.header.selectedSkin)
  const squareContent = useSelector(state => state.squaresList.content[id]);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => !!state.squaresList.moveableSquares[id])
  const isThisFigureSideTurn = useSelector(state => state.squaresList.figureTurn === squareContent?.side);

  const { selectFigure, moveFigure } = useActions();

  const squareColor = (squareMathColor === 0 ? "#995252" : "#edeed1");

  const isEmptySquare = squareContent?.type === undefined;

  let squareClassNames = classNames(c.component);
  let squareOnClick = () => moveFigure(id);

  if (isChoosedFigure) {
    squareClassNames += " " + c.choosedFigure;
    squareOnClick = () => "";
  }
  else if (isThisFigureSideTurn) {
    squareOnClick = () => selectFigure(id);
  }
  else if (isMoveableSquare) {
    if (isEmptySquare)
      squareClassNames += " " + c.moveableSquare;
    else
      squareClassNames += " " + c.takeableFigure;
  }

  const figureColor = (squareContent?.side === false ? "rgb(78, 78, 78)" : "white")

  return (
    <div id={id} className={squareClassNames} style={{ "--squareColor": squareColor, "--figureColor": figureColor }} >
      <div onClick={() => squareOnClick()} className={c.figureContainer}>
        {
          <Figures activeSkin={activeSkin} squareContent={squareContent} />
        }
      </div>
    </div>
  )
}

export default Square