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

// Define schema for client data validation
const clientFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  email: z.string().email({ message: "Email invalide." }),
  phone: z
    .string()
    .min(10, { message: "Numéro de téléphone invalide." })
    .regex(/^[0-9]+$/, { message: "Doit être numérique." }),
  address: z.object({
    street: z.string().min(1, { message: "Rue requise." }),
    city: z.string().min(1, { message: "Ville requise." }),
    postalCode: z.string().min(5, { message: "Code postal requis." }),
    country: z.string().min(1, { message: "Pays requis." }),
  }),
  status: z.enum(["Active", "Inactive", "Pending"], {
    errorMap: () => ({ message: "Statut requis." }),
  }),
  notes: z.string().optional(),
});

// Infer form data types
type ClientFormInputs = z.infer<typeof clientFormSchema>;

interface ClientManagementFormProps {
  onSubmit: (data: ClientFormInputs) => void;
}

const ClientManagementForm: React.FC<ClientManagementFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<ClientFormInputs>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      status: "Active",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-lg mx-auto"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom complet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Adresse email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rue</FormLabel>
                <FormControl>
                  <Input placeholder="Rue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Ville" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Postal</FormLabel>
                <FormControl>
                  <Input placeholder="Code postal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="Pays" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Account Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut du Compte</FormLabel>
              <FormControl>
                {/*  //TODO correct Select */}
                <Select
                  options={[
                    { value: "Active", label: "Actif" },
                    { value: "Inactive", label: "Inactif" },
                    { value: "Pending", label: "En attente" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Remarques supplémentaires" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enregistrer le Client
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientManagementForm;
