import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  status?: "success" | "warning" | "error"
  change?: string
}

const statusColors = {
  success: "text-green-500",
  warning: "text-orange-500",
  error: "text-red-500",
}

export function StatCard({ label, value, unit = "", status, change }: StatCardProps) {
  return (
    <Card className="bg-card/50 border-border/40 p-6">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-foreground">
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </div>
          {change && <p className={`text-xs mt-2 ${statusColors[status || "success"]}`}>{change}</p>}
        </div>
      </div>
    </Card>
  )
}
