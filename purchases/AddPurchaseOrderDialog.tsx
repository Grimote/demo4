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
import { Plus, Trash2, CalendarIcon, Upload } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface OrderItem {
  id: number
  name: string
  quantity: number
  unitPrice: number
}

interface UploadedFile {
  name: string
  dateTime: string
}

const suppliers = ["Distribuidora Central S.A.C.", "Mayorista Industrial E.I.R.L.", "Suministros Globales S.R.L."]

const areas = ["Administración", "Logística", "Contabilidad"]

const documentTypes = ["BOLETA", "FACTURA", "GUÍA DE REMISIÓN", "ORDEN DE COMPRA"]

interface AddPurchaseOrderDialogProps {
  onAddOrder?: (order: any) => void
}

export function AddPurchaseOrderDialog({ onAddOrder }: AddPurchaseOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [items, setItems] = useState<OrderItem[]>([{ id: 1, name: "", quantity: 1, unitPrice: 0 }])
  const [formData, setFormData] = useState({
    supplier: "",
    status: "",
    selectedArea: "",
    documentType: "",
    documentNumber: "",
  })
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const currentDateTime = format(new Date(), "dd/MM/yyyy HH:mm")
      setUploadedFile({ name: file.name, dateTime: currentDateTime })
    }
  }

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: 1, unitPrice: 0 }])
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleItemChange = (id: number, field: keyof OrderItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: field === "name" ? value : Number(value) || 0 } : item,
      ),
    )
  }

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.supplier || items.some((item) => !item.name)) {
      return
    }

    const newOrder = {
      id: Date.now(),
      supplier: formData.supplier,
      status: formData.status,
      selectedArea: formData.selectedArea,
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      date,
      items,
      totalAmount,
      uploadedFile,
    }

    onAddOrder?.(newOrder)

    setFormData({
      supplier: "",
      status: "",
      selectedArea: "",
      documentType: "",
      documentNumber: "",
    })
    setItems([{ id: 1, name: "", quantity: 1, unitPrice: 0 }])
    setUploadedFile(null)
    setDate(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Orden de Compra
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Crear Nueva Orden de Compra
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para generar una nueva orden de compra.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Fecha de Emisión
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
                      Estado
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
                        <SelectItem value="aprobada" className="rounded-lg">
                          Aprobada
                        </SelectItem>
                        <SelectItem value="pendiente" className="rounded-lg">
                          Pendiente
                        </SelectItem>
                        <SelectItem value="en-proceso" className="rounded-lg">
                          En Proceso
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Contratos de Compras</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border border-gray-200 rounded-2xl bg-gray-50/30">
                    <div className="space-y-3">
                      <Label htmlFor="destination-area" className="text-sm font-medium text-gray-700">
                        Área de Destino
                      </Label>
                      <Select
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, selectedArea: value }))}
                        value={formData.selectedArea}
                      >
                        <SelectTrigger
                          id="destination-area"
                          className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 focus:bg-white transition-colors"
                        >
                          <SelectValue placeholder="Seleccione un área" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                          {areas.map((area) => (
                            <SelectItem key={area} value={area.toLowerCase()} className="rounded-lg">
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="document-type" className="text-sm font-medium text-gray-700">
                        Tipo de Documento
                      </Label>
                      <Select
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, documentType: value }))}
                        value={formData.documentType}
                        disabled={!formData.selectedArea}
                      >
                        <SelectTrigger
                          id="document-type"
                          className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 focus:bg-white transition-colors disabled:opacity-50"
                        >
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                          {documentTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type.toLowerCase().replace(/\s+/g, "-")}
                              className="rounded-lg"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="document-number" className="text-sm font-medium text-gray-700">
                        Número de Comprobante
                      </Label>
                      <Input
                        id="document-number"
                        placeholder="Ingrese el número"
                        value={formData.documentNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, documentNumber: e.target.value }))}
                        disabled={!formData.selectedArea}
                        className="h-12 rounded-xl border-gray-200 bg-white hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      asChild
                      variant="outline"
                      disabled={!formData.selectedArea || !formData.documentType || !formData.documentNumber}
                      className="rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent"
                    >
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Cargar Documento
                        <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                      </Label>
                    </Button>
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm">
                      <p className="font-semibold text-green-800">Archivo Cargado:</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-700">{uploadedFile.name}</span>
                        <span className="text-gray-500">{uploadedFile.dateTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Items de la Orden</Label>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-5">
                          <Input
                            placeholder="Nombre del Producto/Servicio"
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Cant."
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="P. Unit."
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(item.id, "unitPrice", e.target.value)}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            readOnly
                            placeholder="Total"
                            value={(item.quantity * item.unitPrice).toFixed(2)}
                            className="h-12 rounded-xl border-gray-200 bg-gray-100 text-gray-600"
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-12 w-12 rounded-xl hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddItem}
                    className="rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Item
                  </Button>
                </div>

                <div className="flex justify-end">
                  <div className="w-1/3">
                    <div className="flex justify-between text-lg font-semibold p-4 bg-gray-50 rounded-xl">
                      <span>Total:</span>
                      <span>S/ {totalAmount.toFixed(2)}</span>
                    </div>
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
                Guardar Orden de Compra
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
