import classNames from 'classnames'

import c from './Square.module.scss'
import Pawn from './Figures/Pawn/Pawn'
import { useMemo } from 'react';

function Square({ figure, id }) {
  const squeColor = useMemo(() => {
    const squeMathColor = (id + (Math.floor(id / 8) % 2)) % 2;
    return squeMathColor === 0 ? c.blackSquare : c.whiteSquare;
  }, [id])

  const squaeClassNames = classNames(c.component, squeColor);

  const figureColor = { "--figureColor": figure?.side === "black" ? "rgb(78, 78, 78)" : "white" };

  const figureSelector = () => {
    switch (figure.type) {
      case "Pawn":
        return <Pawn squeColor={squeColor} figureColor={figureColor} />
      default:
        return "";
    }
  }

  return (
    <div id={id} className={squaeClassNames}>
      {
        figureSelector()
      }
    </div>
  )
}

export default Square