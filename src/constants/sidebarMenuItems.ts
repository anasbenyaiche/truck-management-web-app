import { Calendar, Home, Inbox, Search, Truck, User, Wrench, ClipboardList, CheckSquare, Package, DollarSign, Layers, FileText, TrendingUp, BarChart, Shield } from "lucide-react";

// Menu items with subitems
export const SIDEBAR_MENU_ITEMS = [
    {
        title: "Tableaux de Bord et Analyse",
        icon: BarChart,
        subItems: [
            { title: "Vue d’Ensemble de l'Activité", url: "/dashboard/activite", icon: BarChart },
            { title: "Analyse Financière", url: "/dashboard/financiere", icon: DollarSign },
            { title: "Rapports de Performance", url: "/dashboard/rapports", icon: TrendingUp },
            { title: "Gestion des Fournisseurs", url: "/dashboard/fournisseurs", icon: Shield }
        ]
    },
    {
        title: "Gestion des Camions et des Clients",
        icon: Home,
        subItems: [
            { title: "Enregistrement des Camions", url: "/gestion-camions/enregistrement", icon: Truck },
            { title: "Gestion des Clients", url: "/gestion-camions/clients", icon: User },
            { title: "Historique des Réparations", url: "/gestion-camions/reparations", icon: ClipboardList }
        ]
    },
    {
        title: "Gestion des Réparations",
        icon: Inbox,
        subItems: [
            { title: "Création d’Ordres de Réparation (OR)", url: "/gestion-reparations/orders", icon: Wrench },
            { title: "Suivi des Réparations", url: "/gestion-reparations/tracking", icon: CheckSquare },
            { title: "Pièces Requises et Main d'Œuvre", url: "/gestion-reparations/parts", icon: Package }
        ]
    },
    {
        title: "Gestion des Pièces Détachées",
        icon: Calendar,
        subItems: [
            { title: "Catalogue de Pièces", url: "/gestion-pieces/catalogue", icon: Layers },
            { title: "Suivi des Stocks", url: "/gestion-pieces/stocks", icon: ClipboardList },
            { title: "Approvisionnement des Pièces", url: "/gestion-pieces/approvisionnement", icon: Truck },
            { title: "Historique des Achats", url: "/gestion-pieces/achats", icon: FileText }
        ]
    },
    {
        title: "Facturation et Gestion des Coûts",
        icon: DollarSign,
        subItems: [
            { title: "Calcul des Coûts de Réparation", url: "/facturation/calcul-couts", icon: DollarSign },
            { title: "Gestion de la Facturation", url: "/facturation/gestion", icon: FileText },
            { title: "Gestion des Tarifs Variables", url: "/facturation/tarifs", icon: TrendingUp }
        ]
    },
    {
        title: "Recherche Avancée",
        icon: Search,
        subItems: [
            { title: "Recherche Multi-Critères", url: "/recherche/multi-criteres", icon: Search },
            { title: "Filtres Avancés", url: "/recherche/filtres", icon: Layers },
            { title: "Historique et Autocomplétion", url: "/recherche/historique", icon: ClipboardList }
        ]
    }
];