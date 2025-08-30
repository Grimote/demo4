"use client"

import {
  Plus,
  MessageCircle,
  MessageSquare,
  Network,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AddCommunicationDialog } from "./AddCommunicationDialog"

export function CommunicationPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Comunicación Interna</h2>
          <p className="text-slate-600 mt-1">Real Time Debate, Networking y Feedback</p>
        </div>
        <AddCommunicationDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real Time Communication */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <span>Comunicación en Tiempo Real</span>
            </CardTitle>
            <CardDescription>Debate y networking interno</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                {
                  user: "María García",
                  area: "Operaciones",
                  message: "Propuesta de mejora para el proceso de carga-descarga",
                  time: "Hace 5 min",
                  type: "proposal",
                },
                {
                  user: "Carlos López",
                  area: "Logística",
                  message: "Confirmado: Nueva ruta Lima-Huaraz optimizada",
                  time: "Hace 10 min",
                  type: "update",
                },
                {
                  user: "Ana Rodríguez",
                  area: "Finanzas",
                  message: "Reporte de costos del Q1 disponible para revisión",
                  time: "Hace 15 min",
                  type: "report",
                },
                {
                  user: "Luis Mendoza",
                  area: "RRHH",
                  message: "Capacitación en nuevos protocolos programada para mañana",
                  time: "Hace 30 min",
                  type: "training",
                },
              ].map((comm, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50/50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs">
                      {comm.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm">{comm.user}</h4>
                      <Badge variant="outline" className="text-xs">
                        {comm.area}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700">{comm.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{comm.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Tools */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Herramientas de Comunicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat en Tiempo Real
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Network className="h-4 w-4 mr-2" />
                Networking Interno
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Sistema de Feedback
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Propuestas de Mejora
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas de Comunicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Mensajes hoy:</span>
                <span className="font-semibold text-slate-900">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Propuestas activas:</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Feedback pendiente:</span>
                <span className="font-semibold text-orange-600">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
