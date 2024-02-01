import classNames from 'classnames'
import { useSelector } from 'react-redux';

import c from './Table.module.scss'
import TableContent from './TableContent/TableContent'
import ResultInformation from "./ResultInformation/ResultInformation"

function Table() {
  const tableBorders = useSelector(state => state.skinManagment.selectedSkin.table);
  const gameResult = useSelector(state => state.squaresList.whoWin);

  return (
    <div className={c.component}>
      <div className={c.tableCorners}>
        <div className={classNames(c.corner, c.leftCorner)}></div>
        <div className={classNames(c.corner, c.rightCorner)}></div>
      </div>
      <div className={c.tableBorder} style={{ "--tableBorderSvg": `url(${tableBorders.border})` }}></div>
      <div className={c.tableOutline} style={{ "--tableOutlineSvg": `url(${tableBorders.outline})` }}></div>
      <TableContent />
      {
        gameResult !== "undefined" && <ResultInformation whoWin={gameResult} />
      }
    </div>
  )
}

export default Table