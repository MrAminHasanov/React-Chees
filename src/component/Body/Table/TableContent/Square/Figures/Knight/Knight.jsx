import c from './Knight.module.scss'

function Knight() {
    return (
        <div className={c.component}>
            <div className={c.neekLine}></div>
            <div className={c.head}></div>
            <div className={c.body}></div>
            <div className={c.bottomRounde}></div>
            <div className={c.bottom}></div>
        </div >
    )
}

export default Knight