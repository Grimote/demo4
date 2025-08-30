"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  Package,
  ShoppingCart,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AddProductDialog } from "./AddProductDialog"

export function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Casco de Seguridad Industrial",
      category: "Seguridad",
      price: "S/ 45.00",
      stock: 150,
      sector: "Seguridad",
      currency: "PEN",
      amount: "45.00",
    },
    {
      id: 2,
      name: "Taladro Percutor Profesional",
      category: "Herramientas",
      price: "S/ 320.00",
      stock: 25,
      sector: "Herramientas",
      currency: "PEN",
      amount: "320.00",
    },
    {
      id: 3,
      name: "Cemento Portland Tipo I",
      category: "Construcción",
      price: "S/ 28.50",
      stock: 500,
      sector: "Construcción",
      currency: "PEN",
      amount: "28.50",
    },
    {
      id: 4,
      name: "Guantes de Seguridad",
      category: "Seguridad",
      price: "S/ 15.00",
      stock: 200,
      sector: "Seguridad",
      currency: "PEN",
      amount: "15.00",
    },
    {
      id: 5,
      name: "Nivel Láser Profesional",
      category: "Herramientas",
      price: "S/ 450.00",
      stock: 12,
      sector: "Herramientas",
      currency: "PEN",
      amount: "450.00",
    },
    {
      id: 6,
      name: "Varilla de Construcción",
      category: "Construcción",
      price: "S/ 35.00",
      stock: 300,
      sector: "Construcción",
      currency: "PEN",
      amount: "35.00",
    },
  ])

  const handleAddProduct = (newProduct: any) => {
    // Aseguramos que el nuevo producto tenga los campos necesarios para la tarjeta
    const formattedProduct = {
      ...newProduct,
      id: Date.now(),
      category: newProduct.sector || newProduct.subSector || "General",
      price: `${newProduct.currency === "PEN" ? "S/ " : "$"}${newProduct.amount || "0.00"}`,
      stock: 0,
    }
    
    // Añadimos el nuevo producto al inicio de la lista
    setProducts([formattedProduct, ...products])
  }
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gestión de Productos</h2>
          <p className="text-slate-600 mt-1">Catálogo integral de productos y suministros</p>
        </div>
        <AddProductDialog onAddProduct={handleAddProduct} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Buscar productos por nombre, código o categoría..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={(id) => console.log('Ver producto', id)}
            onAddToCart={(id) => console.log('Agregar al carrito', id)}
            onMoreOptions={(id) => console.log('Más opciones', id)}
          />
        ))}
      </div>
    </div>
  )
}
