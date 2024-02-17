import classNames from 'classnames'
import { useSelector } from 'react-redux';

import c from './Table.module.scss'
import TableContent from './TableContent/TableContent'
import { skinManagmentSelectors } from '../../../Store/skinManagmentSlice/skinManagmentSelectors.ts';

const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
const worlds = ["a", "b", "c", "d", "e", "f", "g", "h"];

function Table() {
  const tableBorders = useSelector(skinManagmentSelectors.tableBorders);

  return (
    <div className={c.component}>
      <div className={c.tableCorners}>
        <div className={classNames(c.corner, c.leftCorner)}></div>
        <div className={classNames(c.corner, c.rightCorner)}></div>
      </div>
      <div className={c.tableBorder} style={{ "--tableBorderSvg": `url(${tableBorders.border})` }}></div>
      <div className={c.tableOutline} style={{ "--tableOutlineSvg": `url(${tableBorders.outline})` }}></div>
      <div className={c.tableCordinats}>
        <div className={c.cordinatNumbers}>
          {
            numbers.map((number, key) =>
              <span key={key} className={c.number}>{number}</span>)
          }
        </div>
        <div className={c.cordinatLetters}>
          {
            worlds.map((world, key) =>
              <span key={key} className={c.world}>{world}</span>)
          }
        </div>
      </div>
      <TableContent />
    </div>
  )
}

export default Table