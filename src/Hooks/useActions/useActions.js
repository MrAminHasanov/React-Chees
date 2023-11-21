import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as squaresListActions } from "../../Store/squareSlice/square.slice"
import { actions as headerActions } from "../../Store/headerSlice/header.slice";

const rootActions = {
    ...squaresListActions,
    ...headerActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
