import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';

import Figures from './Figures/Figures';


function Square({ id, squareMathColor }) {
  const squareContent = useSelector(state => state.squaresList.content[id]);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => !!state.squaresList.moveableSquares[id])
  const chessTurn = useSelector(state => state.squaresList.figureTurn);

  const isThisFigureSideTurn = chessTurn === squareContent?.side;
  const squareColorOrder = squareMathColor === 0 ? "white" : "black";
  const squareSkin = useSelector(state => state.skinManagment.selectedSkin.squares[squareColorOrder]);
  const skinStyles = useSelector(state => state.skinManagment.selectedSkin.styles)

  const { selectFigure, moveFigure } = useActions();

  const isEmptySquare = squareContent?.type === undefined;

  let squareClassNames = classNames(
    skinStyles.component ,
    squareColorOrder === "white"
      ? skinStyles.whiteSquare
      : skinStyles.blackSquare);

  let squareOnClick = () => moveFigure(id);

  if (isChoosedFigure) {
    squareClassNames += " " + skinStyles.choosedFigure;
    squareOnClick = () => "";
  }
  else if (isThisFigureSideTurn) {
    squareOnClick = () => selectFigure(id);
  }
  else if (isMoveableSquare) {
    if (isEmptySquare) {
      squareClassNames += " " + skinStyles.moveableSquare;
      const isWhiteFiguresTurn = chessTurn;
      if (isWhiteFiguresTurn) squareClassNames += " " + skinStyles.whiteFigureMoveableSquare;
      else squareClassNames += " " + skinStyles.blackFigureMoveableSquare;
    }
    else
      squareClassNames += " " + skinStyles.takeableFigure;
  }

  return (
    <div id={id} className={squareClassNames} >
      <img src={squareSkin} className={skinStyles.backgroundImg} alt={squareColorOrder} />
      <div onClick={() => squareOnClick()} className={skinStyles.figureContainer}>
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