"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

const inventoryAlerts = [
  { product: "Cascos de Seguridad", currentStock: 15, minStock: 50, status: "critical", sector: "Construcción" },
  { product: "Guantes Industriales", currentStock: 25, minStock: 100, status: "warning", sector: "Manufactura" },
  { product: "Equipos de Soldadura", currentStock: 3, minStock: 10, status: "critical", sector: "Construcción" },
  { product: "Herramientas Eléctricas", currentStock: 8, minStock: 20, status: "warning", sector: "Mantenimiento" },
]

export function InventoryAlerts() {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
          <span>Alertas de Inventario</span>
        </CardTitle>
        <CardDescription>Control automático de stock - Alertas en tiempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryAlerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                alert.status === "critical"
                  ? "bg-red-50 border border-red-200"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${alert.status === "critical" ? "bg-red-100" : "bg-yellow-100"}`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${alert.status === "critical" ? "text-red-600" : "text-yellow-600"}`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{alert.product}</h4>
                  <p className="text-sm text-slate-600">
                    Stock actual: {alert.currentStock} | Mínimo: {alert.minStock} | Sector: {alert.sector}
                  </p>
                </div>
              </div>
              <Button size="sm" variant={alert.status === "critical" ? "destructive" : "default"}>
                Reabastecer
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
