```
// MyAgGridComponent.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const MyAgGridComponent = ({ onGridApiChange, ...props }) => {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    onGridApiChange(params.api);
  };

  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    props.onSelectionChanged(selectedData);
  };

  // ...

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
        onSelectionChanged={onSelectionChanged}
        // Other AG Grid props...
      />
    </div>
  );
};
```
```
// ParentComponent.js
import React, { useEffect, useState } from 'react';
import MyAgGridComponent from './MyAgGridComponent';

const ParentComponent = () => {
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsValue, setSelectedRowsValue] = useState(0);
  const [approvalError, setApprovalError] = useState(false);

  const handleGridApiChange = (api) => {
    setGridApi(api);
  };

  const handleSelectionChanged = (selectedData) => {
    setSelectedRows(selectedData);

    const rejectedRows = selectedData.filter(row => row['STAT_IX'] === 'STATUS.REJECTED');
    const rejectedRowsCount = rejectedRows.length;
    setSelectedRowsValue(rejectedRowsCount);

    const hasApprovalError = selectedData.some(row => row['APRV_NM'] === null);
    setApprovalError(hasApprovalError);
  };

  useEffect(() => {
    console.log('Grid API:', gridApi);
    // Perform any necessary actions when the grid API changes
  }, [gridApi]);

  useEffect(() => {
    console.log('Selected Rows:', selectedRows);
    console.log('Selected Rows Value:', selectedRowsValue);
    console.log('Approval Error:', approvalError);
    // Perform any necessary actions when the selectedRows, selectedRowsValue, or approvalError change
  }, [selectedRows, selectedRowsValue, approvalError]);

  return (
    <div>
      <h1>Parent Component</h1>
      <MyAgGridComponent onGridApiChange={handleGridApiChange} onSelectionChanged={handleSelectionChanged} />
    </div>
  );
};

export default ParentComponent;
```

export default MyAgGridComponent;
