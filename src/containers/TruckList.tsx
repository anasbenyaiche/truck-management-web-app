import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Truck } from "@/types/ITruck";
import { ColDef } from "ag-grid-community";

interface TruckListProps {
  trucks: Truck[];
}

const TruckList: React.FC<TruckListProps> = ({ trucks }) => {
  const columns: ColDef<Truck>[] = [
    { headerName: "License Plate", field: "licensePlate" },
    { headerName: "Model", field: "model" },
    { headerName: "Brand", field: "brand" },
    { headerName: "Year", field: "year" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={trucks} columnDefs={columns} />
    </div>
  );
};

export default TruckList;
