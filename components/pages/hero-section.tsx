import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, CheckCircle, Clock, Shield, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const DEFAULT_PHONE_NUMBER = "900433189"
const DEFAULT_PHONE_DISPLAY = "900 433 189"

interface CTAConfig {
  phone_number?: string
  phone_display?: string
  button_text?: string
  secondary_button_text?: string
  badge_1?: string
  badge_2?: string
  badge_3?: string
}

interface DesignVariation {
  layout_variant?: string
  color_scheme?: string
  hero_style?: string
  spacing_variant?: string
}

interface HeroSectionProps {
  title: string
  titleVariant?: string
  subtitle?: string
  highlight?: string
  imageUrl?: string
  imageAlt?: string
  cityName: string
  serviceName: string
  ctaMain?: string
  ctaUrgency?: string
  ctaConfig?: CTAConfig
  designVariation?: DesignVariation
  heroHeight?: string
  overlayOpacity?: number
  showButtons?: boolean
}

const colorSchemes: Record<string, { gradient: string; accent: string; button: string; bg: string; text: string }> = {
  blue: { gradient: "from-blue-600/10 via-blue-500/5 to-background", accent: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700", bg: "bg-blue-50", text: "text-blue-900" },
  green: { gradient: "from-green-600/10 via-green-500/5 to-background", accent: "text-green-600", button: "bg-green-600 hover:bg-green-700", bg: "bg-green-50", text: "text-green-900" },
  orange: { gradient: "from-orange-500/10 via-orange-500/5 to-background", accent: "text-orange-500", button: "bg-orange-500 hover:bg-orange-600", bg: "bg-orange-50", text: "text-orange-900" },
  teal: { gradient: "from-teal-600/10 via-teal-500/5 to-background", accent: "text-teal-600", button: "bg-teal-600 hover:bg-teal-700", bg: "bg-teal-50", text: "text-teal-900" },
  indigo: { gradient: "from-indigo-600/10 via-indigo-500/5 to-background", accent: "text-indigo-600", button: "bg-indigo-600 hover:bg-indigo-700", bg: "bg-indigo-50", text: "text-indigo-900" },
  emerald: { gradient: "from-emerald-600/10 via-emerald-500/5 to-background", accent: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700", bg: "bg-emerald-50", text: "text-emerald-900" },
  amber: { gradient: "from-slate-900 via-slate-800 to-slate-900", accent: "text-amber-400", button: "bg-amber-500 hover:bg-amber-400 text-slate-900", bg: "bg-slate-900", text: "text-white" },
  cyan: { gradient: "from-cyan-600/10 via-cyan-500/5 to-background", accent: "text-cyan-600", button: "bg-cyan-600 hover:bg-cyan-700", bg: "bg-cyan-50", text: "text-cyan-900" },
}

const spacingVariants: Record<string, string> = {
  compact: "py-12 lg:py-16",
  standard: "py-16 lg:py-24",
  spacious: "py-20 lg:py-32",
  generous: "py-24 lg:py-40",
}

export function HeroSection({
  title,
  titleVariant,
  subtitle,
  highlight,
  imageUrl,
  imageAlt,
  cityName,
  serviceName,
  ctaMain,
  ctaUrgency,
  ctaConfig = {},
  designVariation = {},
  heroHeight,
  overlayOpacity = 0.7,
  showButtons = true,
}: HeroSectionProps) {
  const { 
    layout_variant = "standard",
    color_scheme = "blue", 
    hero_style = "gradient",
    spacing_variant = "standard"
  } = designVariation

  // CTA configuration with defaults
  const phoneNumber = ctaConfig.phone_number || DEFAULT_PHONE_NUMBER
  const phoneDisplay = ctaConfig.phone_display || DEFAULT_PHONE_DISPLAY
  const buttonText = ctaConfig.button_text || "Hablemos"
  const whatsappNumber = "34711267223"
  const badge1 = ctaConfig.badge_1 || "Disponible 24h"
  const badge2 = ctaConfig.badge_2 || "Sin compromiso"
  const badge3 = ctaConfig.badge_3 || "Presupuesto gratis"

  const colors = colorSchemes[color_scheme] || colorSchemes.orange
  const spacing = spacingVariants[spacing_variant] || spacingVariants.standard
  const altText = imageAlt || `${serviceName} en ${cityName}`

  // Seleccionar título basado en variación
  const displayTitle = layout_variant === "hero-split" ? (titleVariant || title) : title

  // Layout: Hero Split (imagen a la izquierda)
  if (layout_variant === "hero-split") {
    return (
      <section className={cn("relative overflow-hidden", heroHeight || spacing)}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Imagen primero en split */}
<div className="flex items-center justify-center order-2 lg:order-1">
              {imageUrl ? (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={altText}
                  width={400}
                  height={400}
                  className="w-auto h-auto max-w-full max-h-[350px] lg:max-h-[420px] object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                {/* Badge flotante */}
                <div className="absolute top-4 left-4 bg-background/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                  <span className={cn("font-semibold", colors.accent)}>En {cityName}</span>
                </div>
              </div>
              ) : (
                <div className={cn("w-full aspect-[4/3] rounded-3xl bg-gradient-to-br", colors.gradient, "flex items-center justify-center relative")}>
                  <div className="text-center">
                    <span className={cn("text-7xl font-bold", colors.accent)}>{serviceName.charAt(0)}</span>
                    <p className="text-muted-foreground mt-2">{cityName}</p>
                  </div>
                  {/* Badge flotante */}
                  <div className="absolute top-4 left-4 bg-background/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <span className={cn("font-semibold", colors.accent)}>En {cityName}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Contenido */}
            <div className="space-y-8 order-1 lg:order-2">
              {highlight && (
                <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-orange-100", colors.accent)}>
                  <Star className="h-4 w-4 fill-current" />
                  {highlight}
                </div>
              )}
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                {displayTitle}
              </h1>
              {subtitle && (
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
                  {subtitle}
                </p>
              )}
{showButtons && (
<div className="flex flex-col sm:flex-row gap-3">
<Button size="lg" asChild className={cn("gap-2 text-white", colors.button)}>
<a href={`tel:+34${phoneNumber}`}>
<Phone className="h-5 w-5" />
{buttonText}
</a>
</Button>
<Button size="lg" asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
<MessageSquare className="h-5 w-5" />
WhatsApp
</a>
</Button>
<Button size="lg" variant="outline" asChild className="gap-2 bg-white text-gray-900 hover:bg-gray-100 border-gray-300 shadow-sm">
<a href={`tel:+34${phoneNumber}`}>
<Phone className="h-4 w-4" />
{phoneDisplay}
</a>
</Button>
</div>
)}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className={cn("h-5 w-5", colors.accent)} />
                  <span>{badge1}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className={cn("h-5 w-5", colors.accent)} />
                  <span>{badge2}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className={cn("h-5 w-5", colors.accent)} />
                  <span>{badge3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Layout: Hero Centered
  if (layout_variant === "hero-centered") {
    return (
      <section className={cn("relative overflow-hidden bg-gradient-to-b", colors.gradient, heroHeight || spacing)}>
        {imageUrl && (
          <div className="absolute inset-0" style={{ opacity: 1 - overlayOpacity }}>
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="100vw" />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {highlight && (
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-background/80 backdrop-blur", colors.accent)}>
                <Star className="h-4 w-4 fill-current" />
                {highlight}
              </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            {showButtons && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button size="lg" asChild className={cn("gap-2 text-white", colors.button)}>
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {buttonText}
                </a>
              </Button>
              <Button size="lg" asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-white text-gray-900 hover:bg-gray-100 border-white shadow-md">
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              </Button>
            </div>
            )}
            {ctaUrgency && (
              <p className={cn("text-sm font-medium", colors.accent)}>{ctaUrgency}</p>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Layout: Hero Minimal
  if (layout_variant === "hero-minimal") {
    return (
      <section className={cn("relative", heroHeight || spacing, "border-b")}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <div className={cn("text-sm font-medium uppercase tracking-wider", colors.accent)}>
              {serviceName} en {cityName}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            {showButtons && (
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className={cn("gap-2 text-white", colors.button)}>
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {buttonText}
                </a>
              </Button>
              <Button size="lg" asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-white text-gray-900 hover:bg-gray-100 border-gray-300">
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              </Button>
            </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Layout: Hero Full (con imagen de fondo grande)
  if (layout_variant === "hero-full") {
    return (
      <section className={cn("relative flex items-center", heroHeight || "min-h-[70vh]")}>
        {imageUrl && (
          <div className="absolute inset-0">
            <Image src={imageUrl} alt={altText} fill className="object-cover" sizes="100vw" priority />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" 
              style={{ opacity: overlayOpacity }}
            />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-8 py-16">
            {highlight && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-background/90 backdrop-blur">
                <Star className={cn("h-4 w-4 fill-current", colors.accent)} />
                {highlight}
              </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            {showButtons && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className={cn("gap-2 text-white", colors.button)}>
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {buttonText}
                </a>
              </Button>
              <Button size="lg" asChild className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-white text-gray-900 hover:bg-gray-100 border-white shadow-md">
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              </Button>
            </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Layout: Standard (default)
  // En mobile: H1 -> Imagen -> Texto principal
  // En desktop: grid con texto a la izquierda e imagen a la derecha
  // Amber theme uses dark background with light text
  const isDarkTheme = color_scheme === "amber"
  const textColor = isDarkTheme ? "text-white" : ""
  const subtitleColor = isDarkTheme ? "text-slate-300" : "text-muted-foreground"
  const badgeColor = isDarkTheme ? "text-slate-400" : "text-muted-foreground"
  const highlightBg = isDarkTheme ? "bg-amber-500/20 border border-amber-500/30" : "bg-background"
  
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-br", colors.gradient, heroHeight || spacing)}>
      {isDarkTheme && <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>}
      <div className="container mx-auto px-4 pt-6 pb-8 lg:pt-8 lg:pb-12 relative">
        {/* Mobile layout: flex column con orden especifico */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Bloque 1: Highlight + H1 (siempre primero en mobile) */}
          <div className="w-full lg:row-span-2 space-y-4 lg:space-y-6">
            {highlight && (
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium", highlightBg, colors.accent)}>
                <Clock className="h-4 w-4" />
                {highlight}
              </div>
            )}
            <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance", textColor)}>
              {title}
            </h1>
            
            {/* En desktop: subtitle (H2) y badges van aqui debajo del H1 */}
            <div className="hidden lg:block space-y-4">
              {subtitle && (
                <h2 className={cn("text-xl lg:text-2xl font-normal leading-relaxed text-pretty", subtitleColor)}>
                  {subtitle}
                </h2>
              )}
              {showButtons && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" asChild className={cn("gap-2 w-full sm:w-auto font-semibold h-14 px-8", colors.button)}>
                  <a href={`tel:+34${phoneNumber}`}>
                    <Phone className="h-5 w-5" />
                    {phoneDisplay}
                  </a>
                </Button>
                <Button size="lg" asChild className={cn("gap-2 w-full sm:w-auto h-14 px-8", isDarkTheme ? "bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900" : "bg-green-600 hover:bg-green-700 text-white")}>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
              )}
              <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm", badgeColor)}>
                <span className="flex items-center gap-2">
                  <Clock className={cn("h-5 w-5", colors.accent)} />
                  {badge1}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className={cn("h-5 w-5", colors.accent)} />
                  {badge2}
                </span>
                <span className="flex items-center gap-2">
                  <Star className={cn("h-5 w-5", colors.accent)} />
                  {badge3}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bloque 2: Imagen (segundo en mobile, derecha en desktop) */}
          <div className="flex items-center justify-center w-full">
            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={altText}
                  width={500}
                  height={400}
                  className="w-auto h-auto max-w-full max-h-[300px] lg:max-h-[450px] object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            ) : (
              <div className={cn("w-full aspect-[4/3] rounded-2xl flex items-center justify-center", isDarkTheme ? "bg-slate-800/50" : "bg-gradient-to-br " + colors.gradient)}>
                <div className="text-center">
                  <span className={cn("text-6xl lg:text-8xl font-bold", colors.accent)}>{serviceName.charAt(0)}</span>
                  <p className={cn("text-lg lg:text-xl mt-4", subtitleColor)}>{cityName}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Bloque 3: Subtitle (H2) y badges (solo en mobile, despues de imagen) */}
          <div className="lg:hidden w-full space-y-4">
            {subtitle && (
              <h2 className={cn("text-lg font-normal leading-relaxed text-pretty", subtitleColor)}>
                {subtitle}
              </h2>
            )}
            {showButtons && (
            <div className="flex flex-col gap-3 pt-2">
              <Button size="lg" asChild className={cn("gap-2 w-full font-semibold h-14", colors.button)}>
                <a href={`tel:+34${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {phoneDisplay}
                </a>
              </Button>
              <Button size="lg" asChild className={cn("gap-2 w-full h-14", isDarkTheme ? "bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900" : "bg-green-600 hover:bg-green-700 text-white")}>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
            )}
            <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm", badgeColor)}>
              <span className="flex items-center gap-2">
                <Clock className={cn("h-5 w-5", colors.accent)} />
                {badge1}
              </span>
              <span className="flex items-center gap-2">
                <Shield className={cn("h-5 w-5", colors.accent)} />
                {badge2}
              </span>
              <span className="flex items-center gap-2">
                <Star className={cn("h-5 w-5", colors.accent)} />
                {badge3}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
