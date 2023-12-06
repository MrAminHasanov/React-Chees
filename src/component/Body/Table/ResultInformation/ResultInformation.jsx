import { useActions } from "../../../../Hooks/useActions/useActions";

import c from './ResultInformation.module.scss'

const result = {
  "true": "White Win",
  "false": "Black Win",
  "draw": "Game is draw"
}
function ResultInformation({ whoWin }) {
  const { restartGame } = useActions()

  return (
    <div className={c.component}>
      {
        result[whoWin]
      }
      <button onClick={restartGame}>restart</button>
    </div>
  )
}

export default ResultInformation