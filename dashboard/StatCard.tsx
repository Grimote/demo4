"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            <p className={`text-sm font-medium mt-1 ${color}`}>{change} vs mes anterior</p>
          </div>
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              color.includes("emerald")
                ? "from-emerald-500 to-emerald-600"
                : color.includes("blue")
                  ? "from-blue-500 to-blue-600"
                  : color.includes("purple")
                    ? "from-purple-500 to-purple-600"
                    : "from-orange-500 to-orange-600"
            }`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
