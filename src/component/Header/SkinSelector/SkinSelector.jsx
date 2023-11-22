import { useState } from 'react';
import c from './SkinSelector.module.scss';
import SkinList from './SkinList/SkinList';

function SkinSelector() {
  const [listState, setListState] = useState(true);

  const toggleListState = () => setListState((state) => !state);

  return (
    <div className={c.component}>
      <span onClick={toggleListState} className={c.selector}>
        SkinSelector
      </span>

      {
        listState && <SkinList />
      }
    </div >
  )
}

export default SkinSelector