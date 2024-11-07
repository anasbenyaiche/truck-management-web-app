import React, { useState } from "react";
import HistoryReparationForm from "./HistoryRepairForm";
import HistoryReparationTable from "./HistoryRepairTable";

// Sample repair history data
const initialRepairHistory = [
  {
    repairType: "Moteur",
    description: "Réparation moteur",
    date: new Date(),
    status: "Completed",
  },
  {
    repairType: "Pneu",
    description: "Changement de pneus",
    date: new Date(),
    status: "In Progress",
  },
];

const HistoryReparationManagement: React.FC = () => {
  const [repairHistory, setRepairHistory] = useState(initialRepairHistory);

  const handleSubmit = (data: any) => {
    setRepairHistory((prevHistory) => [...prevHistory, data]);
  };

  const handleEdit = (index: number) => {
    console.log("Edit repair at index:", index);
    // Implement your edit logic here
  };

  const handleDelete = (index: number) => {
    setRepairHistory((prevHistory) =>
      prevHistory.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-10">
      <HistoryReparationForm onSubmit={handleSubmit} />
      <HistoryReparationTable
        repairHistory={repairHistory}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HistoryReparationManagement;
