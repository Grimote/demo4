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
import { Plus } from "lucide-react"

const projects = ["Construcción Torre Empresarial", "Sistema Logístico Integrado", "Modernización Infraestructura"]

const phases = ["Planificación", "Ejecución", "Control", "Cierre"]

const statuses = [
  { value: "on-track", label: "A Tiempo (On Track)" },
  { value: "at-risk", label: "En Riesgo (At Risk)" },
  { value: "off-track", label: "Retrasado (Off Track)" },
]

interface AddMonitoringDialogProps {
  onAddMonitoring?: (monitoring: any) => void
}

export function AddMonitoringDialog({ onAddMonitoring }: AddMonitoringDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    project: "",
    phase: "",
    status: "",
    progress: "",
    compliance: "",
    spent: "",
    summary: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.project || !formData.phase || !formData.status) {
      return
    }

    const newMonitoring = {
      id: Date.now(),
      project: formData.project,
      phase: formData.phase,
      status: formData.status,
      progress: Number.parseInt(formData.progress) || 0,
      compliance: Number.parseInt(formData.compliance) || 0,
      spent: Number.parseFloat(formData.spent) || 0,
      summary: formData.summary,
      timestamp: new Date().toISOString(),
    }

    onAddMonitoring?.(newMonitoring)

    setFormData({
      project: "",
      phase: "",
      status: "",
      progress: "",
      compliance: "",
      spent: "",
      summary: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Monitoreo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Registrar Nuevo Monitoreo de Proyecto
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Actualice el estado y progreso de un proyecto existente.
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
                  <Label htmlFor="project" className="text-sm font-medium text-gray-700">
                    Proyecto *
                  </Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, project: value }))}
                  >
                    <SelectTrigger
                      id="project"
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                    >
                      <SelectValue placeholder="Seleccione un proyecto a monitorear" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                      {projects.map((project) => (
                        <SelectItem
                          key={project}
                          value={project.toLowerCase().replace(/\s+/g, "-")}
                          className="rounded-lg"
                        >
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="phase" className="text-sm font-medium text-gray-700">
                      Fase Actual *
                    </Label>
                    <Select
                      value={formData.phase}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, phase: value }))}
                    >
                      <SelectTrigger
                        id="phase"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione la fase" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {phases.map((phase) => (
                          <SelectItem key={phase} value={phase.toLowerCase()} className="rounded-lg">
                            {phase}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Estado General *
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger
                        id="status"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione el estado" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value} className="rounded-lg">
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="progress" className="text-sm font-medium text-gray-700">
                      Progreso (%)
                    </Label>
                    <Input
                      id="progress"
                      type="number"
                      placeholder="Ej: 75"
                      value={formData.progress}
                      onChange={(e) => setFormData((prev) => ({ ...prev, progress: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="compliance" className="text-sm font-medium text-gray-700">
                      Cumplimiento (%)
                    </Label>
                    <Input
                      id="compliance"
                      type="number"
                      placeholder="Ej: 95"
                      value={formData.compliance}
                      onChange={(e) => setFormData((prev) => ({ ...prev, compliance: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="spent" className="text-sm font-medium text-gray-700">
                      Monto Gastado Acumulado
                    </Label>
                    <Input
                      id="spent"
                      type="number"
                      placeholder="Ej: 1800000"
                      value={formData.spent}
                      onChange={(e) => setFormData((prev) => ({ ...prev, spent: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="summary" className="text-sm font-medium text-gray-700">
                    Resumen / Notas de Monitoreo
                  </Label>
                  <Textarea
                    id="summary"
                    placeholder="Añadir un resumen del estado actual, hitos alcanzados, problemas encontrados, etc."
                    className="min-h-[120px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
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
                Guardar Monitoreo
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
