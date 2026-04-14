import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Clock, Shield, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const PHONE_NUMBER = "900433189"
const PHONE_DISPLAY = "900 433 189"

// Textos en español con tildes y ñ
const LABELS = {
  response: "Respuesta en 30 min",
  guaranteed: "Servicio garantizado",
  noCommitment: "Sin compromiso",
  callNow: "Llamar Ahora",
  freeBudget: "Presupuesto Gratis",
}

interface CTASectionProps {
  title?: string
  description?: string
  ctaText?: string
  ctaSecondary?: string
  urgencyText?: string
  priceFrom?: number
  cityName: string
  serviceName: string
  className?: string
  colorScheme?: string
  style?: string
  badges?: string[]
}

const colorVariants: Record<string, { bg: string; button: string; buttonSecondary: string; text: string; accent: string }> = {
  blue: { bg: "bg-blue-600", button: "bg-white text-blue-600 hover:bg-blue-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-blue-100", accent: "text-blue-400" },
  green: { bg: "bg-green-600", button: "bg-white text-green-600 hover:bg-green-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-green-100", accent: "text-green-400" },
  orange: { bg: "bg-orange-600", button: "bg-white text-orange-600 hover:bg-orange-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-orange-100", accent: "text-orange-400" },
  teal: { bg: "bg-teal-600", button: "bg-white text-teal-600 hover:bg-teal-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-teal-100", accent: "text-teal-400" },
  indigo: { bg: "bg-indigo-600", button: "bg-white text-indigo-600 hover:bg-indigo-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-indigo-100", accent: "text-indigo-400" },
  emerald: { bg: "bg-emerald-600", button: "bg-white text-emerald-600 hover:bg-emerald-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-emerald-100", accent: "text-emerald-400" },
  amber: { bg: "bg-slate-900", button: "bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold", buttonSecondary: "border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900", text: "text-slate-300", accent: "text-amber-400" },
  cyan: { bg: "bg-cyan-600", button: "bg-white text-cyan-600 hover:bg-cyan-50", buttonSecondary: "border-white text-white hover:bg-white/10", text: "text-cyan-100", accent: "text-cyan-400" },
}

export function CTASection({
  title,
  description,
  ctaText = "Solicitar Presupuesto Gratis",
  ctaSecondary,
  urgencyText,
  priceFrom,
  cityName,
  serviceName,
  className = "",
  colorScheme = "blue",
  style = "button-primary",
  badges,
}: CTASectionProps) {
  const colors = colorVariants[colorScheme] || colorVariants.blue

  // Style: Card CTA (mas compacto, tarjeta)
  if (style === "card-cta") {
    return (
      <div className={cn("max-w-2xl mx-auto", className)}>
        <div className={cn("rounded-2xl p-8 text-white", colors.bg)}>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">
              {title || `Contacta con tu ${serviceName} en ${cityName}`}
            </h3>
            {priceFrom && (
              <p className="text-3xl font-bold">
                Desde {priceFrom}€
              </p>
            )}
            {urgencyText && (
              <p className={cn("text-sm", colors.text)}>{urgencyText}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" className={cn("gap-2", colors.button)}>
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white text-gray-900 border-white hover:bg-gray-100 shadow-md">
                <MessageSquare className="h-5 w-5" />
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Style: Floating CTA (minimalista)
  if (style === "floating-cta") {
    return (
      <div className={cn("max-w-3xl mx-auto", className)}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-card rounded-2xl border shadow-lg">
          <div>
            <h3 className="text-xl font-bold mb-1">
              {title || `¿Necesitas un ${serviceName} en ${cityName}?`}
            </h3>
            <p className="text-muted-foreground">
              {urgencyText || "Respuesta en menos de 30 minutos"}
            </p>
          </div>
          <Button size="lg" className={cn("gap-2 whitespace-nowrap", colors.bg, "text-white hover:opacity-90")}>
            {ctaText}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  // Style: Button Gradient
  if (style === "button-gradient") {
    return (
      <div className={cn("max-w-4xl mx-auto text-center", className)}>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 lg:p-14 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            {title || `¿Buscas un ${serviceName} de confianza en ${cityName}?`}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {description || `Profesionales cualificados, precios competitivos y servicio garantizado en ${cityName} y alrededores.`}
          </p>
          
          {priceFrom && (
            <div className="mb-8">
              <span className="text-sm text-gray-400">Desde</span>
              <span className="text-4xl font-bold ml-2">{priceFrom}€</span>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0">
              <Phone className="h-5 w-5" />
              Llamar Ahora
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-gray-600 text-white hover:bg-gray-800">
              <MessageSquare className="h-5 w-5" />
              {ctaText}
            </Button>
          </div>
          
          {urgencyText && (
            <p className="mt-6 text-sm text-green-400">{urgencyText}</p>
          )}
        </div>
      </div>
    )
  }

  // Style: Button Primary (default)
  const isAmber = colorScheme === "amber"
  
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <div className={cn("rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden", colors.bg)}>
        {isAmber && <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>}
        <div className="text-center space-y-6 relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            {title || `¿Necesitas un ${serviceName} en ${cityName}?`}
          </h2>
          <p className={cn("text-lg text-pretty max-w-2xl mx-auto", colors.text)}>
            {description || `Contacta con nosotros para obtener un presupuesto sin compromiso. Servicio profesional y garantizado en toda la zona de ${cityName}.`}
          </p>
          
          {priceFrom && (
            <div className="py-2">
              <span className={cn("text-sm", colors.text)}>Desde</span>
              <span className={cn("text-5xl font-bold ml-2", isAmber ? "text-amber-400" : "")}>{priceFrom}€</span>
            </div>
          )}
          
          <p className={cn("text-5xl font-bold", colors.accent)}>{PHONE_DISPLAY}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className={cn("gap-2 text-lg h-14 px-8", colors.button)}>
              <a href={`tel:+34${PHONE_NUMBER}`}>
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className={cn("gap-2 text-lg h-14 px-8", colors.buttonSecondary)}
            >
              <a href="https://wa.me/34711267223" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Custom badges or default badges */}
          {badges && badges.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {badges.map((badge, idx) => (
                <span key={idx} className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-sm", isAmber ? "bg-amber-500/20" : "bg-white/20")}>
                  {badge}
                </span>
              ))}
            </div>
          ) : (
            <div className={cn("flex flex-wrap justify-center gap-6 pt-6 text-sm", colors.text)}>
              <span className="flex items-center gap-2">
                <Clock className={cn("h-5 w-5", colors.accent)} />
                {LABELS.response}
              </span>
              <span className="flex items-center gap-2">
                <Shield className={cn("h-5 w-5", colors.accent)} />
                {LABELS.guaranteed}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className={cn("h-5 w-5", colors.accent)} />
                {LABELS.noCommitment}
              </span>
            </div>
          )}
          
          {urgencyText && (
            <p className={cn("text-sm font-medium", colors.accent)}>{urgencyText}</p>
          )}
        </div>
      </div>
    </div>
  )
}
