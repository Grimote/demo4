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
import { Plus } from "lucide-react"

interface AddInventoryProductDialogProps {
  onAddProduct?: (product: any) => void
}

export function AddInventoryProductDialog({ onAddProduct }: AddInventoryProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    productName: "",
    sector: "",
    currentStock: "",
    minStock: "",
    currency: "",
    value: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.productName || !formData.sector || !formData.currentStock) {
      return
    }

    const newProduct = {
      id: Date.now(),
      productName: formData.productName,
      sector: formData.sector,
      currentStock: Number.parseInt(formData.currentStock) || 0,
      minStock: Number.parseInt(formData.minStock) || 0,
      currency: formData.currency || "PEN",
      value: Number.parseFloat(formData.value) || 0,
    }

    // Llamar a la función onAddProduct para pasar el nuevo producto al componente padre
    if (onAddProduct) {
      onAddProduct(newProduct)
    }

    // Resetear el formulario
    setFormData({
      productName: "",
      sector: "",
      currentStock: "",
      minStock: "",
      currency: "",
      value: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Añadir Producto al Inventario
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo producto en el inventario.
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
                    <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">
                      Nombre del Producto *
                    </Label>
                    <Input
                      id="product-name"
                      placeholder="Ej: Cascos de Seguridad"
                      value={formData.productName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="sector" className="text-sm font-medium text-gray-700">
                      Sector *
                    </Label>
                    <Input
                      id="sector"
                      placeholder="Ej: Construcción"
                      value={formData.sector}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sector: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="current-stock" className="text-sm font-medium text-gray-700">
                      Stock Actual *
                    </Label>
                    <Input
                      id="current-stock"
                      type="number"
                      placeholder="Ej: 15"
                      value={formData.currentStock}
                      onChange={(e) => setFormData((prev) => ({ ...prev, currentStock: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="min-stock" className="text-sm font-medium text-gray-700">
                      Stock Mínimo
                    </Label>
                    <Input
                      id="min-stock"
                      type="number"
                      placeholder="Ej: 50"
                      value={formData.minStock}
                      onChange={(e) => setFormData((prev) => ({ ...prev, minStock: e.target.value }))}
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
                    <Label htmlFor="value" className="text-sm font-medium text-gray-700">
                      Valor Unitario
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Ej: 45.00"
                      value={formData.value}
                      onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>
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
                Guardar Producto
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
