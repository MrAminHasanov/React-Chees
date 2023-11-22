import { figuresSvg } from "./pixelFiguresSvg/figuresSvg"
import c from "./PixelFigures.module.scss"

function PixelFigures({ squareContent }) {
    return (
        squareContent?.type !== undefined && (
            <img className={c.component}
                src={figuresSvg[squareContent.type][squareContent.side]}
                alt={squareContent.type}
                />
        )
    )
}

export default PixelFigures