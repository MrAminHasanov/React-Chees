import c from "./Buttons.module.scss";
import backMoveImg from "../../../../img/infoBarButtons/resume-svgrepo-com.svg";
import surendImg from "../../../../img/infoBarButtons/flag-svgrepo-com.svg";
import pauseImg from "../../../../img/infoBarButtons/pause-alt-svgrepo-com.svg";
import resumeImg from "../../../../img/infoBarButtons/media-playback-start-svgrepo-com.svg";
import addTimeImg from "../../../../img/infoBarButtons/time-add-svgrepo-com.svg";
import { useActions } from "../../../../Hooks/useActions/useActions";
import { useSelector } from "react-redux";

function Buttons() {
    const isTimerGoing = useSelector(state => state.squaresList.isTimerGoing);
    const isGameContinues = useSelector(state => state.squaresList.whoWin === "undefined")
    const { surend, addTime, prevMove, switchGameTimer } = useActions();

    const prevMoveHandleClick = isGameContinues ? () => prevMove() : () => { };
    const switchGameTimerHandleClick = isGameContinues ? () => switchGameTimer() : () => { };
    const addTimeHandleClick = isGameContinues ? () => addTime() : () => { };
    const surendHandleClick = isGameContinues ? () => surend() : () => { };
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