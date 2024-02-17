import squareStyle from "./Square.module.scss";

import classNames from 'classnames';
import { useActions } from '../../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import PawnTransform from './PawnTransform/PawnTransform';
import { skinManagmentSelectors } from "../../../../../Store/skinManagmentSlice/skinManagmentSelectors.ts";

import Figures from './Figures/Figures';
import { squareSelectors } from "../../../../../Store/squareSlice/squareSelectors.ts";


function Square({ id, squareMathColor }) {
  const squareContent = useSelector(state => squareSelectors.squareContent(state, id));
  const chessTurn = useSelector(squareSelectors.figureSide);
  const whoWin = useSelector(squareSelectors.whoWin);
  const isChoosedFigure = useSelector(state => squareSelectors.isChoosedFigure(state, id));
  const isMoveableSquare = useSelector(state => squareSelectors.isMoveableSquare(state, id))
  const isThisFigureSideTurn = chessTurn === squareContent?.side;
  const needTransfromPawn = useSelector(squareSelectors.needTransfromPawn)

  const squareColorOrder = squareMathColor === 0 ? "white" : "black";

  const squareSkin = useSelector(state => skinManagmentSelectors.squareSkin(state, squareColorOrder));
  const skinStyle = useSelector(skinManagmentSelectors.skinStyle)
  const emptySquareMoveBalsSkins = useSelector(skinManagmentSelectors.emptySquareMoveBalsSkins)

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