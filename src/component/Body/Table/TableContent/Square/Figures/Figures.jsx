import { useSelector } from "react-redux";
import { skinManagmentSelectors } from "../../../../../../Store/skinManagmentSlice/skinManagmentSelectors.ts";

function Figures({ figureType, figureSide }) {
    const figureSvg = useSelector(state =>
        skinManagmentSelectors.figureSvg(state, figureType, figureSide))
    const figureSize = useSelector(state =>
        skinManagmentSelectors.figureSize(state, figureType))

    return (
        figureSvg !== undefined &&
        (<img
            style={{
                userSelect: "none",
                height: figureSize,
            }}
            src={figureSvg} alt={figureType} />)
    )
}

export default Figures