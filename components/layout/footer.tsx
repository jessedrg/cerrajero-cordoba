import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

const PHONE_NUMBER = "900433189"
const PHONE_DISPLAY = "900 433 189"

async function getFooterData() {
  const supabase = await createClient()
  
  const [servicesResult, citiesResult] = await Promise.all([
    supabase
      .from("services")
      .select("name, slug")
      .order("name")
      .limit(6),
    supabase
      .from("cities")
      .select("name, slug")
      .order("population", { ascending: false, nullsFirst: false })
      .limit(6)
  ])
  
  return {
    services: servicesResult.data || [],
    cities: citiesResult.data || []
  }
}

export async function Footer() {
  const { services, cities } = await getFooterData()
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Cerrajero Córdoba 24H"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-lg text-primary">Cerrajero Córdoba</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Cerrajeros profesionales en Córdoba y provincia. Servicio urgente 24 horas, 365 días.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`tel:+34${PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors font-semibold">
                <Phone className="h-4 w-4 text-blue-600" />
                {PHONE_DISPLAY}
              </a>
              <a href="mailto:info@cerrajerocordoba.es" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                info@cerrajerocordoba.es
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Córdoba y provincia
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4">Ciudades</h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/fontanero-${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/politica-privacidad"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/aviso-legal"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link 
                  href="/politica-cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cerrajero Córdoba 24H. Todos los derechos reservados.</p>
          <p className="mt-2">
            <a href={`tel:+34${PHONE_NUMBER}`} className="hover:text-blue-600 transition-colors">
              Teléfono: {PHONE_DISPLAY}
            </a>
            {" | "}
            <a href="https://www.cerrajerocordoba.es" className="hover:text-primary transition-colors">
              www.cerrajerocordoba.es
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
