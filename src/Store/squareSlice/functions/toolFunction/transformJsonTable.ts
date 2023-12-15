import { contentInter } from './../../Types/stateInterface';
import { figures } from "../../Types/constFigureNames.ts"

const transformJsonToTableContent = (json: { [figureName: string]: Array<number> }) => {
    const content: contentInter = new Array(64);

    Object.keys(figures).forEach((figureKey: string): void => {
        if (figureKey !== "emptySquare") {
            json[figureKey].forEach((squareId: number): void => {
                content[squareId] = figures[figureKey]
            })
        } else {
            for (let id: number = 0; id < 64; ++id) {
                if (!(id in content)) {
                    content[id] = figures.emptySquare
                }
            }
        }
    })

    return (content)
}

export default transformJsonToTableContent