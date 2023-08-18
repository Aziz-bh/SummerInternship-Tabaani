import { columnsDataComplex } from "./variables/columnsData";

import tableDataComplex from "./variables/tableDataComplex.json";
import ComplexTable from "./components/UsersProgress";

const UsersProgress = () => {
  return (
    <div>
      <ComplexTable
        // columnsData={columnsDataComplex}
        // tableData={tableDataComplex}
      />
    </div>
  );
};

export default UsersProgress;
