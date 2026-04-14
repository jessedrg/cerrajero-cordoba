import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Wrench, 
  Zap, 
  Droplet,
  Thermometer, 
  Shield, 
  Clock,
  CheckCircle,
  Settings,
  Flame,
  Hammer,
  Paintbrush,
  Key,
  Bug
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceItem {
  name: string
  description: string
  icon?: string
  price_from?: number | null
  duration?: string | null
}

interface ServicesListProps {
  services: ServiceItem[]
  title?: string
  className?: string
  colorScheme?: string
  layout?: "grid" | "list" | "cards"
  showPrices?: boolean
  showDuration?: boolean
}

const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  zap: Zap,
  droplet: Droplet,
  droplets: Droplet,
  thermometer: Thermometer,
  shield: Shield,
  clock: Clock,
  check: CheckCircle,
  settings: Settings,
  flame: Flame,
  hammer: Hammer,
  paintbrush: Paintbrush,
  key: Key,
  bug: Bug,
}

const colorVariants: Record<string, { icon: string; bg: string; hover: string; border: string }> = {
  blue: { icon: "text-blue-600", bg: "bg-blue-50", hover: "group-hover:bg-blue-600", border: "hover:border-blue-400" },
  green: { icon: "text-green-600", bg: "bg-green-50", hover: "group-hover:bg-green-600", border: "hover:border-green-400" },
  orange: { icon: "text-orange-600", bg: "bg-orange-50", hover: "group-hover:bg-orange-600", border: "hover:border-orange-400" },
  teal: { icon: "text-teal-600", bg: "bg-teal-50", hover: "group-hover:bg-teal-600", border: "hover:border-teal-400" },
  indigo: { icon: "text-indigo-600", bg: "bg-indigo-50", hover: "group-hover:bg-indigo-600", border: "hover:border-indigo-400" },
  emerald: { icon: "text-emerald-600", bg: "bg-emerald-50", hover: "group-hover:bg-emerald-600", border: "hover:border-emerald-400" },
  amber: { icon: "text-amber-400", bg: "bg-slate-900", hover: "group-hover:bg-amber-500 group-hover:text-slate-900", border: "hover:border-amber-400" },
  cyan: { icon: "text-cyan-600", bg: "bg-cyan-50", hover: "group-hover:bg-cyan-600", border: "hover:border-cyan-400" },
}

export function ServicesList({ 
  services, 
  title = "Cerrajeros",
  className = "",
  colorScheme = "blue",
  layout = "grid",
  showPrices = true,
  showDuration = true,
}: ServicesListProps) {
  if (!services || services.length === 0) return null

  const colors = colorVariants[colorScheme] || colorVariants.blue

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      <h2 className="text-2xl font-bold mb-8 text-balance">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon ? iconMap[service.icon.toLowerCase()] || Wrench : Wrench
          
          return (
            <Card key={index} className={cn("group hover:shadow-xl transition-all duration-300 overflow-hidden border-slate-200", colors.border)}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={cn(
                      "p-2.5 rounded-xl transition-colors duration-300",
                      colors.bg,
                      colors.hover,
                      "group-hover:text-white"
                    )}>
                      <IconComponent className={cn("h-5 w-5 transition-colors", colors.icon, "group-hover:text-white")} />
                    </div>
                    <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                  </div>
                  {showPrices && service.price_from && (
                    <Badge variant="secondary" className="flex-shrink-0">
                      Desde {service.price_from}€
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                {showDuration && service.duration && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{service.duration}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
