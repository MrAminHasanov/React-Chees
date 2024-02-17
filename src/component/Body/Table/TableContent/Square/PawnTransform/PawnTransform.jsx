import c from "./PawnTransform.module.scss"
import { useSelector } from "react-redux"
import { useActions } from "../../../../../../Hooks/useActions/useActions.js"
import { squareSelectors } from "../../../../../../Store/squareSlice/squareSelectors.ts"

import Figures from "../Figures/Figures.jsx"
import { figuresName } from "../../../../../../Store/squareSlice/Types/constFigureNames.ts"
import { sides } from "../../../../../../Store/squareSlice/Types/constFigureNames.ts"

function PawnTransform({ squareId }) {
    const figureSide = useSelector(squareSelectors.figureSide);
    const { transformPawn } = useActions()

    return (
        <div className={c.component}>
            <div className={c.background}></div>
            {
                Object.values(figuresName).map((typeName, key) =>
                    (typeName !== "King" && typeName !== "Pawn") &&
                    <div
                        className={`${c.figure} ${c[typeName]}`}
                        onClick={() => transformPawn({ transformTo: `${sides.keyOf(figureSide)}${typeName}`, transformSquareId: squareId })}
                        key={key} >
                        <Figures figureType={typeName} figureSide={figureSide} />
                    </div>
                )
            }
        </div>
    )
}

export default PawnTransform