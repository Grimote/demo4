"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Package, Warehouse, ShoppingCart, Route, Network } from "lucide-react"

const logisticsServices = [
    { name: "Gestión y Coordinación de Carga-Descarga", icon: Truck, status: "Activo", orders: 45 },
    { name: "Recojo a Domicilio - Paquetería", icon: MapPin, status: "Activo", orders: 128 },
    { name: "Servicio de Empaquetamiento", icon: Package, status: "Activo", orders: 67 },
    { name: "Almacenaje", icon: Warehouse, status: "Activo", orders: 234 },
    { name: "Gestión de Compras y Envíos", icon: ShoppingCart, status: "Activo", orders: 89 },
    { name: "Distribución de Mercadería", icon: Route, status: "Activo", orders: 156 },
    { name: "Sub Contrata de Servicios", icon: Network, status: "Activo", orders: 23 },
]

export function ServicesSection() {
    return (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span>Servicios Exclusivos de Logística</span>
                </CardTitle>
                <CardDescription>Gestión integral de servicios logísticos - Todo en un solo lugar</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {logisticsServices.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors"
                            >
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 text-sm">{service.name}</h4>
                                    <div className="flex items-center justify-between mt-1">
                                        <Badge variant="default" className="text-xs">
                                            {service.status}
                                        </Badge>
                                        <span className="text-xs text-slate-600">{service.orders} órdenes</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
