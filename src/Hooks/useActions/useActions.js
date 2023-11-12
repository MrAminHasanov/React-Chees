import { useMemo } from "react";                                    
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as squaresListActions } from "../../Store/square.slice"

const rootActions = {
    ...squaresListActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
