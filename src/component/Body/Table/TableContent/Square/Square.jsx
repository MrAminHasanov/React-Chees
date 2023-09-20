import classNames from 'classnames'

import c from './Square.module.scss'
import Pawn from './Figures/Pawn/Pawn'
import { useMemo } from 'react';
import { useActions } from '../../../../../Hooks/useActions/useActions';

function Square({ figure, id, moveableSquare, turn, choosedFigure }) {
  const { selectFigure, moveFigure } = useActions()
  const squeColor = useMemo(() => {
    const squeMathColor = (id + (Math.floor(id / 8) % 2)) % 2;
    return squeMathColor === 0 ? c.blackSquare : c.whiteSquare;
  }, [id])
  console.log("square rerendered",id);

  const squaeClassNames = classNames(c.component, squeColor, choosedFigure === id && c.activeSquare);
  const figureColor = { "--figureColor": figure?.side === false ? "rgb(78, 78, 78)" : "white" };
  const squareOnClick = () => figure?.side === turn ? selectFigure(id) : moveFigure(id);


  const figureSelector = () => {
    switch (figure.type) {
      case "Pawn":
        return <Pawn squeColor={squeColor} figureColor={figureColor} />
      default:
        return "";
    }
  }

  return (
    <div id={id} className={squaeClassNames} onClick={() => squareOnClick()}>
      {
        figureSelector()
      }
    </div>
  )
}

export default Square