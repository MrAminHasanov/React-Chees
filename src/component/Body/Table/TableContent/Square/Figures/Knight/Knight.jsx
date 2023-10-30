import c from './Knight.module.scss'

function Knight() {
    return (
        <div className={c.component}>
            <div className={c.head}>
                <div className={c.nose}></div>
                <div className={c.noseDown}></div>
                {/* <div className={c.mouthe}></div> */}
            </div>
            <div className={c.body}>
                {/* <div className={c.backgrounde}></div> */}
                <div className={c.rightRounde}></div>
                <div className={c.sheya}></div>
                <div className={c.leftRounde}></div>
            </div>
            <div className={c.bottomRounde}></div>
            <div className={c.bottom}></div>
        </div >)
}

export default Knight