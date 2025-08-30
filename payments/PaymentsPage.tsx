"use client"

import {
  Plus,
  DollarSign,
  CreditCard,
  Calendar,
  Eye,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddPaymentDialog } from "./AddPaymentDialog"

export function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Centro de Pagos</h2>
          <p className="text-slate-600 mt-1">Gestión integral de pagos y valorizaciones</p>
        </div>
        <AddPaymentDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Pagos del Mes</p>
                <p className="text-3xl font-bold mt-1">S/ 847,392</p>
                <p className="text-emerald-200 text-sm">+12.5% vs mes anterior</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Pagos Pendientes</p>
                <p className="text-3xl font-bold mt-1">S/ 156,780</p>
                <p className="text-orange-200 text-sm">8 facturas pendientes</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Próximos Vencimientos</p>
                <p className="text-3xl font-bold mt-1">S/ 89,450</p>
                <p className="text-blue-200 text-sm">Próximos 7 días</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Registro de Pagos Recientes</CardTitle>
          <CardDescription>Historial de transacciones y pagos procesados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                supplier: "Constructora Moderna S.A.C.",
                amount: "S/ 45,000",
                date: "2025-01-20",
                status: "Completado",
                invoice: "F001-2025",
              },
              {
                supplier: "Suministros Industriales E.I.R.L.",
                amount: "S/ 12,500",
                date: "2025-01-18",
                status: "Procesando",
                invoice: "F002-2025",
              },
              {
                supplier: "Tecnología Avanzada S.R.L.",
                amount: "S/ 8,750",
                date: "2025-01-15",
                status: "Completado",
                invoice: "F003-2025",
              },
              {
                supplier: "Logística Rápida E.I.R.L.",
                amount: "S/ 23,200",
                date: "2025-01-12",
                status: "Pendiente",
                invoice: "F004-2025",
              },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{payment.supplier}</h3>
                    <Badge
                      variant={
                        payment.status === "Completado"
                          ? "default"
                          : payment.status === "Procesando"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>Factura: {payment.invoice}</span>
                    <span>Fecha: {payment.date}</span>
                    <span className="font-semibold text-slate-900">{payment.amount}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
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
