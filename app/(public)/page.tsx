import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Key, 
  ArrowRight,
  Phone,
  Shield,
  Clock,
  Star,
  CheckCircle,
  MapPin,
  Lock,
  DoorOpen,
  KeyRound
} from "lucide-react"

const PHONE_NUMBER = "900433189"
const PHONE_DISPLAY = "900 433 189"

const serviciosCerrajeria = [
  {
    icon: DoorOpen,
    title: "Apertura de puertas",
    description: "Abrimos tu puerta sin daños en 15-30 minutos. Servicio urgente 24h."
  },
  {
    icon: Lock,
    title: "Cambio de cerraduras",
    description: "Instalamos cerraduras de alta seguridad antibumping y antipalanca."
  },
  {
    icon: KeyRound,
    title: "Copia de llaves",
    description: "Duplicamos todo tipo de llaves, incluidas las de seguridad."
  },
  {
    icon: Key,
    title: "Cerraduras de seguridad",
    description: "Bombillos de seguridad, cerrojos y sistemas antirrobo."
  },
]

const zonas = [
  "Córdoba capital",
  "Lucena", 
  "Puente Genil",
  "Montilla",
  "Priego de Córdoba",
  "Cabra",
  "Baena",
  "Palma del Río"
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4" />
              Servicio 24 horas - Llegamos en 15-30 min
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-white">
              Cerrajero Córdoba{" "}
              <span className="text-amber-400">24 Horas</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto text-pretty leading-relaxed">
              Cerrajeros profesionales en Córdoba y provincia. Apertura de puertas, 
              cambio de cerraduras y servicios urgentes. Presupuesto gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="gap-2 text-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold h-14 px-8">
                <a href={`tel:+34${PHONE_NUMBER}`}>
                  <Phone className="h-5 w-5" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white h-14 px-8" asChild>
                <Link href="/cerrajero">
                  Ver servicios
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Disponible 24/7
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-500" />
                2 años de garantía
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                +500 clientes satisfechos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios de Cerrajería */}
      <section id="servicios" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Cerrajeros</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Servicios profesionales de cerrajería en Córdoba y provincia con respuesta inmediata.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {serviciosCerrajeria.map((servicio, index) => {
              const IconComponent = servicio.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-amber-400 bg-white">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="mb-5 inline-flex p-4 rounded-2xl bg-slate-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-slate-900">{servicio.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {servicio.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" asChild className="gap-2 bg-slate-900 hover:bg-slate-800 text-white">
              <Link href="/cerrajero">
                Ver todos los servicios
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">¿Por qué elegirnos?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Clock className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Respuesta en 15-30 min</h3>
              <p className="text-slate-600">
                Cerrajeros disponibles las 24 horas para urgencias en toda Córdoba.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Shield className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Garantía de 2 años</h3>
              <p className="text-slate-600">
                Todos nuestros trabajos incluyen garantía por escrito.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="h-10 w-10 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Presupuesto gratis</h3>
              <p className="text-slate-600">
                Te damos el precio antes de empezar. Sin sorpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zonas de servicio */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Zonas de servicio</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Cubrimos toda la provincia de Córdoba con servicio urgente 24 horas.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {zonas.map((zona, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-slate-200 shadow-sm"
              >
                <MapPin className="h-4 w-4 text-amber-500" />
                <span className="text-slate-700 font-medium">{zona}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white text-balance">
              ¿Necesitas un cerrajero urgente?
            </h2>
            <p className="text-xl text-slate-300 mb-4">
              Llámanos ahora y estaremos contigo en 15-30 minutos
            </p>
            <p className="text-5xl font-bold text-amber-400 mb-8">
              {PHONE_DISPLAY}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2 text-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold h-14 px-8">
                <a href={`tel:+34${PHONE_NUMBER}`}>
                  <Phone className="h-5 w-5" />
                  Llamar Ahora
                </a>
              </Button>
              <Button 
                size="lg" 
                asChild
                variant="outline"
                className="gap-2 text-lg border-slate-600 text-slate-200 hover:bg-slate-800 h-14 px-8"
              >
                <a href="https://wa.me/34711267223" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
