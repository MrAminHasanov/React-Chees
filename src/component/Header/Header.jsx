import c from "./Header.module.scss";
import Logo from "./Logo/Logo";
import SkinSelector from "./SkinSelector/SkinSelector";

function Header() {
  return (
    <div className={c.component}>
      <Logo />
      <SkinSelector />
    </div>);
}

export default Header;
