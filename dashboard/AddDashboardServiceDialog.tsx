"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, FileText } from "lucide-react"

const dashboardServices = [
  "Análisis Ejecutivo",
  "Monitoreo de KPIs",
  "Gestión de Proyectos",
  "Seguimiento Financiero",
  "Control de Inventario",
  "Gestión de Recursos Humanos",
  "Análisis de Ventas",
  "Monitoreo de Operaciones",
  "Gestión de Clientes",
  "Análisis de Mercado",
  "Planificación Estratégica",
  "Otros",
]

const initialDocuments = [
  { id: 1, name: "Informe Ejecutivo" },
  { id: 2, name: "Reporte de KPIs" },
  { id: 3, name: "Plan de Acción" },
  { id: 4, name: "Análisis de Datos" },
]

interface AddDashboardServiceDialogProps {
  onAddService?: (service: any) => void
}

export function AddDashboardServiceDialog({ onAddService }: AddDashboardServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: "",
    name: "",
    status: "",
    activeOrders: "",
    currency: "",
    amount: "",
    description: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.serviceType || !formData.name || !formData.status) {
      return
    }

    const newService = {
      id: Date.now(),
      serviceType: formData.serviceType,
      name: formData.name,
      status: formData.status,
      activeOrders: Number.parseInt(formData.activeOrders) || 0,
      currency: formData.currency,
      amount: formData.amount,
      description: formData.description,
      uploadedFiles,
    }

    onAddService?.(newService)

    setFormData({
      serviceType: "",
      name: "",
      status: "",
      activeOrders: "",
      currency: "",
      amount: "",
      description: "",
    })
    setUploadedFiles({})
    setOpen(false)
  }

  const handleFileUpload = (docId: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [docId]: file }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Añadir Nuevo Servicio de Dashboard
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo servicio en el dashboard ejecutivo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <div
              className="h-full overflow-y-auto px-8 py-6"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="service-type" className="text-sm font-medium text-gray-700">
                      Tipo de Servicio *
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceType: value }))}
                    >
                      <SelectTrigger
                        id="service-type"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione un tipo de servicio" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {dashboardServices.map((service) => (
                          <SelectItem key={service} value={service} className="rounded-lg">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nombre Específico *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ej: Dashboard de Ventas Mensuales"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Estado *
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger
                        id="status"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        <SelectItem value="activo" className="rounded-lg">
                          Activo
                        </SelectItem>
                        <SelectItem value="pendiente" className="rounded-lg">
                          Pendiente
                        </SelectItem>
                        <SelectItem value="cerrado" className="rounded-lg">
                          Cerrado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="active-orders" className="text-sm font-medium text-gray-700">
                      Indicadores Activos
                    </Label>
                    <Input
                      id="active-orders"
                      type="number"
                      placeholder="Ej: 12"
                      value={formData.activeOrders}
                      onChange={(e) => setFormData((prev) => ({ ...prev, activeOrders: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                      Moneda
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger
                        id="currency"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        <SelectItem value="PEN" className="rounded-lg">
                          PEN
                        </SelectItem>
                        <SelectItem value="USD" className="rounded-lg">
                          USD
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                      Presupuesto
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Ej: 5000.00"
                      value={formData.amount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descripción del servicio de dashboard..."
                    className="min-h-[100px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Documentos</Label>
                  <div className="space-y-3">
                    {initialDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {uploadedFiles[doc.id.toString()] ? uploadedFiles[doc.id.toString()].name : doc.name}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-gray-200 hover:bg-gray-50 bg-transparent"
                          asChild
                        >
                          <Label htmlFor={`doc-dashboard-${doc.id}`} className="cursor-pointer">
                            <Upload className="h-3 w-3 mr-2" />
                            {uploadedFiles[doc.id.toString()] ? "Cambiar" : "Cargar"}
                            <Input
                              id={`doc-dashboard-${doc.id}`}
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(doc.id.toString(), file)
                              }}
                            />
                          </Label>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                  >
                    + Añadir otro documento
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 font-medium"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium shadow-sm"
              >
                Guardar Servicio de Dashboard
              </Button>
            </div>
          </div>
        </div>

        <style jsx>{`
          div[style*="scrollbar-width: none"] {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          div[style*="scrollbar-width: none"]::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent !important;
          }
          div[style*="scrollbar-width: none"]::-webkit-scrollbar-track {
            display: none !important;
            background: transparent !important;
          }
          div[style*="scrollbar-width: none"]::-webkit-scrollbar-thumb {
            display: none !important;
            background: transparent !important;
          }
          div[style*="scrollbar-width: none"]::-webkit-scrollbar-corner {
            display: none !important;
            background: transparent !important;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
