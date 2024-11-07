import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DatePicker } from "@/components/ui/datepicker";

// Define schema for Repair Order validation
const repairOrderSchema = z.object({
  client: z.string().min(1, { message: "Client est requis." }),
  repairType: z
    .string()
    .min(1, { message: "Le type de réparation est requis." }),
  date: z.date(),
  description: z.string().min(1, { message: "La description est requise." }),
  status: z.enum(["In Progress", "Pending", "Completed"], {
    errorMap: () => ({ message: "Statut requis." }),
  }),
});

type RepairOrderInputs = z.infer<typeof repairOrderSchema>;

interface RepairOrderFormProps {
  onSubmit: (data: RepairOrderInputs) => void;
}

const RepairOrderForm: React.FC<RepairOrderFormProps> = ({ onSubmit }) => {
  const form = useForm<RepairOrderInputs>({
    resolver: zodResolver(repairOrderSchema),
    defaultValues: {
      client: "",
      repairType: "",
      date: new Date(),
      description: "",
      status: "Pending",
    },
  });

  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    // Example static data (replace with real API data)
    const data = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      // Add more clients
    ];
    setClients(data);
  };

  const handleClientSelection = (clientId: string) => {
    form.setValue("client", clientId);
  };

  const columns = [
    {
      headerName: "Nom du Client",
      field: "name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params: any) => (
        <Button
          onClick={() => handleClientSelection(params.data.id)}
          className="bg-blue-600 text-white"
        >
          Sélectionner
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">Créer un Ordre de Réparation</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Client Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Client</label>
          <div
            className="ag-theme-alpine"
            style={{ height: "200px", width: "100%" }}
          >
            <AgGridReact
              columnDefs={columns}
              rowData={clients}
              pagination={true}
              paginationPageSize={5}
              domLayout="autoHeight"
            />
          </div>
        </div>

        {/* Repair Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            Type de Réparation
          </label>
          <Input
            {...form.register("repairType")}
            placeholder="Type de réparation"
          />
        </div>

        {/* Repair Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            Date de Réparation
          </label>
          <DatePicker {...form.register("date")} />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Description</label>
          <Textarea
            {...form.register("description")}
            placeholder="Description de la réparation"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Statut</label>
          <Select
            options={[
              { value: "In Progress", label: "En Cours" },
              { value: "Pending", label: "En Attente" },
              { value: "Completed", label: "Terminé" },
            ]}
            {...form.register("status")}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Créer l'Ordre de Réparation
        </Button>
      </form>
    </div>
  );
};

export default RepairOrderForm;
