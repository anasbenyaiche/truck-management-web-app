import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the structure of the labor data
interface Labor {
  technician: string;
  hours: number;
}

const Labors: React.FC = () => {
  const [labor, setLabor] = useState<Labor[]>([]);
  const [technicianName, setTechnicianName] = useState<string>("");
  const [hoursWorked, setHoursWorked] = useState<number>(0);

  // Function to add labor information
  const addLabor = () => {
    if (technicianName && hoursWorked > 0) {
      setLabor((prevLabor) => [
        ...prevLabor,
        { technician: technicianName, hours: hoursWorked },
      ]);
      setTechnicianName("");
      setHoursWorked(0); // Reset input fields
    }
  };

  // Function to remove labor entry
  const removeLabor = (index: number) => {
    setLabor((prevLabor) => prevLabor.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Main d'Oeuvre</h2>

      {/* Labor Input Form */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Nom du technicien"
          value={technicianName}
          onChange={(e) => setTechnicianName(e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="Heures travaillées"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(Number(e.target.value))}
          className="w-24"
        />
        <Button
          onClick={addLabor}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ajouter
        </Button>
      </div>

      {/* Labor List */}
      <div>
        <ul className="space-y-4">
          {labor.map((entry, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {entry.technician} (x{entry.hours} heures)
              </span>
              <Button
                onClick={() => removeLabor(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Labors;
