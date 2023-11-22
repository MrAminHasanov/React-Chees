import classNames from 'classnames'
import c from './ClassicRook.module.scss'

function ClassicRook() {
  return (
    <div className={c.component} >
      <div className={c.top}>
        <div className={c.crown}>
          <div className={c.block}></div>
          <div className={c.block}></div>
        </div>
      </div >
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

export default ClassicRook