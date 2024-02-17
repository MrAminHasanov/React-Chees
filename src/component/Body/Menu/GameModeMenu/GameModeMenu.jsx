import c from './GameModeMenu.module.scss'

function GameModeMenu({ setMenuPageNumber }) {
    const singlePlayHandleClick = () => setMenuPageNumber(1);
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