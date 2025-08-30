"use client"

import {
  Plus,
  MessageCircle,
  FileText,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddSupportTicketDialog } from "./AddSupportTicketDialog"

export function SupportPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Centro de Soporte</h2>
          <p className="text-slate-600 mt-1">Recursos de ayuda y asistencia técnica</p>
        </div>
        <AddSupportTicketDialog />
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Guías en Video</CardTitle>
          <CardDescription>
            Aprenda visualmente con nuestros tutoriales en video, desde lo básico hasta funcionalidades
            avanzadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Introducción a la Plataforma",
                description: "Recorrido rápido por la interfaz y funciones principales.",
                duration: "5:30",
              },
              {
                title: "Gestión de Compras",
                description: "Creación y seguimiento de órdenes de compra.",
                duration: "8:45",
              },
              {
                title: "Configuración de Inventario",
                description: "Configurar alertas y gestionar stock de productos.",
                duration: "6:20",
              },
              {
                title: "Reportes Avanzados",
                description: "Generar y personalizar reportes empresariales.",
                duration: "10:15",
              },
            ].map((video, index) => (
              <Card key={index} className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-slate-400 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{video.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Duración: {video.duration}</span>
                      <Button variant="link" className="text-blue-600 p-0 h-auto">
                        Ver Video
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl w-fit mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Chat en Vivo</h3>
            <p className="text-sm text-slate-600 mb-4">Asistencia inmediata con nuestro equipo de soporte</p>
            <Button className="w-full">Iniciar Chat</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Base de Conocimientos</h3>
            <p className="text-sm text-slate-600 mb-4">Artículos y guías detalladas para resolver dudas</p>
            <Button variant="outline" className="w-full bg-transparent">
              Explorar
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Tickets de Soporte</h3>
            <p className="text-sm text-slate-600 mb-4">Cree un ticket para problemas específicos</p>
            <AddSupportTicketDialog />
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>Respuestas a las consultas más comunes de nuestros usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                question: "¿Cómo configuro las alertas de inventario?",
                answer:
                  "Puede configurar las alertas desde el módulo de Inventario, estableciendo niveles mínimos para cada producto.",
              },
              {
                question: "¿Puedo exportar los reportes a Excel?",
                answer:
                  "Sí, todos los reportes pueden exportarse en formatos PDF, Excel y CSV desde el Centro de Reportes.",
              },
              {
                question: "¿Cómo agrego nuevos proveedores al sistema?",
                answer:
                  "Vaya al módulo de Proveedores y haga clic en 'Nuevo Proveedor' para registrar la información completa.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-4 bg-slate-50/50 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
