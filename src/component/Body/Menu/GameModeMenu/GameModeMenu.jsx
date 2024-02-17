import c from './GameModeMenu.module.scss'

function GameModeMenu({ setMenuPageNumber }) {
    const singlePlayHandleClick = () => setMenuPageNumber("timeMenu");
    return (
        <div className={c.component}>
            <button
                className={`${c.button} ${c.button__singlePlay}`}
                onClick={singlePlayHandleClick}>
                Single Play
            </button>
        </div>
    )
}

export default GameModeMenu