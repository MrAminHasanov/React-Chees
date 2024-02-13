import squareStyle from "./Square.module.scss";

import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import PawnTransform from './PawnTransform/PawnTransform';

import Figures from './Figures/Figures';


function Square({ id, squareMathColor }) {
  const squareContent = useSelector(state => state.squaresList.content[id]);
  const chessTurn = useSelector(state => state.squaresList.figureTurn);
  const whoWin = useSelector(state => state.squaresList.whoWin);
  const isChoosedFigure = useSelector(state => state.squaresList.choosedFigureId === id);
  const isMoveableSquare = useSelector(state => !!state.squaresList.moveableSquares[id])
  const isThisFigureSideTurn = chessTurn === squareContent?.side;
  const needTransfromPawn = useSelector(state => state.squaresList.needTransformPawn)

  const squareColorOrder = squareMathColor === 0 ? "white" : "black";
  const squareSkin = useSelector(state => state.skinManagment.selectedSkin.squares[squareColorOrder]);
  const skinStyle = useSelector(state => state.skinManagment.selectedSkin.squareStyles)
  const emptySquareMoveBalsSkins = useSelector(state => state.skinManagment.selectedSkin.emptySquareMove)

  Object.entries(skinStyle).forEach(([styleKey, style]) => {
    squareStyle[styleKey] = style;
  })

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

  let squareImgUrl = {
    "--backgroundeImg": `url(${squareSkin})`,
  };

  let squareClassNames = classNames(
    squareStyle.component,
    squareColorOrder === "white"
      ? squareStyle.whiteSquare
      : squareStyle.blackSquare);
  let squareOnClick = () => { };

  if (!needTransfromPawn && whoWin === "undefined") {
    if (isThisFigureSideTurn) {
      draggableStates.draggable = true;
      draggableStates.onDragStart = () => selectFigure(id)
    }

    squareOnClick = () => selectFigure("notChosedFigure");

    if (isChoosedFigure) {
      squareClassNames += " " + squareStyle.choosedFigure;
    }
    else if (isThisFigureSideTurn) {
      squareOnClick = () => selectFigure(id);
    }
    else if (isMoveableSquare) {
      squareOnClick = () => moveFigure(id);
      draggableStates.onDrop = () => moveFigure(id);
      if (isEmptySquare) {
        squareClassNames += ` ` + squareStyle.moveableSquare;
        squareImgUrl["--moveBall"] = `url(${emptySquareMoveBalsSkins[chessTurn]})`;
      }
      else squareClassNames += " " + squareStyle.takeableFigure;
    }
  }

  return (
    <div id={id} className={squareClassNames}
      style={squareImgUrl}>
      <div
        onClick={() => squareOnClick()}
        className={squareStyle.figureContainer}
        {...draggableStates}>
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