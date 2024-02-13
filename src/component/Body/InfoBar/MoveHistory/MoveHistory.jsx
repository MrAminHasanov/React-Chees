import { useSelector } from 'react-redux'
import c from './MoveHistory.module.scss'
import Move from './Move/Move';

function MoveHistory() {
    const moveHistory = useSelector(state => state.squaresList.moveHistory);

    return (
        <div className={c.component}>
            {
                moveHistory.map((move, key) => <Move {...move} key={key} />)
            }
        </div>
    )
}

export default MoveHistory