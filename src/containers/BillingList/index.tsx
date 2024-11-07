import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import { format } from "date-fns";
import { ColDef } from "ag-grid-community";

// Define the structure of invoice data
interface Invoice {
  id: string;
  customerName: string;
  date: Date;
  totalAmount: number;
  status: string; // Pending, Paid, etc.
  downloadLink: string; // Mock link to download invoice
}

const mockInvoiceData: Invoice[] = [
  {
    id: "1",
    customerName: "John Doe",
    date: new Date("2024-10-01"),
    totalAmount: 150.5,
    status: "Paid",
    downloadLink: "/invoices/1.pdf",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: new Date("2024-10-05"),
    totalAmount: 230.75,
    status: "Pending",
    downloadLink: "/invoices/2.pdf",
  },
  {
    id: "3",
    customerName: "Robert Brown",
    date: new Date("2024-10-10"),
    totalAmount: 120.3,
    status: "Paid",
    downloadLink: "/invoices/3.pdf",
  },
  {
    id: "4",
    customerName: "Alice Green",
    date: new Date("2024-10-15"),
    totalAmount: 450.0,
    status: "Pending",
    downloadLink: "/invoices/4.pdf",
  },
  {
    id: "5",
    customerName: "Chris White",
    date: new Date("2024-10-20"),
    totalAmount: 99.99,
    status: "Paid",
    downloadLink: "/invoices/5.pdf",
  },
];

const BillingList: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>(mockInvoiceData);

  // Column definitions for ag-Grid
  const columnDefs: ColDef<Invoice>[] = [
    {
      headerName: "Customer Name",
      field: "customerName",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params: any) => format(new Date(params.value), "PPP"),
      sortable: true,
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Total Amount",
      field: "totalAmount",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params: any) => `${params.value.toFixed(2)}€`,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <Link
            to={`/facture/${params.data.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          <Button
            onClick={() => (window.location.href = params.data.downloadLink)}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Gestion de Facturation</h2>

      {/* ag-Grid Table for Invoice List */}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={invoiceData}
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

export default BillingList;
