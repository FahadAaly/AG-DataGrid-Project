import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface Props<T> {
  rows: T[];
  columnDefs: ColDef<T>[];
}

export function GenericGrid<T>({ rows, columnDefs }: Props<T>) {
  return (
    <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
      <AgGridReact<T>
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, filter: true }}
      />
    </div>
  );
}
