import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

// Define the structure of repair cost data
interface RepairCostItem {
  partName: string;
  unitCost: number;
  quantity: number;
}

const mockRepairCostData: RepairCostItem[] = [
  { partName: "Brake Pads", unitCost: 80, quantity: 2 },
  { partName: "Alternator", unitCost: 150, quantity: 1 },
  { partName: "Timing Belt", unitCost: 100, quantity: 1 },
  { partName: "Oil Filter", unitCost: 20, quantity: 1 },
];

const CalculDesCoutsDeReparation: React.FC = () => {
  const [repairCostData, setRepairCostData] =
    useState<RepairCostItem[]>(mockRepairCostData);
  const [laborCost, setLaborCost] = useState<number>(200); // Example labor cost
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [partFilter, setPartFilter] = useState<string>("");

  // Calculate total cost (sum of parts cost and labor cost)
  const calculateTotalCost = () => {
    const partsTotal = repairCostData.reduce(
      (acc, item) => acc + item.unitCost * item.quantity,
      0
    );
    return (partsTotal + laborCost).toFixed(2);
  };

  // Calculate the total cost of parts
  const calculatePartsTotal = () => {
    return repairCostData
      .reduce((acc, item) => acc + item.unitCost * item.quantity, 0)
      .toFixed(2);
  };

  // Filter the repair data based on search term and part name
  const handleFilter = () => {
    let filteredData = mockRepairCostData;

    // Search filter for part name
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.partName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Part filter (dropdown)
    if (partFilter) {
      filteredData = filteredData.filter(
        (item) => item.partName.toLowerCase() === partFilter.toLowerCase()
      );
    }

    setRepairCostData(filteredData);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Calcul des Coûts de Réparation</h2>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by part name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select
          value={partFilter}
          onChange={(e) => setPartFilter(e.target.value)}
          className="w-60"
          placeholder="Filter by part"
        >
          <option value="">All Parts</option>
          <option value="Brake Pads">Brake Pads</option>
          <option value="Alternator">Alternator</option>
          <option value="Timing Belt">Timing Belt</option>
          <option value="Oil Filter">Oil Filter</option>
        </Select>
        <Button
          onClick={handleFilter}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </Button>
      </div>

      {/* Labor Cost */}
      <div className="mb-6">
        <Input
          type="number"
          value={laborCost}
          onChange={(e) => setLaborCost(Number(e.target.value))}
          placeholder="Labor Cost (€)"
          className="w-60"
        />
      </div>

      {/* Total Cost */}
      <div className="text-lg font-medium text-right">
        <span>Total Repair Cost: </span>
        <span className="text-xl font-semibold">{calculateTotalCost()}€</span>
      </div>

      {/* Parts Breakdown */}
      <div className="my-6">
        <h3 className="text-lg font-medium">Parts Breakdown</h3>
        <ul>
          {repairCostData.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.partName}</span>
              <span>{(item.unitCost * item.quantity).toFixed(2)}€</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="flex justify-between mt-6">
        <div>
          <span className="font-medium">Total Parts Cost:</span>
          <span className="ml-2">{calculatePartsTotal()}€</span>
        </div>
        <div>
          <span className="font-medium">Labor Cost:</span>
          <span className="ml-2">{laborCost}€</span>
        </div>
      </div>
    </div>
  );
};

export default CalculDesCoutsDeReparation;
