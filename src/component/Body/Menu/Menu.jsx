import { useEffect, useState } from 'react'
import c from './Menu.module.scss'
import GameModeMenu from './GameModeMenu/GameModeMenu';
import GameTimeMenu from './GameTimeMenu/GameTimeMenu';
import ResultInformation from './ResultInformation/ResultInformation';
import { useSelector } from 'react-redux';
import { squareSelectors } from '../../../Store/squareSlice/squareSelectors.ts';

function Menu() {
    const [menuPageNumber, setMenuPageNumber] = useState("mainMenu");
    const whoWin = useSelector(squareSelectors.whoWin);

    useEffect(() => {
        if (whoWin !== "undefined") {
            setMenuPageNumber("resultMenu")
        }
    }, [whoWin])

    const goToMainMenu = () => setMenuPageNumber("mainMenu")
    const menuContext = () => {
        switch (menuPageNumber) {
            case "mainMenu": return <GameModeMenu setMenuPageNumber={setMenuPageNumber} />
            case "timeMenu": return <GameTimeMenu goToMainMenu={goToMainMenu} />
            case "resultMenu": return <ResultInformation whoWin={whoWin} goToMainMenu={goToMainMenu} />
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