import PlayerTimer from "./PlayerTimer/PlayerTimer";
import c from "./Timer.module.scss";
import { sides } from "../../../../Store/squareSlice/Types/constFigureNames.ts";

import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useActions } from '../../../../Hooks/useActions/useActions.js';

function Timer() {
    const isGameStarted = useSelector(state => state.squaresList.isGameStarted);
    const intervalLink = useRef();

    const { decrimnetTimerTime } = useActions()

    useEffect(() => {
        if (isGameStarted) {
            intervalLink.current = setInterval(() => decrimnetTimerTime(), 100)
        } else {
            clearInterval(intervalLink.current)
        }
    }, [isGameStarted, decrimnetTimerTime])

    return (
        <div className={c.component}>
            <PlayerTimer playerSide={sides.black} />
            <PlayerTimer playerSide={sides.white} />
        </div>
    )
}

export default Timer