import classNames from 'classnames'

import c from './Table.module.scss'
import TableContent from './TableContent/TableContent'

function Table() {
  return (
    <div className={c.component}>
      <div className={c.tableCorners}>
        <div className={classNames(c.corner, c.leftCorner)}></div>
        <div className={classNames(c.corner, c.rightCorner)}></div>
      </div>
      <div className={c.tableBorder}></div>
      <div className={c.secondTableBorder}></div>
      <TableContent />
    </div>
  )
}

export default Table