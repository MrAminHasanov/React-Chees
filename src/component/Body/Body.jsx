import c from "./Body.module.scss";
import Table from "./Table/Table";
import InfoBar from "./InfoBar/InfoBar";
import Menu from "./Menu/Menu";
import { useSelector } from "react-redux";
import { squareSelectors } from "../../Store/squareSlice/squareSelectors.ts";


function Body() {
  const isGameStarted = useSelector(squareSelectors.isGameStarted);

  return (
    <div className={c.component}>
      <Table />
      <InfoBar />
      {
        !isGameStarted && <Menu />
      }
    </div>
  );
};

export default Body;