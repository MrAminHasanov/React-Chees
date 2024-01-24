import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import PawnTransform from './PawnTransform/PawnTransform';

import Figures from './Figures/Figures';


function Square({ id, squareMathColor }) {
  const squareContent = useSelector(state => state.squaresList.content[id]);
  const chessTurn = useSelector(state => state.squaresList.figureTurn);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => !!state.squaresList.moveableSquares[id])
  const isThisFigureSideTurn = chessTurn === squareContent?.side;
  const needTransfromPawn = useSelector(state => state.squaresList.needTransformPawn)


  const squareColorOrder = squareMathColor === 0 ? "white" : "black";
  const squareSkin = useSelector(state => state.skinManagment.selectedSkin.squares[squareColorOrder]);
  const skinStyles = useSelector(state => state.skinManagment.selectedSkin.squareStyles)
  const emptySquareMoveBalsSkins = useSelector(state => state.skinManagment.selectedSkin.emptySquareMove)

  const { selectFigure, moveFigure } = useActions();

  const isEmptySquare = squareContent?.type === undefined;

  const draggableStates = {
    "draggable": false,
    "onDragOver": (e) => e.preventDefault(),
    "onDrop": (e) => {
      e.preventDefault()
      selectFigure("notChosedFigure")
    }
  };

  let moveSquareBall = "none";
  let squareClassNames = classNames(
    skinStyles.component,
    squareColorOrder === "white"
      ? skinStyles.whiteSquare
      : skinStyles.blackSquare);
  let squareOnClick;
  if (needTransfromPawn) {
    squareOnClick = () => { };
  } else {
    if (isThisFigureSideTurn) {
      draggableStates.draggable = true;
      draggableStates.onDragStart = () => selectFigure(id)
    }

    squareOnClick = () => selectFigure("notChosedFigure");

    if (isChoosedFigure) {
      squareClassNames += " " + skinStyles.choosedFigure;
    }
    else if (isThisFigureSideTurn) {
      squareOnClick = () => selectFigure(id);
    }
    else if (isMoveableSquare) {
      squareOnClick = () => moveFigure(id);
      draggableStates.onDrop = () => moveFigure(id);
      if (isEmptySquare) {
        squareClassNames += ` ` + skinStyles.moveableSquare
        moveSquareBall = emptySquareMoveBalsSkins[chessTurn]
      }
      else squareClassNames += " " + skinStyles.takeableFigure;
    }
  }
  return (
    <div id={id} className={squareClassNames}
      style={{
        "--backgroundeImg": `url(${squareSkin})`,
        "--moveBall": `url(${moveSquareBall})`
      }}
    >
      <div
        onClick={() => squareOnClick()}
        className={skinStyles.figureContainer}
        {...draggableStates}
      >
        {
          <Figures
            figureSide={squareContent.side}
            figureType={squareContent.type} />
        }
      </div>
      {
        id === needTransfromPawn &&
        <PawnTransform squareId={id} />
      }
    </div>
  )
}

export default Square