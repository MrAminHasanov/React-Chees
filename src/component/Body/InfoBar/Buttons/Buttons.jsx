import c from "./Buttons.module.scss";
import backMoveImg from "../../../../img/infoBarButtons/resume-svgrepo-com.svg";
import surendImg from "../../../../img/infoBarButtons/flag-svgrepo-com.svg";
import pauseImg from "../../../../img/infoBarButtons/pause-alt-svgrepo-com.svg";
import resumeImg from "../../../../img/infoBarButtons/media-playback-start-svgrepo-com.svg";
import addTimeImg from "../../../../img/infoBarButtons/time-add-svgrepo-com.svg";
import { useActions } from "../../../../Hooks/useActions/useActions";
import { useSelector } from "react-redux";

function Buttons() {
    const isGameStarted = useSelector(state => state.squaresList.isGameStarted);
    const { surend, addTime, prevMove, pauseGame } = useActions();

    return (
        <div className={c.component}>
            <button onClick={() => prevMove()} className={c.button}>
                <img src={backMoveImg} alt="backMove" />
            </button>
            <button onClick={() => pauseGame()} className={c.button}>
                <img src={isGameStarted ? pauseImg : resumeImg} alt="pause/resume" />
            </button>
            <button onClick={() => addTime()} className={c.button}>
                <img src={addTimeImg} alt="addTime" />
            </button>
            <button onClick={() => surend()} className={c.button}>
                <img src={surendImg} alt="surendImg" />
            </button>
        </div>
    )
}

export default Buttons