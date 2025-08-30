"use client"

import {
  Activity,
  BarChart2,
  BarChart3,
  Briefcase,
  ChevronRight,
  CreditCard,
  FileText,
  FolderKanban,
  FolderOpen,
  HelpCircle,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Users2,
  Warehouse,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const modules = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3 },
  { id: "logistics", name: "Logística", icon: Truck },
  { id: "inventory", name: "Inventario", icon: Warehouse },
  { id: "products", name: "Productos", icon: Package },
  { id: "suppliers", name: "Proveedores", icon: Users },
  { id: "services", name: "Servicios", icon: Briefcase },
  { id: "purchases", name: "Compras", icon: ShoppingCart },
  {
    id: "contracts-group",
    name: "Portafolio",
    icon: FolderKanban,
    submodules: [
      { id: "contracts", name: "Contratos", icon: FileText },
      { id: "projects", name: "Proyectos", icon: FolderOpen },
    ],
  },
  { id: "payments", name: "Pagos", icon: CreditCard },
  { id: "communication", name: "Comunicación", icon: MessageSquare },
  { id: "areas", name: "Áreas Internas", icon: Users2 },
  { id: "monitoring", name: "Monitoreo", icon: Activity },
  { id: "reports", name: "Reportes", icon: BarChart2 },
  { id: "support", name: "Soporte", icon: HelpCircle },
]

interface SidebarProps {
  activeModule: string
  setActiveModule: (id: string) => void
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  return (
    <aside className="w-72 border-r border-slate-200/60 bg-white/60 backdrop-blur-xl fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
      <div className="p-6">
        <nav className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon
            // @ts-ignore
            if (module.submodules && module.submodules.length > 0) {
              const isParentActive =
                // @ts-ignore
                module.submodules.some((sub) => sub.id === activeModule) ||
                activeModule === module.id
              return (
                <Collapsible
                  key={module.id}
                  className="space-y-1"
                  defaultOpen={isParentActive}
                >
                  <CollapsibleTrigger className="w-full">
                    <div
                      className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isParentActive
                          ? "bg-slate-100/90 text-slate-900"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{module.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-90" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-1 pl-6">
                    <div className="space-y-1">
                      {/* @ts-ignore */}
                      {module.submodules.map((submodule) => (
                        <button
                          key={submodule.id}
                          onClick={() => setActiveModule(submodule.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm ${
                            activeModule === submodule.id
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                              : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                          }`}
                        >
                          <submodule.icon
                            className="h-5 w-5 flex-shrink-0"
                          />
                          <span className="font-medium">
                            {submodule.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            }
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeModule === module.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{module.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-200/60">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-200">
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">Configuración</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
