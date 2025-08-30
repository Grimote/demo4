"use client"

import {
  Building2,
  Search,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Asumiendo que inventoryAlerts se pasará como prop o se obtendrá de un estado global.
// Por ahora, lo hardcodeo para que el componente no falle.
const inventoryAlerts = [
  { product: "Cascos de Seguridad", currentStock: 15, minStock: 50, status: "critical", sector: "Construcción" },
  { product: "Equipos de Soldadura", currentStock: 3, minStock: 10, status: "critical", sector: "Construcción" },
];


export function Header() {
  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                CIMAL Technology
              </h1>
              <p className="text-xs text-slate-500">Plataforma All in One</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buscar en toda la plataforma..."
              className="w-80 pl-10 bg-slate-50/50 border-slate-200/60 focus:bg-white transition-colors"
            />
          </div>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white text-[10px]">
              {inventoryAlerts.filter((alert) => alert.status === "critical").length}
            </span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
