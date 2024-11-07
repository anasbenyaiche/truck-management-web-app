import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { format } from "date-fns";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

// Example repair order data (replace with real data from your API)
interface RepairOrder {
  id: string;
  client: string;
  repairType: string;
  date: Date;
  status: string;
  description: string;
}

const mockRepairOrders: RepairOrder[] = [
  {
    id: "1",
    client: "John Doe",
    repairType: "Engine Repair",
    date: new Date(),
    status: "In Progress",
    description: "Repair of engine parts.",
  },
  {
    id: "2",
    client: "Jane Smith",
    repairType: "Tire Replacement",
    date: new Date(),
    status: "Completed",
    description: "Replacing all four tires.",
  },
  {
    id: "3",
    client: "Jim Brown",
    repairType: "Brake Pads",
    date: new Date(),
    status: "Pending",
    description: "Replacing worn brake pads.",
  },
];

const RepairTrackingList: React.FC = () => {
  const [repairOrders, setRepairOrders] =
    useState<RepairOrder[]>(mockRepairOrders);
  const [filteredRepairOrders, setFilteredRepairOrders] =
    useState<RepairOrder[]>(mockRepairOrders);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Column definitions for ag-Grid
  const columnDefs: ColDef<RepairOrder>[] = [
    {
      headerName: "Client",
      field: "client",
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Type de Réparation",
      field: "repairType",
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Date de Réparation",
      field: "date",
      valueFormatter: (params) => format(new Date(params.value), "PPP"),
      sortable: true,
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Statut",
      field: "status",
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Description",
      field: "description",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params: { data: { id: any } }) => (
        <Button
          onClick={() => alert(`View details for order ${params.data.id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Voir Détails
        </Button>
      ),
      maxWidth: 150,
    },
  ];

  // Function to handle search and filtering
  const handleSearch = () => {
    let filtered = repairOrders;

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search term (client name or repair type)
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.repairType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRepairOrders(filtered);
  };

  // Effect to run filtering on status or search term change
  useEffect(() => {
    handleSearch();
  }, [statusFilter, searchTerm]);

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Suivi des Réparations</h2>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Rechercher par client ou type de réparation"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select
          options={[
            { value: "All", label: "Tous les Statuts" },
            { value: "In Progress", label: "En Cours" },
            { value: "Pending", label: "En Attente" },
            { value: "Completed", label: "Terminé" },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-48"
        />
        <Button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Rechercher
        </Button>
      </div>

      {/* Repair Orders Table using ag-Grid */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredRepairOrders}
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

export default RepairTrackingList;
