import { useSelector } from "react-redux";

function Figures({ figureType, figureSide }) {
    const figureSvg = useSelector(state =>
        state.skinManagment.selectedSkin.figures[figureType][figureSide])

    return (
        figureSvg !== undefined &&
        (<img style={{ userSelect: "none" }} src={figureSvg} alt={figureType} />)
    )
}

export default Figures