import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker"; // Import the custom DatePicker component

// Define schema for repair history validation
const repairHistorySchema = z.object({
  repairType: z
    .string()
    .min(1, { message: "Le type de réparation est requis." }),
  date: z.date(),
  description: z.string().min(1, { message: "La description est requise." }),
  status: z.enum(["Completed", "In Progress", "Pending"], {
    errorMap: () => ({ message: "Statut requis." }),
  }),
});

type RepairHistoryInputs = z.infer<typeof repairHistorySchema>;

interface HistoryReparationFormProps {
  onSubmit: (data: RepairHistoryInputs) => void;
}

const HistoryReparationForm: React.FC<HistoryReparationFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<RepairHistoryInputs>({
    resolver: zodResolver(repairHistorySchema),
    defaultValues: {
      repairType: "",
      date: new Date(),
      description: "",
      status: "Pending",
    },
  });

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">Ajouter une Réparation</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Repair Type */}
          <FormField
            control={form.control}
            name="repairType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de Réparation</FormLabel>
                <FormControl>
                  <Input placeholder="Type de réparation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repair Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col v-full">
                <FormLabel>Date de Réparation</FormLabel>
                <FormControl>
                  {/* DatePicker Integration */}
                  <DatePicker
                    selected={field.value}
                    // todo fin new date picker for
                    // @ts-ignore
                    onSelect={(date: Date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description de la réparation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <FormControl>
                  <Select
                    options={[
                      { value: "Completed", label: "Terminé" },
                      { value: "In Progress", label: "En cours" },
                      { value: "Pending", label: "En attente" },
                    ]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter l'Historique
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default HistoryReparationForm;
