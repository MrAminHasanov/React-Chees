import c from './TableContent.module.scss'
import Square from './Square/Square'
import { useSelector } from 'react-redux'
import { squaresList } from '../../../../Store/square.slice';

function TableContent() {
  const { moveableSquares, content: squeares, turn, choosedFigure } = useSelector(squaresList);

  return (
    <div className={c.component}>
      {
        Object.values(squeares).map((figure, i) => <Square id={i} key={i} figure={figure} turn={turn} moveableSquare={moveableSquares[i]} choosedFigure={choosedFigure} />)
      }
    </div>
  )
}

export default TableContent