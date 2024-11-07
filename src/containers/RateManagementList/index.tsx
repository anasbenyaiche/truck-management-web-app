import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ColDef } from "ag-grid-community";

// Define the structure of variable pricing data
interface VariableTarif {
  id: string;
  partName: string;
  supplier: string;
  region: string;
  price: number;
  status: string; // Active, Inactive
  lastUpdated: Date;
}

const mockVariablePricingData: VariableTarif[] = [
  {
    id: "1",
    partName: "Alternator",
    supplier: "AutoParts Supplier",
    region: "EU",
    price: 150,
    status: "Active",
    lastUpdated: new Date("2024-10-01"),
  },
  {
    id: "2",
    partName: "Brake Pads",
    supplier: "BrakePro",
    region: "US",
    price: 30,
    status: "Inactive",
    lastUpdated: new Date("2024-10-05"),
  },
  {
    id: "3",
    partName: "Headlight Bulb",
    supplier: "Lighting Co.",
    region: "EU",
    price: 10,
    status: "Active",
    lastUpdated: new Date("2024-10-10"),
  },
  {
    id: "4",
    partName: "Timing Belt",
    supplier: "Belt Masters",
    region: "APAC",
    price: 70,
    status: "Inactive",
    lastUpdated: new Date("2024-10-15"),
  },
  {
    id: "5",
    partName: "Oil Filter",
    supplier: "OilParts",
    region: "EU",
    price: 15,
    status: "Active",
    lastUpdated: new Date("2024-10-20"),
  },
];

const RateManagementList: React.FC = () => {
  const [pricingData, setPricingData] = useState<VariableTarif[]>(
    mockVariablePricingData
  );
  const [supplierFilter, setSupplierFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Column definitions for ag-Grid
  const columnDefs: ColDef<VariableTarif>[] = [
    {
      headerName: "Part Name",
      field: "partName",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Supplier",
      field: "supplier",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Region",
      field: "region",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellEditor: "agNumericCellEditor", // Allows editing price directly in the grid
      valueFormatter: (params: any) => `${params.value.toFixed(2)}€`,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Last Updated",
      field: "lastUpdated",
      valueFormatter: (params: any) => format(new Date(params.value), "PPP"),
      sortable: true,
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => alert(`Editing price for ${params.data.partName}`)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Edit Price
          </Button>
          <Button
            onClick={() => alert(`Deleting ${params.data.partName}`)}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Filter the data based on search, supplier, and region filters
  const handleFilter = () => {
    let filteredData = mockVariablePricingData;

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

    // Region filter
    if (regionFilter) {
      filteredData = filteredData.filter(
        (item) => item.region.toLowerCase() === regionFilter.toLowerCase()
      );
    }

    setPricingData(filteredData);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Gestion des Tarifs Variables</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by part name or supplier"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="w-60"
          placeholder="Filter by supplier"
        >
          <option value="">All Suppliers</option>
          <option value="AutoParts Supplier">AutoParts Supplier</option>
          <option value="BrakePro">BrakePro</option>
          <option value="Lighting Co.">Lighting Co.</option>
          <option value="Belt Masters">Belt Masters</option>
          <option value="OilParts">OilParts</option>
        </Select>
        <Select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-60"
          placeholder="Filter by region"
        >
          <option value="">All Regions</option>
          <option value="EU">EU</option>
          <option value="US">US</option>
          <option value="APAC">APAC</option>
        </Select>
        <Button
          onClick={handleFilter}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </Button>
      </div>

      {/* ag-Grid Table for Variable Pricing */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={pricingData}
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

export default RateManagementList;
