import RepairOrderForm from "@/containers/RepairOrderForm";

const RepairOrders = () => {
  return (
    <div>
      <h1>Création d'ordre de réparation</h1>
      <RepairOrderForm onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default RepairOrders;
