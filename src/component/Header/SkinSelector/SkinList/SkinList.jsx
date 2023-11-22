import c from './SkinList.module.scss'
import { useActions } from '../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';

function SkinList() {
    const activeSkin = useSelector(state => state.header.selectedSkin)
    const { setTableSkin } = useActions();

    return (
        <ul className={c.component}>
            <li className={activeSkin === "Pixel-Chess" ? c.activeLi : null}
                onClick={() => setTableSkin("Pixel-Chess")}
            >
                Pixel-Chess
            </li>
            <li className={activeSkin === "Classic-Chess" && c.activeLi}
                onClick={() => setTableSkin("Classic-Chess")}
            >
                Classic-Chess
            </li>
        </ul>
    )
}

export default SkinList