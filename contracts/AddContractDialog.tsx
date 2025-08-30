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
import { Plus, Upload, FileText, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const initialDocuments = [
  { id: 1, name: "Cuerpo del Contrato" },
  { id: 2, name: "Anexo A - Especificaciones" },
  { id: 3, name: "Anexo B - Cronograma" },
]

interface AddContractDialogProps {
  onAddContract?: (contract: any) => void
}

export function AddContractDialog({ onAddContract }: AddContractDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    contractTitle: "",
    client: "",
    contractId: "",
    value: "",
    currency: "",
    contractType: "",
    selectClient: "",
    codigo: "",
    clienteText: "",
    ruc: "",
    valorTotal: "",
    status: "",
    description: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.contractTitle || !formData.client || !formData.contractId) {
      return
    }

    const newContract = {
      id: Date.now(),
      contractTitle: formData.contractTitle,
      client: formData.client,
      contractId: formData.contractId,
      value: formData.value,
      currency: formData.currency,
      contractType: formData.contractType,
      selectClient: formData.selectClient,
      codigo: formData.codigo,
      clienteText: formData.clienteText,
      ruc: formData.ruc,
      valorTotal: formData.valorTotal,
      status: formData.status,
      description: formData.description,
      date,
      uploadedFiles,
    }

    onAddContract?.(newContract)

    setFormData({
      contractTitle: "",
      client: "",
      contractId: "",
      value: "",
      currency: "",
      contractType: "",
      selectClient: "",
      codigo: "",
      clienteText: "",
      ruc: "",
      valorTotal: "",
      status: "",
      description: "",
    })
    setUploadedFiles({})
    setDate(undefined)
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
          Nuevo Contrato
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Registrar Nuevo Contrato
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo contrato en el sistema.
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
                    <Label htmlFor="contract-title" className="text-sm font-medium text-gray-700">
                      Título del Contrato *
                    </Label>
                    <Input
                      id="contract-title"
                      placeholder="Ej: Contrato de Construcción"
                      value={formData.contractTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contractTitle: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="client" className="text-sm font-medium text-gray-700">
                      Cliente *
                    </Label>
                    <Input
                      id="client"
                      placeholder="Ej: Inmobiliaria Premium S.A.C."
                      value={formData.client}
                      onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contract-id" className="text-sm font-medium text-gray-700">
                      ID del Contrato *
                    </Label>
                    <Input
                      id="contract-id"
                      placeholder="Ej: C004"
                      value={formData.contractId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contractId: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="value" className="text-sm font-medium text-gray-700">
                      Valor del Contrato
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Ej: 2500000"
                      value={formData.value}
                      onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
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
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Fecha de Firma
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
                    <Label htmlFor="contract-type" className="text-sm font-medium text-gray-700">
                      Tipo de Contrato
                    </Label>
                    <Select
                      value={formData.contractType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, contractType: value }))}
                    >
                      <SelectTrigger
                        id="contract-type"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        <SelectItem value="servicios" className="rounded-lg">
                          Servicios
                        </SelectItem>
                        <SelectItem value="productos" className="rounded-lg">
                          Productos
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectValue placeholder="Seleccione estado del contrato" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        <SelectItem value="en-revision" className="rounded-lg">
                          En Revisión
                        </SelectItem>
                        <SelectItem value="activo" className="rounded-lg">
                          Activo
                        </SelectItem>
                        <SelectItem value="por-vencer" className="rounded-lg">
                          Por Vencer
                        </SelectItem>
                        <SelectItem value="finalizado" className="rounded-lg">
                          Finalizado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción / Objeto del Contrato
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descripción del objeto y alcance del contrato..."
                    className="min-h-[120px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Documentos del Contrato</Label>
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
                          <Label htmlFor={`doc-contract-${doc.id}`} className="cursor-pointer">
                            <Upload className="h-3 w-3 mr-2" />
                            {uploadedFiles[doc.id.toString()] ? "Cambiar" : "Cargar"}
                            <Input
                              id={`doc-contract-${doc.id}`}
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
                Guardar Contrato
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
