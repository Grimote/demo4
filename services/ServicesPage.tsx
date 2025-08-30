"use client"

import {
  Plus,
  Eye,
  Leaf,
  Users,
  Fish,
  Pickaxe,
  Factory,
  Shirt,
  Home,
  Zap,
  Store,
  Truck,
  GraduationCap,
  Heart,
  Plane,
  Calculator,
  Microscope,
  Monitor,
  HelpCircle,
  Shield,
  BookOpen,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddServiceDialog } from "./AddServiceDialog"

const sectors = {
  primary: [
    { name: "Agricultura", icon: Leaf, clients: 45, revenue: "S/ 450,000" },
    { name: "Ganadería", icon: Users, clients: 23, revenue: "S/ 320,000" },
    { name: "Pesca", icon: Fish, clients: 12, revenue: "S/ 180,000" },
    { name: "Minería", icon: Pickaxe, clients: 8, revenue: "S/ 890,000" },
    { name: "Areneras", icon: Factory, clients: 15, revenue: "S/ 210,000" },
  ],
  secondary: [
    { name: "Industria Textil", icon: Shirt, clients: 34, revenue: "S/ 560,000" },
    { name: "Construcción", icon: Home, clients: 67, revenue: "S/ 1,200,000" },
    { name: "Producción Energética", icon: Zap, clients: 12, revenue: "S/ 780,000" },
    { name: "Industria Manufacturera", icon: Factory, clients: 89, revenue: "S/ 950,000" },
  ],
  tertiary: [
    { name: "Comercio", icon: Store, clients: 156, revenue: "S/ 670,000" },
    { name: "Transporte", icon: Truck, clients: 78, revenue: "S/ 540,000" },
    { name: "Educación", icon: GraduationCap, clients: 45, revenue: "S/ 320,000" },
    { name: "Salud", icon: Heart, clients: 23, revenue: "S/ 450,000" },
    { name: "Turismo", icon: Plane, clients: 34, revenue: "S/ 280,000" },
    { name: "Finanzas", icon: Calculator, clients: 12, revenue: "S/ 890,000" },
  ],
  quaternary: [
    { name: "Investigación Científica", icon: Microscope, clients: 8, revenue: "S/ 340,000" },
    { name: "Tecnologías de la Información", icon: Monitor, clients: 45, revenue: "S/ 780,000" },
    { name: "Consultoría", icon: HelpCircle, clients: 67, revenue: "S/ 560,000" },
    { name: "Industria Aeroespacial", icon: Plane, clients: 3, revenue: "S/ 1,200,000" },
  ],
  quinary: [
    { name: "Servicios Públicos", icon: Shield, clients: 23, revenue: "S/ 450,000" },
    { name: "Organizaciones sin Fines de Lucro", icon: Heart, clients: 34, revenue: "S/ 120,000" },
    { name: "Educación Gratuita", icon: BookOpen, clients: 56, revenue: "S/ 200,000" },
  ],
}

export function ServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gestión de Servicios por Sectores</h2>
          <p className="text-slate-600 mt-1">Servicios especializados para todos los sectores económicos</p>
        </div>
        <AddServiceDialog />
      </div>

      <Tabs defaultValue="primary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-100/80">
          <TabsTrigger value="primary">Sector Primario</TabsTrigger>
          <TabsTrigger value="secondary">Sector Secundario</TabsTrigger>
          <TabsTrigger value="tertiary">Sector Terciario</TabsTrigger>
          <TabsTrigger value="quaternary">Sector Cuarto</TabsTrigger>
          <TabsTrigger value="quinary">Sector Quinto</TabsTrigger>
        </TabsList>

        {Object.entries(sectors).map(([sectorKey, sectorData]) => (
          <TabsContent key={sectorKey} value={sectorKey} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorData.map((sector, index) => {
                const Icon = sector.icon
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary">{sector.clients} clientes</Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{sector.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Ingresos:</span>
                        <span className="font-semibold text-green-600">{sector.revenue}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Servicios
                        </Button>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
