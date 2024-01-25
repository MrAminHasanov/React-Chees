import { useSelector } from "react-redux";

function Figures({ figureType, figureSide }) {
    const figureSvg = useSelector(state =>
        state.skinManagment.selectedSkin.figures[figureType][figureSide])
    const figureSize = useSelector(state =>
        state.skinManagment.selectedSkin.figureSize[figureType])

    return (
        figureSvg !== undefined &&
        (<img
            style={{
                userSelect: "none",
                width: figureSize.width,
                height: figureSize.height
            }}
            src={figureSvg} alt={figureType} />)
    )
}

export default Figures