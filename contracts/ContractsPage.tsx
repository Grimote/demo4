"use client"

import {
  Plus,
  FileText,
  Calendar,
  Eye,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddContractDialog } from "./AddContractDialog"

export function ContractsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gestión Contractual</h2>
          <p className="text-slate-600 mt-1">Control integral de contratos y documentación legal</p>
        </div>
        <AddContractDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-200" />
            <p className="text-3xl font-bold">45</p>
            <p className="text-green-100 text-sm">Contratos Activos</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
            <p className="text-3xl font-bold">8</p>
            <p className="text-yellow-100 text-sm">Por Vencer</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">12</p>
            <p className="text-blue-100 text-sm">En Revisión</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-purple-200" />
            <p className="text-3xl font-bold">156</p>
            <p className="text-purple-100 text-sm">Total Documentos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Contratos Recientes</CardTitle>
          <CardDescription>Últimos contratos registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Contrato de Construcción - Torre Empresarial",
                client: "Inmobiliaria Premium S.A.C.",
                status: "Activo",
                value: "S/ 2,500,000",
                date: "2025-01-15",
                id: "C001",
              },
              {
                title: "Servicios de Consultoría Técnica",
                client: "Minera del Sur E.I.R.L.",
                status: "En Revisión",
                value: "S/ 450,000",
                date: "2025-01-10",
                id: "C002",
              },
              {
                title: "Suministro de Equipos Industriales",
                client: "Manufactura Avanzada S.A.",
                status: "Por Vencer",
                value: "S/ 850,000",
                date: "2024-12-20",
                id: "C003",
              },
            ].map((contract, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{contract.title}</h3>
                    <Badge
                      variant={
                        contract.status === "Activo"
                          ? "default"
                          : contract.status === "En Revisión"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {contract.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">Cliente: {contract.client}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>ID: {contract.id}</span>
                    <span>Valor: {contract.value}</span>
                    <span>Fecha: {contract.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
