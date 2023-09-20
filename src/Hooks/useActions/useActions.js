import { useMemo } from "react";                                    
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as squaresList } from "../../Store/square.slice"

const rootActions = {
    ...squaresList
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}