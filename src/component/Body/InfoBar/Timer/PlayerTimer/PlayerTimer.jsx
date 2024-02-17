import { useSelector } from "react-redux"
import c from "./PlayerTimer.module.scss"
import { sides } from "../../../../../Store/squareSlice/Types/constFigureNames.ts";
import { squareSelectors } from "../../../../../Store/squareSlice/squareSelectors.ts";


function PlayerTimer({ playerSide }) {
    const figureTurn = useSelector(squareSelectors.figureSide);
    const playerTime = new Date(useSelector(state => squareSelectors.playerTime(state, playerSide)));
    const playerSecond = playerTime.getSeconds();
    const playerMinutes = playerTime.getMinutes();
    const UITime = `${playerMinutes}:${playerSecond < 10 ? 0 : ""}${playerSecond}`

    return (
        <div
            className={`${c.component} ${c[`${sides.keyOf(playerSide)}Timer`]}`}
            style={{
                width:
                    figureTurn === playerSide
                        ? "100%"
                        : `calc(${UITime.length} * var(--letterSize) + var(--timerPadding) * 2)`,
                "--colorShade": playerMinutes < 1 ? Math.floor(230 * (60 - playerSecond) / 60) : 0
            }}>
            <span>
                {UITime}
            </span>
        </div>
    )
}

export default PlayerTimer
