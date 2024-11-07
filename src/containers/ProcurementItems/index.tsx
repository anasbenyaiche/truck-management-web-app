// ProcurementList.tsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { format } from "date-fns";
import { ColDef } from "ag-grid-community";

// Define the structure of procurement data
interface ProcurementItem {
  id: string;
  name: string;
  currentStock: number;
  quantityToOrder: number;
  supplier: string;
  expectedDeliveryDate: Date;
}

const mockProcurementData: ProcurementItem[] = [
  {
    id: "1",
    name: "Alternator",
    currentStock: 50,
    quantityToOrder: 30,
    supplier: "AutoParts Supplier",
    expectedDeliveryDate: new Date("2024-12-01"),
  },
  {
    id: "2",
    name: "Brake Pads",
    currentStock: 100,
    quantityToOrder: 50,
    supplier: "BrakePro",
    expectedDeliveryDate: new Date("2024-11-15"),
  },
  {
    id: "3",
    name: "Headlight Bulb",
    currentStock: 10,
    quantityToOrder: 100,
    supplier: "Lighting Co.",
    expectedDeliveryDate: new Date("2024-11-20"),
  },
  {
    id: "4",
    name: "Timing Belt",
    currentStock: 0,
    quantityToOrder: 200,
    supplier: "Belt Masters",
    expectedDeliveryDate: new Date("2024-12-10"),
  },
  {
    id: "5",
    name: "Oil Filter",
    currentStock: 150,
    quantityToOrder: 50,
    supplier: "OilParts",
    expectedDeliveryDate: new Date("2024-11-25"),
  },
];

const ProcurementList: React.FC = () => {
  const [procurementData, setProcurementData] =
    useState<ProcurementItem[]>(mockProcurementData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Column definitions for ag-Grid
  const columnDefs: ColDef<ProcurementItem>[] = [
    {
      headerName: "Part Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Current Stock",
      field: "currentStock",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Quantity to Order",
      field: "quantityToOrder",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Supplier",
      field: "supplier",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Expected Delivery Date",
      field: "expectedDeliveryDate",
      valueFormatter: (params: any) => format(new Date(params.value), "PPP"),
      sortable: true,
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          onClick={() =>
            alert(`View procurement details for ${params.data.id}`)
          }
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          View Details
        </Button>
      ),
      maxWidth: 150,
    },
  ];

  // Function to handle search filter
  const handleSearch = () => {
    if (searchTerm) {
      const filteredProcurementData = mockProcurementData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProcurementData(filteredProcurementData);
    } else {
      setProcurementData(mockProcurementData); // Reset to full list if no search term
    }
  };

  // Function to add new procurement item
  const handleAddProcurement = () => {
    const newProcurement: ProcurementItem = {
      id: "6",
      name: "New Part",
      currentStock: 0,
      quantityToOrder: 50,
      supplier: "New Supplier",
      expectedDeliveryDate: new Date("2024-12-15"),
    };
    setProcurementData([...procurementData, newProcurement]);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Approvisionnement des Pièces</h2>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by part name or supplier"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </Button>
      </div>

      {/* Add Procurement Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleAddProcurement}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Procurement
        </Button>
      </div>

      {/* ag-Grid Table for Procurement Management */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={procurementData}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            resizable: true,
          }}
        />
      </div>
    </div>
  );
};

export default ProcurementList;
