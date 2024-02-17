import c from './GameTimeMenu.module.scss';
import prevPage from "../../../../img/prevPage.svg";
import { useState } from 'react';
import { useActions } from "../../../../Hooks/useActions/useActions"

function GameTimeMenu({ setMenuPageNumber }) {
    const prevPageHandleClick = () => setMenuPageNumber(0);
    const { setGameTime, setTimeAddictionForMove, setGameStarting } = useActions()

    const [inputGameTime, setInputGameTime] = useState("10:00");
    const [inputTimeAddictionForMove, setInputTimeAddictionForMove] = useState(0);

    const onSubmite = (e) => {
        e.preventDefault();
        setGameTime(inputGameTime);
        setTimeAddictionForMove(inputTimeAddictionForMove);
        setGameStarting(true)
    }

    const onGameTimeChange = (e) => {
        const splitedTime = e.target.value.split(":");
        let minutes = Number(splitedTime[0]);
        let seconds = Number(splitedTime[1]);

        if (
            minutes < 61 &&
            seconds < 61
        ) {
            if (seconds < 30 && minutes === 0) {
                seconds = 30
            }

            if (minutes < 1 && seconds === 0) {
                minutes = 1
            }

            setInputGameTime(`${minutes}:${seconds}`)
        }
    };

    const onGameAddTimeChange = (e) => {
        const seconds = Number(e.target.value);
        if (seconds < 61) {
            setInputTimeAddictionForMove(seconds)
        }
    };

    return (
        <div className={c.component}>
            <button className={c.prevButton} onClick={prevPageHandleClick}>
                <img src={prevPage} alt='prevPageIcon' className={c.icon}></img>
            </button>
            <form className={c.timeForm}>
                <div className={c.inputBox}>
                    <label htmlFor={'gameTimeInput'}>Set play time</label>
                    <input
                        value={`${inputGameTime}`}
                        onChange={onGameTimeChange}
                        id='gameTimeInput'
                        placeholder='10:00'
                        type='type'
                        maxLength={5} />
                </div>
                <div className={c.inputBox}>
                    <label htmlFor={'gameAddTimeInput'}>Set move add time</label>
                    <input
                        value={inputTimeAddictionForMove}
                        onChange={onGameAddTimeChange}
                        placeholder='0'
                        id='gameAddTimeInput'
                        type='number'
                        max={60} min={0}
                    />
                </div>
                <button
                    onClick={onSubmite}
                    className={c.confirmButton} type='submit'>Confirm</button>
            </form>
        </div>
    )
}

export default GameTimeMenu    