import classNames from 'classnames'
import c from './ClassicBishop.module.scss'

function ClassicBishop() {
  return (
    <div className={c.component}>
      <div className={c.top}>
        <div className={c.cap}></div>
      </div>
      <div className={c.topRounde}></div>
      <div className={c.body}>
        <div className={classNames(c.leftRounde, c.rounde)}></div>
        <div className={c.midle}></div>
        <div className={classNames(c.rightRounde, c.rounde)}></div>
      </div>
      <div className={c.bottomRounde}></div>
      <div className={c.bottom}></div>
    </div >
  )
}

export default ClassicBishop