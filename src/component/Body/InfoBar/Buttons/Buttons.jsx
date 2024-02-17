import c from "./Buttons.module.scss";
import backMoveImg from "../../../../img/infoBarButtons/resume-svgrepo-com.svg";
import surendImg from "../../../../img/infoBarButtons/flag-svgrepo-com.svg";
import pauseImg from "../../../../img/infoBarButtons/pause-alt-svgrepo-com.svg";
import resumeImg from "../../../../img/infoBarButtons/media-playback-start-svgrepo-com.svg";
import addTimeImg from "../../../../img/infoBarButtons/time-add-svgrepo-com.svg";

import { useActions } from "../../../../Hooks/useActions/useActions";
import { useSelector } from "react-redux";
import { squareSelectors } from "../../../../Store/squareSlice/squareSelectors.ts";

function Buttons() {
    const isTimerGoing = useSelector(squareSelectors.isTimerGoing);
    const isGameContinues = useSelector(squareSelectors.isGameContinues);
    const isGameStarted = useSelector(squareSelectors.isGameStarted);
    const { surend, addTime, prevMove, switchGameTimer } = useActions();

    const prevMoveHandleClick = isGameContinues && isGameStarted ? () => prevMove() : () => { };
    const switchGameTimerHandleClick = isGameContinues && isGameStarted ? () => switchGameTimer() : () => { };
    const addTimeHandleClick = isGameContinues && isGameStarted ? () => addTime() : () => { };
    const surendHandleClick = isGameContinues && isGameStarted ? () => surend() : () => { };
    return (
        <div className={c.component}>
            <button onClick={prevMoveHandleClick} className={c.button}>
                <img className={c.icon} src={backMoveImg} alt="backMove" />
            </button>
            <button onClick={switchGameTimerHandleClick} className={c.button}>
                <img className={c.icon} src={isTimerGoing ? pauseImg : resumeImg} alt="pause/resume" />
            </button>
            <button onClick={addTimeHandleClick} className={c.button}>
                <img className={c.icon} src={addTimeImg} alt="addTime" />
            </button>
            <button onClick={surendHandleClick} className={c.button}>
                <img className={c.icon} src={surendImg} alt="surendImg" />
            </button>
        </div>
    )
}

export default Buttons