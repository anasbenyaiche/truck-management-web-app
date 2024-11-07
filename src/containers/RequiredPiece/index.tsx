import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the structure of the part data
interface Part {
  name: string;
  quantity: number;
}

const RequiredPiece: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [partName, setPartName] = useState<string>("");
  const [partQuantity, setPartQuantity] = useState<number>(1);

  // Function to add a new part
  const addPart = () => {
    if (partName && partQuantity > 0) {
      setParts((prevParts) => [
        ...prevParts,
        { name: partName, quantity: partQuantity },
      ]);
      setPartName("");
      setPartQuantity(1); // Reset input fields
    }
  };

  // Function to remove a part
  const removePart = (index: number) => {
    setParts((prevParts) => prevParts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Pièces Requises</h2>

      {/* Part Input Form */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Nom de la pièce"
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="Quantité"
          value={partQuantity}
          onChange={(e) => setPartQuantity(Number(e.target.value))}
          className="w-24"
        />
        <Button
          onClick={addPart}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ajouter
        </Button>
      </div>

      {/* Parts List */}
      <div>
        <ul className="space-y-4">
          {parts.map((part, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {part.name} (x{part.quantity})
              </span>
              <Button
                onClick={() => removePart(index)}
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

export default RequiredPiece;
