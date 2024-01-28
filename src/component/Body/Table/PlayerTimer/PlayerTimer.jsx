import { useSelector } from "react-redux"
import c from "./PlayerTimer.module.scss"
import { sides } from "../../../../Store/squareSlice/Types/constFigureNames.ts";


function PlayerTimer({ playerSide }) {
    const playerTime = new Date(useSelector(state => state.squaresList.playerTime[playerSide]));

    return (
        <div className={`${c.component} ${c[`${sides.keyOf(playerSide)}Timer`]}`}>
            {playerTime.getMinutes()}:{playerTime.getSeconds()}
        </div>
    )
}

export default PlayerTimer