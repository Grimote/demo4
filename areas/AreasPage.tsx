"use client"

import {
  Plus,
  Target,
  Users,
  Activity,
  Calculator,
  Monitor,
  Shield,
  Edit,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddAreaDialog } from "./AddAreaDialog"

const internalAreas = [
  {
    name: "CEO",
    description: "Define estrategias, toma decisiones y supervisa el funcionamiento general",
    icon: Target,
    staff: 1,
  },
  {
    name: "Recursos Humanos",
    description: "Gestiona la contratación, capacitación y bienestar del personal",
    icon: Users,
    staff: 8,
  },
  {
    name: "Operaciones",
    description: "Coordina procesos internos para optimizar la eficiencia",
    icon: Activity,
    staff: 25,
  },
  {
    name: "Finanzas y Contabilidad",
    description: "Administra el presupuesto, ingresos, gastos y reportes financieros",
    icon: Calculator,
    staff: 12,
  },
  {
    name: "Tecnología",
    description: "Implementa herramientas digitales y mejora procesos",
    icon: Monitor,
    staff: 15,
  },
  {
    name: "Área Legal",
    description: "Garantizar el cumplimiento de las normativas y proteger los intereses",
    icon: Shield,
    staff: 6,
  },
]

export function AreasPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Áreas Internas</h2>
          <p className="text-slate-600 mt-1">Organigrama y funciones del equipo interno</p>
        </div>
        <AddAreaDialog />
      </div>

      {/* Internal Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internalAreas.map((area, index) => {
          const Icon = area.icon
          return (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline">{area.staff} personas</Badge>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{area.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{area.description}</p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Ver Equipo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Organizational Chart */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Organigrama Empresarial</CardTitle>
          <CardDescription>Estructura organizacional y líneas de reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* CEO Level */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold">CEO</h3>
                    <p className="text-sm text-blue-100">Dirección Ejecutiva</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Level */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {internalAreas.slice(1).map((area, index) => {
                const Icon = area.icon
                return (
                  <div key={index} className="bg-slate-100 p-4 rounded-lg text-center">
                    <Icon className="h-5 w-5 mx-auto mb-2 text-slate-600" />
                    <h4 className="font-semibold text-sm text-slate-900">{area.name}</h4>
                    <p className="text-xs text-slate-600">{area.staff} personas</p>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
