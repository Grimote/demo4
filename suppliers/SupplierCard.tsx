import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface SupplierCardProps {
  supplier: {
    id: number;
    name: string;
    ruc: string;
    status: string;
    rating: number;
    initials: string;
    sector: string;
    subSector: string;
  };
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onMoreOptions: (id: number) => void;
}

export function SupplierCard({ supplier, onViewDetails, onEdit, onMoreOptions }: SupplierCardProps) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 bg-blue-600">
            <AvatarFallback className="text-white">{supplier.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{supplier.name}</h3>
                <p className="text-sm text-slate-500">RUC: {supplier.ruc}</p>
              </div>
              <Badge
                variant={supplier.status === "Activo" ? "secondary" : "outline"}
                className={supplier.status === "Activo" ? "bg-green-100 text-green-800" : ""}
              >
                {supplier.status}
              </Badge>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600 ml-1">{supplier.rating}</span>
              </div>
              <div className="flex items-center ml-4">
                <Badge variant="outline" className="text-xs">
                  {supplier.sector}
                </Badge>
                <span className="mx-1 text-slate-400">•</span>
                <Badge variant="outline" className="text-xs">
                  {supplier.subSector}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(supplier.id)}
          >
            <Eye className="h-4 w-4 mr-1" /> Ver
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(supplier.id)}
          >
            <Edit className="h-4 w-4 mr-1" /> Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoreOptions(supplier.id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}