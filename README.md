The issue with the checkbox not staying checked and the GridApi not updating in the child component is likely related to how the state is managed and passed between the parent and child components.

To resolve this, you can make the following changes:

1. In the parent component, pass the `selectedRows` state as a prop to the child component.

2. In the child component, use the `selectedRows` prop to set the selected rows in the AG Grid using the `gridApi.setSelectedRows()` method.

Here's the updated code for both components:

```jsx
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
      <MyAgGridComponent
        onGridApiChange={handleGridApiChange}
        onSelectionChanged={handleSelectionChanged}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default ParentComponent;
```

```jsx
// MyAgGridComponent.js
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const MyAgGridComponent = ({ onGridApiChange, onSelectionChanged, selectedRows, ...props }) => {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    onGridApiChange(params.api);
  };

  const onSelectionChangedInternal = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    onSelectionChanged(selectedData);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setSelectedRows(selectedRows);
    }
  }, [gridApi, selectedRows]);

  // ...

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
        onSelectionChanged={onSelectionChangedInternal}
        // Other AG Grid props...
      />
    </div>
  );
};

export default MyAgGridComponent;
```

In the updated code:

1. The parent component passes the `selectedRows` state as a prop to the child component.

2. In the child component, the `useEffect` hook is used to set the selected rows in the AG Grid using `gridApi.setSelectedRows(selectedRows)` whenever the `gridApi` or `selectedRows` prop changes.

3. The `onSelectionChangedInternal` function is introduced in the child component to handle the selection change event internally. It retrieves the selected nodes, maps them to the selected data, and invokes the `onSelectionChanged` prop with the selected data.

With these changes, the checkbox should stay checked when a selection is made, and the GridApi should update accordingly in the child component.