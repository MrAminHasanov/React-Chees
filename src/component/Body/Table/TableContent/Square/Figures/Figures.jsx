import ClassicFigures from "./ClassicFigures/ClassicFigures";
import PixelFigures from "./PixelFigures/PixelFigures";

const figuresSkins = {
    "Classic-Chess": (squareContent) => <ClassicFigures figureType={squareContent?.type} />,
    "Pixel-Chess": (squareContent) => <PixelFigures squareContent={squareContent} />
}

function Figures({ activeSkin, squareContent }) {
    return (
        figuresSkins[activeSkin](squareContent)
    )
}

export default Figures