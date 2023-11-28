import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import c from './Square.module.scss';

import Figures from './Figures/Figures';


function Square({ id, squareMathColor }) {
  const squareContent = useSelector(state => state.squaresList.content[id]);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => !!state.squaresList.moveableSquares[id])
  const isThisFigureSideTurn = useSelector(state => state.squaresList.figureTurn === squareContent?.side);
  // const test = useSelector(state => state.squaresList)

  const squareColorOrder = squareMathColor === 0 ? "white" : "black";
  const squareSkin = useSelector(state => state.skinManagment.selectedSkin.squares[squareColorOrder]);

  const { selectFigure, moveFigure } = useActions();

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

  return (
    <div id={id} className={squareClassNames} >
      <img src={squareSkin} className={c.backgroundImg} alt={squareColorOrder} />
      <div onClick={() => squareOnClick()} className={c.figureContainer}>
        {
          <Figures
            figureSide={squareContent.side}
            figureType={squareContent.type} />
        }
      </div>
    </div>
  )
}

export default Square