"use client"

import { useState } from "react"
import {
  Plus,
  PackageCheck,
  AlertTriangle,
  AlertCircle,
  Boxes,
  Filter,
  ShoppingCart,
  Eye,
  Package,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AddInventoryProductDialog } from "./AddInventoryProductDialog"
import { ProductCard } from "./ProductCard"

const inventoryAlerts = [
  { product: "Cascos de Seguridad", currentStock: 15, minStock: 50, status: "critical", sector: "Construcción" },
  { product: "Guantes Industriales", currentStock: 25, minStock: 100, status: "warning", sector: "Manufactura" },
  { product: "Equipos de Soldadura", currentStock: 3, minStock: 10, status: "critical", sector: "Construcción" },
  { product: "Herramientas Eléctricas", currentStock: 8, minStock: 20, status: "warning", sector: "Mantenimiento" },
]

export function InventoryPage() {
  const [inventoryProducts, setInventoryProducts] = useState<any[]>([
    {
      id: 1,
      productName: "Cascos de Seguridad",
      sector: "Construcción",
      currentStock: 15,
      minStock: 50,
      currency: "PEN",
      value: 45.00,
    },
    {
      id: 2,
      productName: "Guantes Industriales",
      sector: "Manufactura",
      currentStock: 25,
      minStock: 100,
      currency: "PEN",
      value: 12.50,
    },
    {
      id: 3,
      productName: "Equipos de Soldadura",
      sector: "Construcción",
      currentStock: 3,
      minStock: 10,
      currency: "USD",
      value: 350.00,
    },
  ])

  const handleAddProduct = (newProduct: any) => {
    setInventoryProducts([newProduct, ...inventoryProducts])
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Control de Inventario</h2>
          <p className="text-slate-600 mt-1">Gestión automática de stock - Alertas en tiempo real</p>
        </div>
        <AddInventoryProductDialog onAddProduct={handleAddProduct} />
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <PackageCheck className="h-8 w-8 mx-auto mb-2 text-green-200" />
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-green-100 text-sm">Productos en Stock</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-600 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-200" />
            <p className="text-3xl font-bold">
              {inventoryAlerts.filter((alert) => alert.status === "critical").length}
            </p>
            <p className="text-red-100 text-sm">Alertas Críticas</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
            <p className="text-3xl font-bold">
              {inventoryAlerts.filter((alert) => alert.status === "warning").length}
            </p>
            <p className="text-yellow-100 text-sm">Advertencias</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6 text-center">
            <Boxes className="h-8 w-8 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">S/ 2.4M</p>
            <p className="text-blue-100 text-sm">Valor Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts Detail */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Alertas de Stock Automáticas</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </CardTitle>
          <CardDescription>
            Sistema automático que advierte la falta de stock - Completamente gratis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryAlerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-6 rounded-lg border-l-4 ${
                  alert.status === "critical"
                    ? "bg-red-50 border-l-red-500"
                    : "bg-yellow-50 border-l-yellow-500"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${alert.status === "critical" ? "bg-red-100" : "bg-yellow-100"}`}
                  >
                    <AlertTriangle
                      className={`h-6 w-6 ${alert.status === "critical" ? "text-red-600" : "text-yellow-600"}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{alert.product}</h4>
                    <p className="text-slate-600">Sector: {alert.sector}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-slate-500">
                        Stock actual: <span className="font-semibold">{alert.currentStock}</span>
                      </span>
                      <span className="text-sm text-slate-500">
                        Stock mínimo: <span className="font-semibold">{alert.minStock}</span>
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress value={(alert.currentStock / alert.minStock) * 100} className="w-48 h-2" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant={alert.status === "critical" ? "destructive" : "default"}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Reabastecer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Products */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Productos en Inventario</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </CardTitle>
          <CardDescription>
            Listado de productos registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventoryProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(product) => console.log("Ver detalles", product)}
                onEdit={(product) => console.log("Editar", product)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
