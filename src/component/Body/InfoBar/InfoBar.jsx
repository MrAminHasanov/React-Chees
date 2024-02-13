import c from "./InfoBar.module.scss";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";
import MoveHistory from "./MoveHistory/MoveHistory";

function InfoBar() {
    return (
        <div className={`${c.component} infoBar`}>
            <Timer />
            <Buttons />
            <MoveHistory />
        </div>
    )
}

export default InfoBar