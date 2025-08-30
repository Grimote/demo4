import { Package, ShoppingCart, Eye, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id?: number;
    name: string;
    category: string;
    price: string;
    stock: number;
  };
  onView?: (id: number) => void;
  onAddToCart?: (id: number) => void;
  onMoreOptions?: (id: number) => void;
}

export function ProductCard({ product, onView, onAddToCart, onMoreOptions }: ProductCardProps) {
  return (
    <Card
      className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
    >
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg flex items-center justify-center">
          <Package className="h-16 w-16 text-slate-400" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => product.id && onMoreOptions && onMoreOptions(product.id)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-blue-600">{product.price}</span>
            <span className="text-sm text-slate-600">Stock: {product.stock}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => product.id && onAddToCart && onAddToCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => product.id && onView && onView(product.id)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}