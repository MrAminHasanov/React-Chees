import PlayerTimer from "./PlayerTimer/PlayerTimer";
import c from "./Timer.module.scss";
import { sides } from "../../../../Store/squareSlice/Types/constFigureNames.ts";

import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useActions } from '../../../../Hooks/useActions/useActions.js';
import { squareSelectors } from "../../../../Store/squareSlice/squareSelectors.ts";

function Timer() {
    const isTimerGoing = useSelector(squareSelectors.isTimerGoing);
    const isGameStarted = useSelector(squareSelectors.isGameStarted);
    const whoWin = useSelector(squareSelectors.whoWin);

    const intervalLink = useRef();

    const { decrimnetTimerTime, setPlayerTime } = useActions()

    useEffect(() => {
        if (whoWin === "undefined" && isGameStarted) {
            setPlayerTime()
        }
    },
        [setPlayerTime, whoWin, isGameStarted])

    useEffect(() => {
        if (isTimerGoing) {
            intervalLink.current = setInterval(() => decrimnetTimerTime(), 100)
        } else {
            clearInterval(intervalLink.current)
        }
    }, [isTimerGoing, decrimnetTimerTime])

    return (
        <div className={c.component}>
            <PlayerTimer playerSide={sides.black} />
            <PlayerTimer playerSide={sides.white} />
        </div>
    )
}

export default Timer