import c from './Move.module.scss'

function Move({ movedFigure, movedFromTo }) {
    return (
        <div className={c.component}>
            {`${movedFigure} ${movedFromTo}`}
        </div>
    )
}

export default Move