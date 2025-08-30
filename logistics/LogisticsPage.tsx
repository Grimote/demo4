"use client"

import { useState } from "react"
import {
  Truck,
  MapPin,
  Package,
  Warehouse,
  ShoppingCart,
  Route,
  Network,
  Eye,
  Edit,
  Clock,
  Home,
  Globe,
  FileText,
  ImageIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddLogisticServiceDialog } from "./AddLogisticServiceDialog"

const initialLogisticsServices = [
  {
    id: 1,
    name: "Gestión y Coordinación de Carga-Descarga",
    icon: Truck,
    status: "Activo",
    orders: 45,
    serviceType: "Transporte",
    currency: "PEN",
    amount: "1000",
    description: "Servicio de gestión y coordinación de carga y descarga",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 2,
    name: "Recojo a Domicilio - Paquetería",
    icon: MapPin,
    status: "Activo",
    orders: 128,
    serviceType: "Recolección",
    currency: "USD",
    amount: "500",
    description: "Servicio de recojo a domicilio para paquetería",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 3,
    name: "Servicio de Empaquetamiento",
    icon: Package,
    status: "Activo",
    orders: 67,
    serviceType: "Empaquetamiento",
    currency: "PEN",
    amount: "800",
    description: "Servicio de empaquetamiento de mercancías",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 4,
    name: "Almacenaje",
    icon: Warehouse,
    status: "Activo",
    orders: 234,
    serviceType: "Almacenamiento",
    currency: "USD",
    amount: "1200",
    description: "Servicio de almacenaje de productos",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 5,
    name: "Gestión de Compras y Envíos",
    icon: ShoppingCart,
    status: "Activo",
    orders: 89,
    serviceType: "Compras",
    currency: "PEN",
    amount: "900",
    description: "Servicio de gestión de compras y envíos",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 6,
    name: "Distribución de Mercadería",
    icon: Route,
    status: "Activo",
    orders: 156,
    serviceType: "Distribución",
    currency: "USD",
    amount: "1100",
    description: "Servicio de distribución de mercancías",
    uploadedImage: null,
    uploadedFiles: {},
  },
  {
    id: 7,
    name: "Sub Contrata de Servicios",
    icon: Network,
    status: "Activo",
    orders: 23,
    serviceType: "Subcontratación",
    currency: "PEN",
    amount: "700",
    description: "Servicio de subcontratación de servicios logísticos",
    uploadedImage: null,
    uploadedFiles: {},
  },
]

export function LogisticsPage() {
  const [logisticsServices, setLogisticsServices] = useState(initialLogisticsServices)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [editServiceOpen, setEditServiceOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [editFormData, setEditFormData] = useState<any>({})

  const handleAddService = (newService: any) => {
    setLogisticsServices((prev) => [newService, ...prev])
  }

  const handleViewDetails = (service: any) => {
    setSelectedService(service)
    setViewDetailsOpen(true)
  }

  const handleEditService = (service: any) => {
    setSelectedService(service)
    setEditFormData({
      serviceType: service.serviceType || "",
      name: service.name || "",
      status: service.status?.toLowerCase() || "",
      activeOrders: service.orders?.toString() || "",
      currency: service.currency || "",
      amount: service.amount || "",
      description: service.description || "",
    })
    setEditServiceOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editFormData.name || !editFormData.status) return

    const updatedServices = logisticsServices.map((service) =>
      service.id === selectedService.id
        ? {
            ...service,
            name: editFormData.name,
            status: editFormData.status.charAt(0).toUpperCase() + editFormData.status.slice(1),
            orders: Number.parseInt(editFormData.activeOrders) || service.orders,
            serviceType: editFormData.serviceType || service.serviceType,
            currency: editFormData.currency || service.currency,
            amount: editFormData.amount || service.amount,
            description: editFormData.description || service.description,
          }
        : service,
    )

    setLogisticsServices(updatedServices)
    setEditServiceOpen(false)
    setSelectedService(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gestión Logística Integral</h2>
          <p className="text-slate-600 mt-1">Servicios exclusivos de logística - Todo en un solo lugar</p>
        </div>
        <AddLogisticServiceDialog onAddService={handleAddService} />
      </div>

      {/* Logistics Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logisticsServices.map((service, index) => {
          const Icon = service.icon
          return (
            <Card
              key={service.id || index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="default">{service.status}</Badge>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{service.name}</h3>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Órdenes activas:</span>
                  <span className="font-semibold text-blue-600">{service.orders}</span>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Button size="sm" className="flex-1" onClick={() => handleViewDetails(service)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Detalles del Servicio: {selectedService?.name}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto scrollbar-hide space-y-6 pr-2">
            {selectedService && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Tipo de Servicio</Label>
                    <p className="text-gray-900 mt-1">{selectedService.serviceType || "No especificado"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Estado</Label>
                    <p className="text-gray-900 mt-1">{selectedService.status}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Órdenes Activas</Label>
                    <p className="text-gray-900 mt-1">{selectedService.orders}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Moneda y Monto</Label>
                    <p className="text-gray-900 mt-1">
                      {selectedService.currency && selectedService.amount
                        ? `${selectedService.currency} ${selectedService.amount}`
                        : "No especificado"}
                    </p>
                  </div>
                </div>

                {selectedService.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Descripción</Label>
                    <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">{selectedService.description}</p>
                  </div>
                )}

                {selectedService.uploadedImage && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Imagen de Referencia</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center space-x-3">
                      <ImageIcon className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-700">{selectedService.uploadedImage.name}</span>
                    </div>
                  </div>
                )}

                {selectedService.uploadedFiles && Object.keys(selectedService.uploadedFiles).length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Documentos</Label>
                    <div className="mt-2 space-y-2">
                      {Object.entries(selectedService.uploadedFiles).map(([key, file]: [string, any]) => (
                        <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={editServiceOpen} onOpenChange={setEditServiceOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Editar Servicio: {selectedService?.name}</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto scrollbar-hide space-y-4 pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nombre del Servicio *</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Estado *</Label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value) => setEditFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="cerrado">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-orders">Órdenes Activas</Label>
                <Input
                  id="edit-orders"
                  type="number"
                  value={editFormData.activeOrders || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, activeOrders: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-currency">Moneda</Label>
                <Select
                  value={editFormData.currency}
                  onValueChange={(value) => setEditFormData((prev) => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PEN">PEN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-amount">Monto</Label>
              <Input
                id="edit-amount"
                type="number"
                value={editFormData.amount || ""}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, amount: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={editFormData.description || ""}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="mt-1 min-h-[100px] scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditServiceOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="flex-1">
              Guardar Cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logistics Chain Process */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Cadena de Distribución</CardTitle>
          <CardDescription>Proceso optimizado de envío y entrega</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: 1, title: "Envío Lima - Huaraz", description: "Transporte principal", icon: Truck },
              { step: 2, title: "Recojo en Agencia", description: "Coordinación local", icon: MapPin },
              { step: 3, title: "Tiempo de Espera", description: "Optimización de tiempos", icon: Clock },
              { step: 4, title: "Retorno a Domicilio", description: "Entrega final", icon: Home },
              { step: 5, title: "Conexión Interagencias", description: "Red de distribución", icon: Network },
              { step: 6, title: "Recojo en Provincia", description: "Cobertura nacional", icon: Globe },
            ].map((process, index) => {
              const Icon = process.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm">{process.title}</h4>
                    <p className="text-xs text-slate-600">{process.description}</p>
                  </div>
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Global CSS for invisible scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
