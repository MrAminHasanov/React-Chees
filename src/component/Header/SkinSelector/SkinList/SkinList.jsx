import c from './SkinList.module.scss'
import { useActions } from '../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';

function SkinList() {
    const skinsList = useSelector(state => state.skinManagment.skinsList)
    const activeSkin = useSelector(state => state.skinManagment.selectedSkinKey);
    const { setTableSkin } = useActions();

    return (
        <ul className={c.component}>
            {
                skinsList.map((skinName, key) => (
                    <li key={key} className={activeSkin === skinName ? c.activeLi : null}
                        onClick={() => setTableSkin(skinName)}
                    >
                        {skinName}
                    </li>
                ))
            }
        </ul>
    )
}

export default SkinList