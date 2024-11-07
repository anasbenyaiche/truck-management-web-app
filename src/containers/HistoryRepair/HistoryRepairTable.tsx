import React from "react";
import { Button } from "@/components/ui/button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

interface RepairHistory {
  repairType: string;
  description: string;
  date: Date;
  status: string;
}

interface HistoryReparationTableProps {
  repairHistory: RepairHistory[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const HistoryReparationTable: React.FC<HistoryReparationTableProps> = ({
  repairHistory,
  onEdit,
  onDelete,
}) => {
  // Column definitions for Ag-Grid
  const columns: ColDef<RepairHistory>[] = [
    {
      headerName: "Type de Réparation",
      field: "repairType",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date de Réparation",
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params: any) =>
        new Date(params.value).toLocaleDateString(),
    },
    { headerName: "Statut", field: "status", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(params.rowIndex)}
          >
            Modifier
          </Button>
          <Button
            size="sm"
            variant="outline"
            color="red"
            onClick={() => onDelete(params.rowIndex)}
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine mt-8"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={repairHistory}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={5}
        rowSelection="single"
      />
    </div>
  );
};

export default HistoryReparationTable;
