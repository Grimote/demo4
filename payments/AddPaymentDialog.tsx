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
import { Plus, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const suppliers = [
  "Constructora Moderna S.A.C.",
  "Suministros Industriales E.I.R.L.",
  "Tecnología Avanzada S.R.L.",
  "Logística Rápida E.I.R.L.",
]

const paymentMethods = ["Transferencia Bancaria", "Tarjeta de Crédito", "Efectivo", "Yape/Plin", "Otro"]

interface AddPaymentDialogProps {
  onAddPayment?: (payment: any) => void
}

export function AddPaymentDialog({ onAddPayment }: AddPaymentDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    supplier: "",
    invoice: "",
    amount: "",
    currency: "",
    status: "",
    paymentMethod: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.supplier || !formData.invoice || !formData.amount) {
      return
    }

    const newPayment = {
      id: Date.now(),
      supplier: formData.supplier,
      invoice: formData.invoice,
      amount: formData.amount,
      currency: formData.currency,
      status: formData.status,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      date,
    }

    onAddPayment?.(newPayment)

    setFormData({
      supplier: "",
      invoice: "",
      amount: "",
      currency: "",
      status: "",
      paymentMethod: "",
      notes: "",
    })
    setDate(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Pago
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Registrar Nuevo Pago
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo pago en el sistema.
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
                    <Label htmlFor="supplier" className="text-sm font-medium text-gray-700">
                      Proveedor *
                    </Label>
                    <Select
                      value={formData.supplier}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, supplier: value }))}
                    >
                      <SelectTrigger
                        id="supplier"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione un proveedor" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {suppliers.map((supplier) => (
                          <SelectItem
                            key={supplier}
                            value={supplier.toLowerCase().replace(/\s+/g, "-")}
                            className="rounded-lg"
                          >
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="invoice" className="text-sm font-medium text-gray-700">
                      Número de Factura *
                    </Label>
                    <Input
                      id="invoice"
                      placeholder="Ej: F001-2025"
                      value={formData.invoice}
                      onChange={(e) => setFormData((prev) => ({ ...prev, invoice: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                      Monto del Pago *
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Ej: 45000"
                      value={formData.amount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
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
                          Soles (PEN)
                        </SelectItem>
                        <SelectItem value="USD" className="rounded-lg">
                          Dólares (USD)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="payment-date" className="text-sm font-medium text-gray-700">
                      Fecha de Pago
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "h-12 w-full justify-start text-left font-normal rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Seleccione una fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Estado del Pago
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
                        <SelectItem value="completado" className="rounded-lg">
                          Completado
                        </SelectItem>
                        <SelectItem value="procesando" className="rounded-lg">
                          Procesando
                        </SelectItem>
                        <SelectItem value="pendiente" className="rounded-lg">
                          Pendiente
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="payment-method" className="text-sm font-medium text-gray-700">
                      Método de Pago
                    </Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger
                        id="payment-method"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione un método de pago" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {paymentMethods.map((method) => (
                          <SelectItem
                            key={method}
                            value={method.toLowerCase().replace(/\s+/g, "-")}
                            className="rounded-lg"
                          >
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Notas Adicionales
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Añadir cualquier nota o referencia sobre el pago..."
                    className="min-h-[120px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
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
                Guardar Pago
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
