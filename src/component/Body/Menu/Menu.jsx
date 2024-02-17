import { useState } from 'react'
import c from './Menu.module.scss'
import GameModeMenu from './GameModeMenu/GameModeMenu';
import GameTimeMenu from './GameTimeMenu/GameTimeMenu';

function Menu() {
    const [menuPageNumber, setMenuPageNumber] = useState(0);
    const menuContext = () => {
        switch (menuPageNumber) {
            case 0: return <GameModeMenu setMenuPageNumber={setMenuPageNumber} />
            case 1: return <GameTimeMenu setMenuPageNumber={setMenuPageNumber} />
            default: return
        }
    }

    return (
        <div className={c.component}>
            <div className={c.menu}>
                {
                    menuContext()
                }
            </div>
            <div className={c.menuBackgrounde}></div>
        </div>
    )
}

export default Menu