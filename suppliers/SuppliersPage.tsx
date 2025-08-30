"use client"

import { useState } from "react"
import {
  Plus,
  Users,
  Activity,
  FileText,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AddSupplierDialog } from "./AddSupplierDialog"
import { SupplierCard } from "./SupplierCard"

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Constructora Moderna S.A.C.",
      ruc: "20547896321",
      status: "Activo",
      rating: 4.8,
      initials: "CM",
      sector: "Sector Secundario",
      subSector: "Construcción"
    },
    {
      id: 2,
      name: "Suministros Industriales E.I.R.L.",
      ruc: "10456789123",
      status: "Activo",
      rating: 4.6,
      initials: "SI",
      sector: "Sector Terciario",
      subSector: "Comercio"
    },
    {
      id: 3,
      name: "Tecnología Avanzada S.R.L.",
      ruc: "20987654321",
      status: "Pendiente",
      rating: 4.2,
      initials: "TA",
      sector: "Sector Terciario",
      subSector: "Tecnología"
    },
  ]);

  const handleAddSupplier = (newSupplier: any) => {
    // Crear un objeto de proveedor con el formato adecuado para la tarjeta
    const formattedSupplier = {
      id: newSupplier.id,
      name: newSupplier.razonSocial,
      ruc: newSupplier.ruc,
      status: "Activo", // Por defecto
      rating: 0, // Por defecto
      initials: newSupplier.razonSocial
        .split(' ')
        .map((word: string) => word[0])
        .slice(0, 2)
        .join(''),
      sector: newSupplier.sector,
      subSector: newSupplier.subSector
    };

    // Añadir el nuevo proveedor al inicio de la lista
    setSuppliers([formattedSupplier, ...suppliers]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Red de Proveedores</h2>
          <p className="text-slate-600 mt-1">Gestión integral de relaciones comerciales</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Pedir
          </Button>
          <AddSupplierDialog onAddSupplier={handleAddSupplier} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Proveedores</p>
                <p className="text-3xl font-bold mt-1">156</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Proveedores Activos</p>
                <p className="text-3xl font-bold mt-1">142</p>
              </div>
              <Activity className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Evaluaciones Pendientes</p>
                <p className="text-3xl font-bold mt-1">8</p>
              </div>
              <FileText className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Directorio de Proveedores</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={{
                  id: supplier.id,
                  name: supplier.name,
                  ruc: supplier.ruc,
                  status: supplier.status,
                  rating: supplier.rating,
                  initials: supplier.initials,
                  sector: supplier.sector,
                  subSector: supplier.subSector
                }}
                onViewDetails={(id: number) => console.log('Ver detalles', id)}
                onEdit={(id: number) => console.log('Editar', id)}
                onMoreOptions={(id: number) => console.log('Más opciones', id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
