import { useActions } from "../../../../Hooks/useActions/useActions";

import c from './ResultInformation.module.scss'

const result = {
  "true": "White Win",
  "false": "Black Win",
  "draw": "Game is draw"
}

function ResultInformation({ whoWin, goToMainMenu }) {
  const { restartGame, setGameStarting } = useActions()

  const handleClickRestart = () => {
    restartGame();
    setGameStarting(true);
  }

  return (
    <div className={c.component}>
      <span className={c.gameResult}>
        {
          result[whoWin]
        }
      </span>
      <button className={c.button} onClick={handleClickRestart}>restart</button>
      <button
        className={`${c.button} ${c.menuButton}`}
        onClick={goToMainMenu}
      >menu</button>
    </div>
  )
}

export default ResultInformation