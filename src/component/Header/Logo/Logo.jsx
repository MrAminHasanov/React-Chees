import c from "./Logo.module.scss"
import logoImg from "../../../img/logo.png"

function Logo() {
    return (
        <div className={c.component}>
            <img src={logoImg} alt="logo" />
        </div>
    )
}

export default Logo