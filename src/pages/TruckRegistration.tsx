import TruckForm from "@/containers/TruckForm";
import TruckList from "@/containers/TruckList";
import { Truck, TruckFormInputs } from "@/types/ITruck";
import React, { useState } from "react";

const TruckRegistration: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  const addTruck = (data: TruckFormInputs) => {
    const newTruck: Truck = { ...data, id: Math.random().toString() };
    setTrucks((prevTrucks) => [...prevTrucks, newTruck]);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4">Gestion des camions</h1>
      <TruckForm onSubmit={addTruck} />
      <br />
      <TruckList trucks={trucks} />
    </div>
  );
};

export default TruckRegistration;
