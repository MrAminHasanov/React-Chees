import c from './SkinList.module.scss'
import { useActions } from '../../../../Hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import { skinManagmentSelectors } from '../../../../Store/skinManagmentSlice/skinManagmentSelectors.ts';

function SkinList() {
    const skinsList = useSelector(skinManagmentSelectors.skinsList)
    const selectedSkinKey = useSelector(skinManagmentSelectors.selectedSkinKey);
    const { setTableSkin } = useActions();

    return (
        <ul className={c.component}>
            {
                skinsList.map((skinName, key) => (
                    <li key={key} className={selectedSkinKey === skinName ? c.activeLi : null}
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