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
import type { DateRange } from "react-day-picker"

const reportCategories = ["Financiero", "De Proyectos", "De Inventario", "De Proveedores", "Personalizado"]

interface AddReportDialogProps {
  onAddReport?: (report: any) => void
}

export function AddReportDialog({ onAddReport }: AddReportDialogProps) {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [formData, setFormData] = useState({
    reportTitle: "",
    reportCategory: "",
    period: "",
    generatedBy: "",
    criteria: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.reportTitle || !formData.reportCategory) {
      return
    }

    const newReport = {
      id: Date.now(),
      reportTitle: formData.reportTitle,
      reportCategory: formData.reportCategory,
      period: formData.period,
      generatedBy: formData.generatedBy,
      criteria: formData.criteria,
      dateRange,
      timestamp: new Date().toISOString(),
    }

    onAddReport?.(newReport)

    setFormData({
      reportTitle: "",
      reportCategory: "",
      period: "",
      generatedBy: "",
      criteria: "",
    })
    setDateRange(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] bg-white border-0 shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100 flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
              Generar Nuevo Reporte
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2 leading-relaxed">
              Configure los parámetros para generar un nuevo reporte personalizado.
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
                    <Label htmlFor="report-title" className="text-sm font-medium text-gray-700">
                      Título del Reporte *
                    </Label>
                    <Input
                      id="report-title"
                      placeholder="Ej: Reporte Mensual de Ventas"
                      value={formData.reportTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, reportTitle: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="report-category" className="text-sm font-medium text-gray-700">
                      Categoría del Reporte *
                    </Label>
                    <Select
                      value={formData.reportCategory}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, reportCategory: value }))}
                    >
                      <SelectTrigger
                        id="report-category"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors"
                      >
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                        {reportCategories.map((category) => (
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
                    <Label htmlFor="period" className="text-sm font-medium text-gray-700">
                      Período
                    </Label>
                    <Input
                      id="period"
                      placeholder="Ej: Julio 2025, Q3 2025"
                      value={formData.period}
                      onChange={(e) => setFormData((prev) => ({ ...prev, period: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="date-range" className="text-sm font-medium text-gray-700">
                      Rango de Fechas
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-range"
                          variant={"outline"}
                          className={cn(
                            "h-12 w-full justify-start text-left font-normal rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Seleccione un rango</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="generated-by" className="text-sm font-medium text-gray-700">
                      Generado Por
                    </Label>
                    <Input
                      id="generated-by"
                      placeholder="Ej: Juan Pérez, Equipo de Finanzas"
                      value={formData.generatedBy}
                      onChange={(e) => setFormData((prev) => ({ ...prev, generatedBy: e.target.value }))}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="criteria" className="text-sm font-medium text-gray-700">
                    Criterios y Filtros del Reporte
                  </Label>
                  <Textarea
                    id="criteria"
                    placeholder="Especifique los datos a incluir, filtros a aplicar, o cualquier otro criterio para la generación del reporte..."
                    className="min-h-[120px] max-h-[200px] rounded-xl border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-colors placeholder:text-gray-400 resize-none scrollbar-hide overflow-y-auto"
                    value={formData.criteria}
                    onChange={(e) => setFormData((prev) => ({ ...prev, criteria: e.target.value }))}
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
                Generar y Descargar
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
