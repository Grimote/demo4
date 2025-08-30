"use client"

import {
  Plus,
  Shirt,
  Store,
  Users,
  Package,
  Warehouse,
  Monitor,
  Globe,
  Truck,
  Target,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddPurchaseOrderDialog } from "./AddPurchaseOrderDialog"

export function PurchasesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gestión de Compras</h2>
          <p className="text-slate-600 mt-1">Control integral de órdenes de compra y adquisiciones</p>
        </div>
        <AddPurchaseOrderDialog />
      </div>

      {/* Purchase Categories */}
      <Tabs defaultValue="retailers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100/80">
          <TabsTrigger value="retailers">Retailers</TabsTrigger>
          <TabsTrigger value="wholesalers">Mayoristas</TabsTrigger>
          <TabsTrigger value="distributors">Distribuidoras</TabsTrigger>
        </TabsList>

        <TabsContent value="retailers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Tiendas de Ropa", orders: 45, amount: "S/ 125,000", icon: Shirt },
              { name: "Tiendas Pequeñas", orders: 78, amount: "S/ 89,500", icon: Store },
              { name: "Emprendimientos", orders: 23, amount: "S/ 45,200", icon: Users },
              { name: "Tiendas Especializadas", orders: 34, amount: "S/ 156,800", icon: Package },
            ].map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary">{category.orders} órdenes</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                    <p className="text-lg font-bold text-green-600">{category.amount}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="wholesalers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Compras por Mayor y Distribución Menor",
                orders: 156,
                amount: "S/ 890,000",
                icon: Warehouse,
              },
              { name: "Negocios Digitales", orders: 89, amount: "S/ 456,000", icon: Monitor },
              { name: "Ventas por Internet", orders: 67, amount: "S/ 234,500", icon: Globe },
            ].map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary">{category.orders} órdenes</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                    <p className="text-lg font-bold text-green-600">{category.amount}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="distributors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Compras por Mayor y Distribución a Gran Escala",
                orders: 234,
                amount: "S/ 1,250,000",
                icon: Truck,
              },
              {
                name: "Distribución Especializada a Clientes Específicos",
                orders: 123,
                amount: "S/ 678,900",
                icon: Target,
              },
            ].map((category, index) => {
              const Icon = category.icon
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
                      <Badge variant="secondary">{category.orders} órdenes</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                    <p className="text-lg font-bold text-green-600">{category.amount}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Purchase Orders */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Órdenes de Compra Recientes</CardTitle>
          <CardDescription>Últimas órdenes procesadas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "OC001",
                supplier: "Distribuidora Central S.A.C.",
                amount: "S/ 45,000",
                status: "Aprobada",
                date: "2025-01-20",
              },
              {
                id: "OC002",
                supplier: "Mayorista Industrial E.I.R.L.",
                amount: "S/ 23,500",
                status: "Pendiente",
                date: "2025-01-18",
              },
              {
                id: "OC003",
                supplier: "Suministros Globales S.R.L.",
                amount: "S/ 67,800",
                status: "En Proceso",
                date: "2025-01-15",
              },
            ].map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{order.supplier}</h3>
                    <Badge
                      variant={
                        order.status === "Aprobada"
                          ? "default"
                          : order.status === "Pendiente"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>ID: {order.id}</span>
                    <span>Monto: {order.amount}</span>
                    <span>Fecha: {order.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
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
