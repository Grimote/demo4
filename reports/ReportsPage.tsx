"use client"

import {
  Plus,
  Download,
  DollarSign,
  FolderOpen,
  Package,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddReportDialog } from "./AddReportDialog"

export function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Centro de Reportes</h2>
          <p className="text-slate-600 mt-1">Generación y gestión de informes empresariales</p>
        </div>
        <AddReportDialog />
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Reportes Generados Recientemente</CardTitle>
          <CardDescription>
            Acceda a sus reportes más recientes o genere nuevos informes personalizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              {
                title: "Reporte Mensual de Ventas",
                period: "Julio 2025",
                generatedBy: "Juan Pérez",
                date: "2025-07-23",
              },
              {
                title: "Análisis de Costos de Proyecto X",
                period: "Construcción Fase 1",
                generatedBy: "Equipo de Finanzas",
                date: "2025-07-20",
              },
              {
                title: "Estado de Cuentas por Cobrar",
                period: "Semanal",
                generatedBy: "Contabilidad",
                date: "2025-07-19",
              },
            ].map((report, index) => (
              <Card key={index} className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{report.title}</h3>
                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <p>Período: {report.period}</p>
                    <p>Generado por: {report.generatedBy}</p>
                    <p className="text-xs text-slate-500">{report.date}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
              VER TODOS LOS REPORTES
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Reportes Financieros", icon: DollarSign, count: 23, color: "from-green-500 to-emerald-500" },
          { name: "Reportes de Proyectos", icon: FolderOpen, count: 18, color: "from-blue-500 to-indigo-500" },
          { name: "Reportes de Inventario", icon: Package, count: 15, color: "from-purple-500 to-pink-500" },
          { name: "Reportes de Proveedores", icon: Users, count: 12, color: "from-orange-500 to-red-500" },
        ].map((category, index) => {
          const Icon = category.icon
          return (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary">{category.count} reportes</Badge>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Ver Reportes
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
