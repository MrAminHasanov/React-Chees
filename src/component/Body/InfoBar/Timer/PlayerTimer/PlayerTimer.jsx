import { useSelector } from "react-redux"
import c from "./PlayerTimer.module.scss"
import { sides } from "../../../../../Store/squareSlice/Types/constFigureNames.ts";


function PlayerTimer({ playerSide }) {
    const figureTurn = useSelector(state => state.squaresList.figureTurn);
    const playerTime = new Date(useSelector(state => state.squaresList.playerTime[playerSide]));
    const playerSecond = playerTime.getSeconds();
    const playerMinutes = playerTime.getMinutes();
    const UITime = `${playerMinutes}:${playerSecond < 10 ? 0 : ""}${playerSecond}`

    return (
        <div
            className={`${c.component} ${c[`${sides.keyOf(playerSide)}Timer`]}`}
            style={{
                width: figureTurn === playerSide ? "100%" : `${UITime.length * 13 + 20}px`,
                "--colorShade": playerMinutes < 1 ? Math.floor(230 * (60 - playerSecond) / 60) : 0
            }}>
            <span>
                {UITime}
            </span>
        </div>
    )
}

export default PlayerTimer