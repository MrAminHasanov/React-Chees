import classNames from 'classnames'
import { useCallback, useMemo } from 'react';
import { useActions } from '../../../../../Hooks/useActions/useActions';

import c from './Square.module.scss'
import Pawn from './Figures/Pawn/Pawn'

function Square({ figure, id, moveableSquare, turn, choosedFigure }) {
  const { selectFigure, moveFigure } = useActions()
  const squeColor = useMemo(() => {
    const squeMathColor = (id + (Math.floor(id / 8) % 2)) % 2;
    return squeMathColor === 0 ? c.blackSquare : c.whiteSquare;
  }, [id])
  
  const squaeClassNames = useMemo(() =>
    classNames(c.component, squeColor,
      choosedFigure === id && c.activeSquare,
      (moveableSquare && figure?.type === undefined) && c.potentialSquare),

    [squeColor, choosedFigure, id, moveableSquare, figure?.type]);

  const squareOnClick = useCallback(() =>
    figure?.side === turn ? selectFigure(id) : moveFigure(id),
    [figure.side, turn, id, moveFigure, selectFigure]);

  const figureColor = useMemo(() =>
    ({ "--figureColor": figure?.side === false ? "rgb(78, 78, 78)" : "white" }),
    [figure.side]);

  const figureSelector = useCallback(() => {
    switch (figure.type) {
      case "Pawn":
        return <Pawn squeColor={squeColor} figureColor={figureColor} />
      default:
        return "";
    }
  }, [figure, squeColor, figureColor])

  return (
    <div id={id} className={squaeClassNames} onClick={() => squareOnClick()}>
      {
        figureSelector()
      }
    </div>
  )
}

export default Square