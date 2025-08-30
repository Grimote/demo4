"use client"

import {
  Plus,
  FolderOpen,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AddProjectDialog } from "./AddProjectDialog"

export function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Centro de Proyectos</h2>
          <p className="text-slate-600 mt-1">Seguimiento integral del ciclo de vida de proyectos</p>
        </div>
        <AddProjectDialog />
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100/80">
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="planning">Planificación</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Construcción Torre Empresarial</CardTitle>
                  <Badge variant="default">En Progreso</Badge>
                </div>
                <CardDescription>ID: P001 • Presupuesto: S/ 2,500,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Progreso General</span>
                      <span className="text-sm font-semibold text-slate-900">68%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Cronograma
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Documentos
                    </Button>
                    <Button size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Sistema de Gestión Logística</CardTitle>
                  <Badge variant="secondary">Planificación</Badge>
                </div>
                <CardDescription>ID: P002 • Presupuesto: S/ 850,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Progreso General</span>
                      <span className="text-sm font-semibold text-slate-900">25%</span>
                    </div>
                    <Progress value={25} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Cronograma
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Documentos
                    </Button>
                    <Button size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Modernización de Infraestructura</CardTitle>
                <Badge variant="outline">Monitoreo</Badge>
              </div>
              <CardDescription>ID: P003 • Presupuesto: S/ 1,200,000</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Progreso General</span>
                    <span className="text-sm font-semibold text-slate-900">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Cronograma
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentos
                  </Button>
                  <Button size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <FolderOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Proyectos en Planificación</h3>
              <p className="text-slate-600">Los proyectos en fase de planificación aparecerán aquí</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Activity className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Proyectos en Monitoreo</h3>
              <p className="text-slate-600">Los proyectos bajo monitoreo y control aparecerán aquí</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Proyectos Completados</h3>
              <p className="text-slate-600">El historial de proyectos finalizados aparecerá aquí</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
