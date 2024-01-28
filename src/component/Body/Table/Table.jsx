import classNames from 'classnames'
import { useSelector } from 'react-redux';

import { sides } from '../../../Store/squareSlice/Types/constFigureNames.ts';
import c from './Table.module.scss'
import TableContent from './TableContent/TableContent'
import ResultInformation from "./ResultInformation/ResultInformation"
import PlayerTimer from './PlayerTimer/PlayerTimer';
import { useEffect, useRef } from 'react';
import { useActions } from '../../../Hooks/useActions/useActions.js';

function Table() {
  const tableBorders = useSelector(state => state.skinManagment.selectedSkin.table);
  const gameResult = useSelector(state => state.squaresList.whoWin);
  const isGameStarted = useSelector(state => state.squaresList.isGameStared);
  const intervalLink = useRef();
  const { decrimnetTimerTime } = useActions()

  useEffect(() => {
    if (isGameStarted) {
      intervalLink.current = setInterval(() => decrimnetTimerTime(), 1000)
    } else {
      clearInterval(intervalLink.current)
    }
  }, [isGameStarted, decrimnetTimerTime])

  return (
    <div className={c.component}>
      <div className={c.tableCorners}>
        <div className={classNames(c.corner, c.leftCorner)}></div>
        <div className={classNames(c.corner, c.rightCorner)}></div>
      </div>
      <div className={c.tableBorder} style={{ "--tableBorderSvg": `url(${tableBorders.border})` }}></div>
      <div className={c.secondTableBorder} style={{ "--tableOutlineSvg": `url(${tableBorders.outline})` }}></div>
      <TableContent />
      {
        gameResult !== "undefined" && <ResultInformation whoWin={gameResult} />
      }
      <PlayerTimer playerSide={sides.white} />
      <PlayerTimer playerSide={sides.black} />
    </div>
  )
}

export default Table