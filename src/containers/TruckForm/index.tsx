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

// Schema for form validation
const truckFormSchema = z.object({
  licensePlate: z
    .string()
    .min(1, { message: "La plaque d'immatriculation est requise." }),
  model: z.string().min(1, { message: "Le modèle est requis." }),
  brand: z.string().min(1, { message: "La marque est requise." }),
  year: z
    .number({ invalid_type_error: "L'année doit être un nombre." })
    .int()
    .min(1900, { message: "L'année doit être valide." }),
});

type TruckFormInputs = z.infer<typeof truckFormSchema>;

interface TruckFormProps {
  onSubmit: (data: TruckFormInputs) => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ onSubmit }) => {
  const form = useForm<TruckFormInputs>({
    resolver: zodResolver(truckFormSchema),
    defaultValues: {
      licensePlate: "",
      model: "",
      brand: "",
      year: new Date().getFullYear(),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 bg-white shadow rounded"
      >
        {/* License Plate */}
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plaque d'Immatriculation</FormLabel>
              <FormControl>
                <Input placeholder="Plaque d'immatriculation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Model */}
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle</FormLabel>
              <FormControl>
                <Input placeholder="Modèle du camion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Brand */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marque</FormLabel>
              <FormControl>
                <Input placeholder="Marque du camion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Année de fabrication"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Enregistrer le Camion
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TruckForm;
