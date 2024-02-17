export const skinManagmentSelectors = {
    "skinsList": state => state.skinManagment.skinsList,
    "selectedSkinKey": state => state.skinManagment.selectedSkinKey,
    "selectedSkin": state => state.skinManagment.selectedSkin,
    "figureSvg": (state, figureType: string, figureSide: string) =>
        state.skinManagment.selectedSkin.figures[figureType][figureSide],
    "figureSize": (state, figureType: string) =>
        state.skinManagment.selectedSkin.figureSize[figureType],
    "squareSkin": (state, squareColorOrder: string) =>
        state.skinManagment.selectedSkin.squares[squareColorOrder],
    "skinStyle": state => state.skinManagment.selectedSkin.squareStyles,
    "emptySquareMoveBalsSkins": state => state.skinManagment.selectedSkin.emptySquareMove,
    "tableBorders": state => state.skinManagment.selectedSkin.table
}