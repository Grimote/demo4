"use client"

import {
  Plus,
  CheckCircle,
  Activity,
  TrendingUp,
  Calculator,
  Eye,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AddMonitoringDialog } from "./AddMonitoringDialog"

export function MonitoringPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Monitoreo y Control</h2>
          <p className="text-slate-600 mt-1">
            Seguimiento en tiempo real - Progress Status & Compliance Levels
          </p>
        </div>
        <AddMonitoringDialog />
      </div>

      {/* Monitoring Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-200" />
            <p className="text-3xl font-bold">94%</p>
            <p className="text-green-100 text-sm">Compliance Level</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">Real Time</p>
            <p className="text-blue-100 text-sm">Information</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-200" />
            <p className="text-3xl font-bold">87%</p>
            <p className="text-purple-100 text-sm">Progress Status</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <CardContent className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2 text-orange-200" />
            <p className="text-3xl font-bold">S/ 2.1M</p>
            <p className="text-orange-100 text-sm">Centro de Costos</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Monitoring */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Seguimiento de Proyectos</CardTitle>
          <CardDescription>
            Monitoreo del ciclo de vida completo: Planificación → Ejecución → Control → Cierre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "Construcción Torre Empresarial",
                phase: "Ejecución",
                progress: 68,
                compliance: 94,
                budget: "S/ 2,500,000",
                spent: "S/ 1,700,000",
                status: "on-track",
              },
              {
                name: "Sistema Logístico Integrado",
                phase: "Monitoreo",
                progress: 89,
                compliance: 96,
                budget: "S/ 850,000",
                spent: "S/ 756,500",
                status: "on-track",
              },
              {
                name: "Modernización Infraestructura",
                phase: "Control",
                progress: 45,
                compliance: 78,
                budget: "S/ 1,200,000",
                spent: "S/ 540,000",
                status: "at-risk",
              },
            ].map((project, index) => (
              <div key={index} className="p-6 bg-slate-50/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{project.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant={project.status === "on-track" ? "default" : "destructive"}>
                        {project.phase}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        Gastado: {project.spent} de {project.budget}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Progress Status</span>
                      <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Compliance Level</span>
                      <span className="text-sm font-semibold text-slate-900">{project.compliance}%</span>
                    </div>
                    <Progress value={project.compliance} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
