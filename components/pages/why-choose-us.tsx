import { Shield, Clock, CheckCircle, Award, ThumbsUp, Wrench, Zap, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhyChooseUsProps {
  reasons: {
    title: string
    description: string
    icon?: string
  }[]
  serviceName: string
  cityName: string
  colorScheme?: string
}

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  clock: Clock,
  check: CheckCircle,
  award: Award,
  thumbsup: ThumbsUp,
  wrench: Wrench,
  zap: Zap,
  heart: Heart,
}

const colorVariants: Record<string, { icon: string; bg: string; gradient: string }> = {
  blue: { icon: "text-blue-600", bg: "bg-blue-100", gradient: "from-blue-400 to-blue-500" },
  green: { icon: "text-green-600", bg: "bg-green-100", gradient: "from-green-400 to-green-500" },
  orange: { icon: "text-orange-600", bg: "bg-orange-100", gradient: "from-orange-400 to-orange-500" },
  teal: { icon: "text-teal-600", bg: "bg-teal-100", gradient: "from-teal-400 to-teal-500" },
  indigo: { icon: "text-indigo-600", bg: "bg-indigo-100", gradient: "from-indigo-400 to-indigo-500" },
  emerald: { icon: "text-emerald-600", bg: "bg-emerald-100", gradient: "from-emerald-400 to-emerald-500" },
  amber: { icon: "text-slate-900", bg: "bg-gradient-to-br from-amber-400 to-amber-500", gradient: "from-amber-400 to-amber-500" },
  cyan: { icon: "text-cyan-600", bg: "bg-cyan-100", gradient: "from-cyan-400 to-cyan-500" },
}

export function WhyChooseUs({ reasons, serviceName, cityName, colorScheme = "blue" }: WhyChooseUsProps) {
  const colors = colorVariants[colorScheme] || colorVariants.blue

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          ¿Por qué elegir nuestro servicio de {serviceName} en {cityName}?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Somos profesionales comprometidos con la calidad y la satisfacción de nuestros clientes
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {reasons.slice(0, 3).map((reason, index) => {
          const IconComponent = iconMap[reason.icon?.toLowerCase() || "check"] || CheckCircle
          return (
            <div 
              key={index}
              className="text-center space-y-4"
            >
              <div className={cn("mx-auto w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg", colors.bg)}>
                <IconComponent className={cn("h-10 w-10", colors.icon)} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{reason.title}</h3>
              <p className="text-slate-600">
                {reason.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
