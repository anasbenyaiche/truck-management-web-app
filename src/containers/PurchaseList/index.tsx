import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { format } from "date-fns";
import { ColDef } from "ag-grid-community";
import DateRangePicker from "@/components/ui/dateRangePicker";

// Define the structure of purchase history data
interface PurchaseHistoryItem {
  id: string;
  partName: string;
  purchaseDate: Date;
  quantity: number;
  unitCost: number;
  supplier: string;
  totalCost: number;
}

const mockPurchaseHistoryData: PurchaseHistoryItem[] = [
  {
    id: "1",
    partName: "Alternator",
    purchaseDate: new Date("2024-10-01"),
    quantity: 30,
    unitCost: 100,
    supplier: "AutoParts Supplier",
    totalCost: 3000,
  },
  {
    id: "2",
    partName: "Brake Pads",
    purchaseDate: new Date("2024-10-05"),
    quantity: 50,
    unitCost: 20,
    supplier: "BrakePro",
    totalCost: 1000,
  },
  {
    id: "3",
    partName: "Headlight Bulb",
    purchaseDate: new Date("2024-10-10"),
    quantity: 100,
    unitCost: 5,
    supplier: "Lighting Co.",
    totalCost: 500,
  },
  {
    id: "4",
    partName: "Timing Belt",
    purchaseDate: new Date("2024-10-15"),
    quantity: 200,
    unitCost: 25,
    supplier: "Belt Masters",
    totalCost: 5000,
  },
  {
    id: "5",
    partName: "Oil Filter",
    purchaseDate: new Date("2024-10-20"),
    quantity: 50,
    unitCost: 15,
    supplier: "OilParts",
    totalCost: 750,
  },
];

const PurchaseList: React.FC = () => {
  const [purchaseHistoryData, setPurchaseHistoryData] = useState<
    PurchaseHistoryItem[]
  >(mockPurchaseHistoryData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [supplierFilter, setSupplierFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  // Column definitions for ag-Grid
  const columnDefs: ColDef<PurchaseHistoryItem>[] = [
    {
      headerName: "Part Name",
      field: "partName",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Purchase Date",
      field: "purchaseDate",
      valueFormatter: (params: any) => format(new Date(params.value), "PPP"),
      sortable: true,
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Quantity",
      field: "quantity",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Unit Cost",
      field: "unitCost",
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
      headerName: "Total Cost",
      field: "totalCost",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
  ];

  // Filter the data based on search, supplier, and date range
  const handleFilter = () => {
    let filteredData = mockPurchaseHistoryData;

    // Search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (item) =>
          item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Supplier filter
    if (supplierFilter) {
      filteredData = filteredData.filter(
        (item) => item.supplier.toLowerCase() === supplierFilter.toLowerCase()
      );
    }

    // Date range filter
    if (dateRange && dateRange[0] && dateRange[1]) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.purchaseDate) >= new Date(dateRange[0]) &&
          new Date(item.purchaseDate) <= new Date(dateRange[1])
      );
    }

    setPurchaseHistoryData(filteredData);
  };

  // Compute the total cost of the filtered records
  const computeTotalCost = () => {
    return purchaseHistoryData
      .reduce((acc, item) => acc + item.totalCost, 0)
      .toFixed(2);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Historique des Achats</h2>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={handleFilter}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </Button>
      </div>

      {/* Total Cost */}
      <div className="text-lg font-medium text-right">
        <span>Total Cost: </span>
        <span className="text-xl font-semibold">{computeTotalCost()}€</span>
      </div>

      {/* ag-Grid Table for Purchase History */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={purchaseHistoryData}
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

export default PurchaseList;
