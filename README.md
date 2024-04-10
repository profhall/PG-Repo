// MyAgGridComponent.js
```
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const MyAgGridComponent = forwardRef((props, ref) => {
  const gridRef = useRef();

  useImperativeHandle(ref, () => ({
    getCurrentValue: () => gridRef.current,
    onSelectionChanged: () => {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      props.onSelectionChanged(selectedData);
    },
  }));

  // ...

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        onSelectionChanged={() => gridRef.current.onSelectionChanged()}
        // Other AG Grid props...
      />
    </div>
  );
});

export default MyAgGridComponent;
```

```
// ParentComponent.js
import React, { useRef, useEffect, useState } from 'react';
import MyAgGridComponent from './MyAgGridComponent';

const ParentComponent = () => {
  const gridRef = useRef();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = (selectedData) => {
    setSelectedRows(selectedData);
  };

  useEffect(() => {
    console.log('Selected Rows:', selectedRows);
    // Perform any necessary actions when the selectedRows change
  }, [selectedRows]);

  return (
    <div>
      <h1>Parent Component</h1>
      <MyAgGridComponent ref={gridRef} onSelectionChanged={handleSelectionChanged} />
    </div>
  );
};

export default ParentComponent;
```

```
// ParentComponent.js
import React, { useRef, useEffect, useState } from 'react';
import MyAgGridComponent from './MyAgGridComponent';

const ParentComponent = () => {
  const gridRef = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsValue, setSelectedRowsValue] = useState(0);
  const [approvalError, setApprovalError] = useState(false);

  const handleSelectionChanged = (selectedData) => {
    setSelectedRows(selectedData);

    const rejectedRows = selectedData.filter(row => row['STAT_IX'] === 'STATUS.REJECTED');
    const rejectedRowsCount = rejectedRows.length;
    setSelectedRowsValue(rejectedRowsCount);

    const hasApprovalError = selectedData.some(row => row['APRV_NM'] === null);
    setApprovalError(hasApprovalError);
  };

  useEffect(() => {
    console.log('Selected Rows:', selectedRows);
    console.log('Selected Rows Value:', selectedRowsValue);
    console.log('Approval Error:', approvalError);
    // Perform any necessary actions when the selectedRows, selectedRowsValue, or approvalError change
  }, [selectedRows, selectedRowsValue, approvalError]);

  return (
    <div>
      <h1>Parent Component</h1>
      <MyAgGridComponent ref={gridRef} onSelectionChanged={handleSelectionChanged} />
    </div>
  );
};

export default ParentComponent;
```
