import c from "./Body.module.scss";
import Table from "./Table/Table";
import InfoBar from "./InfoBar/InfoBar";


function Body() {
  return (
    <div className={c.component}>
      <Table />
      <InfoBar />
    </div>
  );
};

export default Body;