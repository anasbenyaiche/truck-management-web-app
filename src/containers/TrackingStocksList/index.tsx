// StockTrackingList.tsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColDef } from "ag-grid-community";

// Define the structure of the stock data
interface StockItem {
  id: string;
  name: string;
  stockQuantity: number;
  status: string; // In Stock, Low Stock, Out of Stock
}

const mockStockData: StockItem[] = [
  { id: "1", name: "Alternator", stockQuantity: 50, status: "In Stock" },
  { id: "2", name: "Brake Pads", stockQuantity: 100, status: "In Stock" },
  { id: "3", name: "Headlight Bulb", stockQuantity: 10, status: "Low Stock" },
  { id: "4", name: "Timing Belt", stockQuantity: 0, status: "Out of Stock" },
  { id: "5", name: "Oil Filter", stockQuantity: 150, status: "In Stock" },
];

const StockTrackingList: React.FC = () => {
  const [stockData, setStockData] = useState<StockItem[]>(mockStockData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Column definitions for ag-Grid
  const columnDefs: ColDef<StockItem>[] = [
    {
      headerName: "Part Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Stock Quantity",
      field: "stockQuantity",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: "agTextColumnFilter",
      cellStyle: (params: any) => {
        // Apply custom styles based on stock status
        if (params.value === "Low Stock") {
          return { backgroundColor: "#ffeb3b" }; // Yellow for low stock
        } else if (params.value === "Out of Stock") {
          return { backgroundColor: "#f44336", color: "white" }; // Red for out of stock
        }
        return null;
      },
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          onClick={() => alert(`View details for stock item ${params.data.id}`)}
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
      const filteredStockData = mockStockData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStockData(filteredStockData);
    } else {
      setStockData(mockStockData); // Reset to full list if no search term
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Suivi des Stocks</h2>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by part name or status"
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

      {/* ag-Grid Table for Stock Tracking */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={stockData}
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

export default StockTrackingList;
