"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { DashboardPage } from "@/components/dashboard/DashboardPage"
import { LogisticsPage } from "@/components/logistics/LogisticsPage"
import { InventoryPage } from "@/components/inventory/InventoryPage"
import { ProductsPage } from "@/components/products/ProductsPage"
import { SuppliersPage } from "@/components/suppliers/SuppliersPage"
import { ServicesPage } from "@/components/services/ServicesPage"
import { PurchasesPage } from "@/components/purchases/PurchasesPage"
import { ProjectsPage } from "@/components/projects/ProjectsPage"
import { ContractsPage } from "@/components/contracts/ContractsPage"
import { PaymentsPage } from "@/components/payments/PaymentsPage"
import { CommunicationPage } from "@/components/communication/CommunicationPage"
import { AreasPage } from "@/components/areas/AreasPage"
import { MonitoringPage } from "@/components/monitoring/MonitoringPage"
import { ReportsPage } from "@/components/reports/ReportsPage"
import { SupportPage } from "@/components/support/SupportPage"

const pageComponents: { [key: string]: React.ComponentType } = {
  dashboard: DashboardPage,
  logistics: LogisticsPage,
  inventory: InventoryPage,
  products: ProductsPage,
  suppliers: SuppliersPage,
  services: ServicesPage,
  purchases: PurchasesPage,
  projects: ProjectsPage,
  contracts: ContractsPage,
  payments: PaymentsPage,
  communication: CommunicationPage,
  areas: AreasPage,
  monitoring: MonitoringPage,
  reports: ReportsPage,
  support: SupportPage,
}

export default function CimalDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard")

  const ActivePageComponent = pageComponents[activeModule] || DashboardPage

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Header />
      <div className="flex">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 ml-72 p-8">
          <ActivePageComponent />
        </main>
      </div>
    </div>
  )
}
