import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    // Fetch client data (replace with actual API call)
    fetchClients();
  }, []);

  const fetchClients = async () => {
    // Example static data (replace with real API data)
    const data = [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        status: "Active",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        status: "Inactive",
      },
      // Add more client data as needed
    ];
    setClients(data);
  };

  const handleEditClient = (client: any) => {
    // Handle editing a client (e.g., navigate to edit form or open a modal)
    console.log("Edit client", client);
  };

  const handleDeleteClient = (client: any) => {
    // Handle deleting a client (e.g., confirm deletion and then remove)
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      setClients((prevClients) =>
        prevClients.filter((item) => item.name !== client.name)
      );
    }
  };
  // Define the column structure for the table
  const columns = [
    { headerName: "Nom", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Téléphone", field: "phone", sortable: true, filter: true },
    { headerName: "Statut", field: "status", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params: any) => (
        <div>
          <Button
            onClick={() => handleEditClient(params.data)}
            className="mr-2 bg-blue-600 text-white"
          >
            Modifier
          </Button>
          <Button
            onClick={() => handleDeleteClient(params.data)}
            className="bg-red-600 text-white"
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Liste des Clients</h2>

      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={clients}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default ClientList;
