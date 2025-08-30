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
import { Plus, Upload, FileText, ImageIcon } from "lucide-react"

const sectors = [
  {
    name: "Sector Primario",
    subSectors: [
      "Agricultura",
      "Ganadería",
      "Minería",
      "Pesca",
      "Areneras",
      "Silvicultura",
      "Piscicultura",
      "Apicultura",
      "Caza",
      "Petroleó",
      "Acuicultura",
      "Otros",
    ],
  },
  {
    name: "Sector Secundario",
    subSectors: [
      "Artesanía",
      "Construcción",
      "Industria Textil",
      "Producción Energética",
      "Refinería",
      "Agroindustria",
      "Industria Manufacturera",
      "Otros",
    ],
  },
  {
    name: "Sector Terciario",
    subSectors: [
      "Comercio",
      "Turismo y Hotelería",
      "Restaurantes",
      "Salud",
      "Educación",
      "Finanzas",
      "Transporte",
      "Comunicación",
      "Entretenimiento",
      "Servicios Personales",
      "Administración publica",
      "Publicidad y Marketing",
      "Distribución Editorial",
      "Tiendas por Apartamento",
      "Servicios de Limpieza",
      "Servicios Legales",
      "Recursos Humanos",
      "Servicios Técnicos",
      "Combustible",
      "Otros",
    ],
  },
  {
    name: "Sector Cuarto",
    subSectors: [
      "Empresas certificadoras",
      "Cooperativas sociales",
      "Startups de Impacto",
      "Fundaciones",
      "Instituciones Hibridas",
      "Otros",
    ],
  },
  {
    name: "Sector Quinto",
    subSectors: [
      "Trabajo Doméstico No Remunerado",
      "Servicios Publico Sin fines de Lucro",
      "Educación Publica",
      "ONGs",
      "Otros",
    ],
  },
  { name: "Otros", subSectors: ["Opción a crear su propio sector"] },
]

const initialDocuments = [
  { id: 1, name: "FICHA RUC" },
  { id: 2, name: "COPIA LITERAL" },
  { id: 3, name: "ANEXO 2" },
  { id: 4, name: "ANEXO 3" },
  { id: 5, name: "DECLARACION JURADA" },
]

interface AddSupplierDialogProps {
  onAddSupplier?: (supplier: any) => void
}

export function AddSupplierDialog({ onAddSupplier }: AddSupplierDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    razonSocial: "",
    ruc: "",
    sector: "",
    subSector: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const handleSectorChange = (value: string) => {
    setSelectedSector(value)
    setFormData((prev) => ({ ...prev, sector: value, subSector: "" }))
  }

  const currentSubSectors = sectors.find((s) => s.name === selectedSector)?.subSectors || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.razonSocial || !formData.ruc || !formData.sector) {
      return
    }

    const newSupplier = {
      id: Date.now(),
      razonSocial: formData.razonSocial,
      ruc: formData.ruc,
      sector: formData.sector,
      subSector: formData.subSector,
      uploadedFiles,
      uploadedImage,
    }

    onAddSupplier?.(newSupplier)

    setFormData({
      razonSocial: "",
      ruc: "",
      sector: "",
      subSector: "",
    })
    setUploadedFiles({})
    setUploadedImage(null)
    setSelectedSector(null)
    setOpen(false)
  }

  const handleFileUpload = (docId: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [docId]: file }))
  }

  const handleImageUpload = (file: File) => {
    setUploadedImage(file)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proveedor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Añadir Nuevo Proveedor
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar un nuevo proveedor.
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
                    <Label htmlFor="razon-social" className="text-sm font-medium text-gray-700">
                      Razón Social *
                    </Label>
                    <Input
                      id="razon-social"
                      placeholder="Ej: Constructora Moderna S.A.C."
                      value={formData.razonSocial}
                      onChange={(e) => setFormData((prev) => ({ ...prev, razonSocial: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="ruc" className="text-sm font-medium text-gray-700">
                      RUC *
                    </Label>
                    <Input
                      id="ruc"
                      placeholder="Ej: 20547896321"
                      value={formData.ruc}
                      onChange={(e) => setFormData((prev) => ({ ...prev, ruc: e.target.value }))}
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
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Imagen de Referencia (Opcional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedImage ? uploadedImage.name : "Click para subir o arrastrar"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB</p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file)
                        }}
                      />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Seleccionar Imagen
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Documentos</Label>
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
                          <Label htmlFor={`doc-${doc.id}`} className="cursor-pointer">
                            <Upload className="h-3 w-3 mr-2" />
                            {uploadedFiles[doc.id.toString()] ? "Cambiar" : "Cargar"}
                            <Input
                              id={`doc-${doc.id}`}
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
                Guardar Proveedor
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
