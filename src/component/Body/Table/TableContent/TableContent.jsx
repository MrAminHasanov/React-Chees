import c from './TableContent.module.scss'
import Square from './Square/Square'

function TableContent() {
  const generateSquares = () => {
    const squares = []
    for (let i = 0; i < 64; i++) {
      const squeMathColor = (i + (Math.floor(i / 8) % 2)) % 2;
      squares.push(<Square id={i} key={i} squeMathColor={squeMathColor} />)
    }
    return squares
  }
  return (
    <div className={c.component}>
      {
        generateSquares()
      }
    </div>
  )
}

export default TableContent