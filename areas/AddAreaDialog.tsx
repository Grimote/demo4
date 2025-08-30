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
import { Plus, Target, Users, Activity, Calculator, Monitor, Shield } from "lucide-react"

const iconOptions = [
  { value: "target", label: "Estrategia (Target)", icon: Target },
  { value: "users", label: "Personal (Users)", icon: Users },
  { value: "activity", label: "Operaciones (Activity)", icon: Activity },
  { value: "calculator", label: "Finanzas (Calculator)", icon: Calculator },
  { value: "monitor", label: "Tecnología (Monitor)", icon: Monitor },
  { value: "shield", label: "Legal (Shield)", icon: Shield },
]

interface AddAreaDialogProps {
  onAddArea?: (area: any) => void
}

export function AddAreaDialog({ onAddArea }: AddAreaDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    areaName: "",
    staffCount: "",
    description: "",
    icon: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.areaName || !formData.staffCount) {
      return
    }

    const newArea = {
      id: Date.now(),
      name: formData.areaName,
      staffCount: Number.parseInt(formData.staffCount) || 0,
      description: formData.description,
      icon: formData.icon,
    }

    onAddArea?.(newArea)

    setFormData({
      areaName: "",
      staffCount: "",
      description: "",
      icon: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Área
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Agregar Nueva Área Interna
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Complete la información para registrar una nueva área en el organigrama.
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
                    <Label htmlFor="area-name" className="text-sm font-medium text-gray-700">
                      Nombre del Área *
                    </Label>
                    <Input
                      id="area-name"
                      placeholder="Ej: Marketing Digital"
                      value={formData.areaName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, areaName: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="staff-count" className="text-sm font-medium text-gray-700">
                      Número de Personas *
                    </Label>
                    <Input
                      id="staff-count"
                      type="number"
                      placeholder="Ej: 10"
                      value={formData.staffCount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, staffCount: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción de Funciones
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describa las principales funciones y responsabilidades del área..."
                    className="min-h-[120px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="icon" className="text-sm font-medium text-gray-700">
                    Icono Representativo
                  </Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger
                      id="icon"
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                    >
                      <SelectValue placeholder="Seleccione un icono" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="rounded-lg">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                Guardar Área
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
