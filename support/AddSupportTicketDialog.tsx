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
import { Plus, Upload } from "lucide-react"

const categories = [
  "Facturación y Pagos",
  "Problema Técnico",
  "Consulta General",
  "Módulo de Inventario",
  "Módulo de Proyectos",
  "Otro",
]

const priorities = ["Baja", "Media", "Alta", "Urgente"]

interface AddSupportTicketDialogProps {
  onAddTicket?: (ticket: any) => void
}

export function AddSupportTicketDialog({ onAddTicket }: AddSupportTicketDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.category || !formData.priority || !formData.description) {
      return
    }

    const newTicket = {
      id: Date.now(),
      subject: formData.subject,
      category: formData.category,
      priority: formData.priority,
      description: formData.description,
      uploadedFiles,
      status: "Abierto",
      timestamp: new Date().toISOString(),
    }

    onAddTicket?.(newTicket)

    setFormData({
      subject: "",
      category: "",
      priority: "",
      description: "",
    })
    setUploadedFiles([])
    setOpen(false)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setUploadedFiles(Array.from(files))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Crear Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Crear Nuevo Ticket de Soporte
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Describa su problema o consulta y nuestro equipo le ayudará a la brevedad.
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
                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Asunto *
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Ej: Error al generar reporte de ventas"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Categoría del Problema *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger
                        id="category"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase().replace(/\s+/g, "-")}
                            className="rounded-lg"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                      Prioridad *
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger
                        id="priority"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione la prioridad" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority.toLowerCase()} className="rounded-lg">
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción del Problema *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Por favor, describa el problema con el mayor detalle posible. Incluya pasos para reproducirlo si es aplicable."
                    className="min-h-[150px] max-h-[250px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Adjuntar Archivos (Capturas de pantalla, etc.)
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedFiles.length > 0
                            ? `${uploadedFiles.length} archivo(s) seleccionado(s)`
                            : "Click para subir o arrastrar"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Imágenes, documentos hasta 10MB cada uno</p>
                      </div>
                      <Input
                        type="file"
                        multiple
                        className="hidden"
                        id="files-upload"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <Label htmlFor="files-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Seleccionar Archivos
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
                Enviar Ticket
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
