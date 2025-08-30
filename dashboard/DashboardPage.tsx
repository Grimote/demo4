"use client"

import {
  Plus,
  Truck,
  AlertTriangle,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Users,
  DollarSign,
  Briefcase,
  CheckCircle,
  MessageCircle,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "./StatCard"
import { ServicesSection } from "./ServicesSection"
import { InventoryAlerts } from "./InventoryAlerts"
import { AddDashboardServiceDialog } from "./AddDashboardServiceDialog"

// Datos que originalmente estaban en page.tsx
const stats = [
  { title: "Ingresos Totales", value: "S/ 2,847,392", change: "+12.5%", icon: DollarSign, color: "text-emerald-600" },
  { title: "Servicios Activos", value: "89", change: "+15", icon: Briefcase, color: "text-blue-600" },
  { title: "Proveedores", value: "156", change: "+8", icon: Users, color: "text-purple-600" },
  { title: "Alertas de Stock", value: "12", change: "-3", icon: AlertTriangle, color: "text-orange-600" },
]

import {
  MapPin,
  Package,
  Warehouse,
  ShoppingCart,
  Route,
  Network,
} from "lucide-react"



export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard Ejecutivo</h2>
          <p className="text-slate-600 mt-1">Plataforma All in One - Gestión Integral Empresarial</p>
        </div>
        <AddDashboardServiceDialog />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Logistics Services Overview */}
      <ServicesSection />

      {/* Inventory Alerts */}
      <InventoryAlerts />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Rendimiento Financiero
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>Análisis de ingresos y gastos (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-600">Gráfico de rendimiento financiero</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Proyectos Activos</CardTitle>
            <CardDescription>Estado actual de proyectos en desarrollo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Construcción Torre Empresarial</h4>
                    <Badge variant="default">En Progreso</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                    <span>S/ 2,500,000</span>
                    <span>68% completado</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Sistema de Gestión Logística</h4>
                    <Badge variant="secondary">Planificación</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                    <span>S/ 850,000</span>
                    <span>25% completado</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Modernización de Infraestructura</h4>
                    <Badge variant="outline">Monitoreo</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                    <span>S/ 1,200,000</span>
                    <span>89% completado</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones y notificaciones del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-slate-50/50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Pago procesado exitosamente</p>
                <p className="text-sm text-slate-600">
                  Factura #2025-001 por S/ 45,000 a Constructora Moderna S.A.C.
                </p>
                <p className="text-xs text-slate-500 mt-1">Hace 15 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-slate-50/50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Nuevo proveedor registrado</p>
                <p className="text-sm text-slate-600">
                  Suministros Técnicos Avanzados E.I.R.L. ha sido añadido al sistema
                </p>
                <p className="text-xs text-slate-500 mt-1">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-slate-50/50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Contrato actualizado</p>
                <p className="text-sm text-slate-600">
                  Anexo 3 agregado al contrato del Proyecto Torre Empresarial
                </p>
                <p className="text-xs text-slate-500 mt-1">Ayer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
