"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Package, Edit } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    productName: string
    sector: string
    currentStock: number
    minStock: number
    currency?: string
    value?: number
  }
  onViewDetails?: (product: any) => void
  onEdit?: (product: any) => void
}

export function ProductCard({ product, onViewDetails, onEdit }: ProductCardProps) {
  const isLowStock = product.currentStock < product.minStock
  
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-slate-600">{product.sector}</span>
          </div>
          {isLowStock ? (
            <Badge variant="destructive">Stock Bajo</Badge>
          ) : (
            <Badge variant="default">Stock Normal</Badge>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">{product.productName}</h3>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Stock actual:</span>
          <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-blue-600'}`}>
            {product.currentStock}
          </span>
        </div>
        {product.currency && product.value !== undefined && (
          <div className="flex items-center justify-between text-sm text-slate-600 mt-1">
            <span>Valor unitario:</span>
            <span className="font-semibold text-slate-700">
              {product.currency === 'PEN' ? 'S/ ' : '$'}{product.value.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-center space-x-2 mt-4">
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={() => onViewDetails && onViewDetails(product)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit && onEdit(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}