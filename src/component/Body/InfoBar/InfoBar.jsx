import c from "./InfoBar.module.scss";
import Buttons from "./Buttons/Buttons";
import Timer from "./Timer/Timer";

function InfoBar() {
    return (
        <div className={`${c.component} infoBar`}>
            <Timer />
            <Buttons />
        </div>
    )
}

export default InfoBar