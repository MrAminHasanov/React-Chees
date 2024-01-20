import { contentInter } from './../../Types/stateInterface';
import { figures } from "../../Types/constFigureNames.ts"

const transformJsonToTableContent = (contentList: { [figureName: string]: Array<number> }) => {
    const content: contentInter = [];
    for (let i = 0; i <= 63; ++i) {
        content.push(figures.emptySquare);
    }
    
    Object.entries(contentList).forEach(([figureName, figurePosArr]) => {
        figurePosArr.forEach((figurePos) => {
            content[figurePos] = figures[figureName];
        })
    });

    return (content)
}

export default transformJsonToTableContent