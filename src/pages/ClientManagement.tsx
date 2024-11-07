import ClientManagementForm from "@/containers/ClientManagementForm";
import ClientList from "@/containers/ClientManagementForm/ClientList";

const ClientManagement = () => {
  return (
    <div>
      <h1>Gestion des clients</h1>
      <ClientManagementForm onSubmit={(data) => console.log(data)} />
      <ClientList />
    </div>
  );
};

export default ClientManagement;
