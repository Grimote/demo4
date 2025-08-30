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
import { Plus, ImageIcon } from "lucide-react"

const sectors = [
  {
    name: "Transporte",
    subSectors: [
      "Carga Aérea",
      "Carga Marítima",
      "Carga Terrestre",
      "Transporte de Pasajeros",
      "Alquiler de Equipos Livianos",
      "Alquiler de Equipos Pesados",
      "Alquiler de Equipos Auxiliares",
      "Alquiler de Equipos de Izaje",
      "Almacenamiento",
      "Distribución",
      "Servicio de Conductor",
      "Operador Logístico",
      "Otros",
    ],
  },
  {
    name: "Telecomunicaciones",
    subSectors: [
      "Instalación Cámaras",
      "Soporte de Equipos de Comunicación",
      "Distribución de Internet",
      "Instalación de Equipos Tecnológicos",
      "Otros",
    ],
  },
  {
    name: "Contratistas",
    subSectors: [
      "Obras Civiles",
      "Obras Electromecánicas",
      "Obras Menores",
      "Obras de Saneamiento",
      "Obras de Infraestructura",
      "Mantenimiento de Vías",
      "Otros",
    ],
  },
  {
    name: "Consultoría",
    subSectors: ["Monitoreo", "Asesoría", "Elaboración de Planos", "Elaboración de Plan SSOT", "Otros"],
  },
  {
    name: "Educación",
    subSectors: ["Cursos", "Conferencias", "Diplomados", "Maestrías", "Capacitaciones", "Otros"],
  },
  { name: "Otros", subSectors: ["Otros"] },
]

interface AddServiceDialogProps {
  onAddService?: (service: any) => void
}

export function AddServiceDialog({ onAddService }: AddServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    subSector: "",
    currency: "",
    amount: "",
    description: "",
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const handleSectorChange = (value: string) => {
    setSelectedSector(value)
    setFormData((prev) => ({ ...prev, sector: value, subSector: "" }))
  }

  const currentSubSectors = sectors.find((s) => s.name === selectedSector)?.subSectors || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.sector) {
      return
    }

    const newService = {
      id: Date.now(),
      name: formData.name,
      sector: formData.sector,
      subSector: formData.subSector,
      currency: formData.currency,
      amount: formData.amount,
      description: formData.description,
      uploadedImages,
    }

    onAddService?.(newService)

    setFormData({
      name: "",
      sector: "",
      subSector: "",
      currency: "",
      amount: "",
      description: "",
    })
    setUploadedImages([])
    setSelectedSector(null)
    setOpen(false)
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      setUploadedImages(Array.from(files))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Crear Servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Añadir Nuevo Servicio
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo servicio.
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
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nombre del Servicio *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ej: Transporte de Carga"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="sector" className="text-sm font-medium text-gray-700">
                      Sector *
                    </Label>
                    <Select onValueChange={handleSectorChange} value={formData.sector}>
                      <SelectTrigger
                        id="sector"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione un sector" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {sectors.map((sector) => (
                          <SelectItem key={sector.name} value={sector.name} className="rounded-lg">
                            {sector.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="sub-sector" className="text-sm font-medium text-gray-700">
                      Sub-Sector
                    </Label>
                    <Select
                      disabled={!selectedSector}
                      value={formData.subSector}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, subSector: value }))}
                    >
                      <SelectTrigger
                        id="sub-sector"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors disabled:opacity-50"
                      >
                        <SelectValue placeholder="Seleccione un sub-sector" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {currentSubSectors.map((subSector) => (
                          <SelectItem key={subSector} value={subSector} className="rounded-lg">
                            {subSector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                        Monto
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Ej: 500.00"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descripción del servicio..."
                    className="min-h-[100px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Imágenes</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedImages.length > 0
                            ? `${uploadedImages.length} imagen(es) seleccionada(s)`
                            : "Click para subir o arrastrar"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB cada una</p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="images-upload"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                      <Label htmlFor="images-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Seleccionar Imágenes
                        </Button>
                      </Label>
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
                Guardar Servicio
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
