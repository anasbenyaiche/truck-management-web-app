// PartsCatalogue.tsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColDef } from "ag-grid-community";

// Define the structure of the part catalogue data
interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

const mockPartsCatalogue: Part[] = [
  {
    id: "1",
    name: "Alternator",
    description: "12V Alternator",
    price: 150,
    stockQuantity: 50,
  },
  {
    id: "2",
    name: "Brake Pads",
    description: "High performance brake pads",
    price: 70,
    stockQuantity: 100,
  },
  {
    id: "3",
    name: "Headlight Bulb",
    description: "LED Headlight Bulb",
    price: 25,
    stockQuantity: 200,
  },
  {
    id: "4",
    name: "Timing Belt",
    description: "Timing belt for engine",
    price: 100,
    stockQuantity: 30,
  },
  {
    id: "5",
    name: "Oil Filter",
    description: "Engine oil filter",
    price: 15,
    stockQuantity: 150,
  },
];

const PartsCatalogue: React.FC = () => {
  const [parts, setParts] = useState<Part[]>(mockPartsCatalogue);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Column definitions for ag-Grid
  const columnDefs: ColDef<Part>[] = [
    {
      headerName: "Part Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Price (€)",
      field: "price",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params: any) => `€${params.value.toFixed(2)}`,
    },
    {
      headerName: "Stock Quantity",
      field: "stockQuantity",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          onClick={() => alert(`View details for part ${params.data.id}`)}
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
      const filteredParts = mockPartsCatalogue.filter(
        (part) =>
          part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          part.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setParts(filteredParts);
    } else {
      setParts(mockPartsCatalogue); // Reset to full list if no search term
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Parts Catalogue</h2>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by part name or description"
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

      {/* ag-Grid Table for Parts Catalogue */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={parts}
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

export default PartsCatalogue;
