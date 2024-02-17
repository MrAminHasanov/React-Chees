import { useSelector } from 'react-redux'
import c from './MoveHistory.module.scss'
import Move from './Move/Move';
import { squareSelectors } from '../../../../Store/squareSlice/squareSelectors.ts';

function MoveHistory() {
    const moveHistory = useSelector(squareSelectors.moveHistory);

    return (
        <div className={c.component}>
            {
                moveHistory.map((move, key) => <Move {...move} key={key} />)
            }
        </div>
    )
}

export default MoveHistory