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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

const areas = ["Operaciones", "Logística", "Finanzas", "Recursos Humanos", "Gerencia"]

const communicationTypes = ["Propuesta", "Actualización", "Reporte", "Capacitación", "Feedback", "General"]

interface AddCommunicationDialogProps {
  onAddCommunication?: (communication: any) => void
}

export function AddCommunicationDialog({ onAddCommunication }: AddCommunicationDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    area: "",
    type: "",
    message: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.area || !formData.type || !formData.message) {
      return
    }

    const newCommunication = {
      id: Date.now(),
      area: formData.area,
      type: formData.type,
      message: formData.message,
      uploadedFile,
      timestamp: new Date().toISOString(),
    }

    onAddCommunication?.(newCommunication)

    setFormData({
      area: "",
      type: "",
      message: "",
    })
    setUploadedFile(null)
    setOpen(false)
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Comunicación
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Iniciar Nueva Comunicación
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Comparta una actualización, propuesta o feedback con el equipo.
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
                    <Label htmlFor="area" className="text-sm font-medium text-gray-700">
                      Área / Departamento *
                    </Label>
                    <Select
                      value={formData.area}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, area: value }))}
                    >
                      <SelectTrigger
                        id="area"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione su área" />
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
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                      Tipo de Comunicación *
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger
                        id="type"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {communicationTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()} className="rounded-lg">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escriba su mensaje aquí..."
                    className="min-h-[150px] max-h-[250px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Adjuntar Archivo (Opcional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedFile ? uploadedFile.name : "Click para subir o arrastrar"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Cualquier tipo de archivo hasta 10MB</p>
                      </div>
                      <Input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file)
                        }}
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Seleccionar Archivo
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
                Enviar Comunicación
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
