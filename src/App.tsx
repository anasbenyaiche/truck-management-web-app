import './App.css'
import './global.css'
import Layout from './layout/layout'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CamionRegistration from './pages/CamionRegistration'
import ClientManagement from './pages/ClientManagement'
import RepairHistory from './pages/RepairHistory'
import RepairOrders from './pages/RepairOrders'
import RepairTracking from './pages/RepairTracking'
import PartsAndLabor from './pages/PartsAndLabor'
import Activity from './pages/Activity'
import Financial from './pages/Financial'
import Repports from './pages/Repports'
import Suppliers from './pages/Suppliers'
import CataloguePieces from './pages/CataloguePieces'
import StocksTracking from './pages/StocksTracking'
import SupplyPieces from './pages/SupplyPieces'
import PurchaseHistory from './pages/PurchaseHistory'
import CostCalculation from './pages/CostCalculation'
import ManagementBilling from './pages/ManagementBilling'
import ManagementRates from './pages/ManagementRates'
import MultiCriteriaSearch from './pages/MultiCriteriaSearch'
import AdvancedFilters from './pages/AdvancedFilters'
import HistoryAutocompletion from './pages/HistoryAutocompletion'

function App() {

  return (
    <>
    <Layout>
    <Routes>
          <Route path="/" element={<Dashboard />} />
           {/* Tableaux de Bord et Analyse */}
           <Route path="/dashboard/activite" element={<Activity />} />
          <Route path="/dashboard/financiere" element={<Financial />} />
          <Route path="/dashboard/rapports" element={<Repports />} />
          <Route path="/dashboard/fournisseurs" element={<Suppliers />} />

          {/* Gestion des Camions et des Clients */}
          <Route path="/gestion-camions/enregistrement" element={<CamionRegistration />} />
          <Route path="/gestion-camions/clients" element={<ClientManagement />} />
          <Route path="/gestion-camions/reparations" element={<RepairHistory />} />

          {/* Gestion des Réparations */}
          <Route path="/gestion-reparations/orders" element={<RepairOrders />} />
          <Route path="/gestion-reparations/tracking" element={<RepairTracking />} />
          <Route path="/gestion-reparations/parts" element={<PartsAndLabor />} />

          {/* Gestion des Pièces Détachées */}
          <Route path="/gestion-pieces/catalogue" element={<CataloguePieces />} />
          <Route path="/gestion-pieces/stocks" element={<StocksTracking />} />
          <Route path="/gestion-pieces/approvisionnement" element={<SupplyPieces />} />
          <Route path="/gestion-pieces/achats" element={<PurchaseHistory />} />

          {/* Facturation et Gestion des Coûts */}
          <Route path="/facturation/calcul-couts" element={<CostCalculation />} />
          <Route path="/facturation/gestion" element={<ManagementBilling />} />
          <Route path="/facturation/tarifs" element={<ManagementRates />} />

          {/* Recherche Intuitive et Avancée */}
          <Route path="/recherche/multi-criteres" element={<MultiCriteriaSearch />} />
          <Route path="/recherche/filtres" element={<AdvancedFilters />} />
          <Route path="/recherche/historique" element={<HistoryAutocompletion />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
