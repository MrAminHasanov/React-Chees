import classNames from 'classnames'
import c from './Pawn.module.scss'

function Pawn({ squeColor, figureColor }) {
    return (
        <div className={c.component} style={figureColor}>
            <div className={c.top} ></div >
            <div className={c.topRounde}></div>
            <div className={c.body}>
                <div className={classNames(c.leftRounde, c.rounde, squeColor)}></div>
                <div className={c.midle}></div>
                <div className={classNames(c.rightRounde, c.rounde, squeColor)}></div>
            </div>
            <div className={c.bottomRounde}></div>
            <div className={c.bottom}></div>
        </div >
    )
}

export default Pawn