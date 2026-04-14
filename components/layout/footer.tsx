import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const PHONE_NUMBER = "900433189"
const PHONE_DISPLAY = "900 433 189"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.jpg"
                alt="Cerrajero Córdoba 24H"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <span className="font-bold text-xl text-amber-400">Cerrajero Córdoba</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Cerrajeros profesionales en Córdoba y provincia. Servicio urgente 24 horas, 365 días del año.
            </p>
            <div className="space-y-4">
              <a href={`tel:+34${PHONE_NUMBER}`} className="flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors font-semibold text-lg">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                  <Phone className="h-5 w-5 text-amber-400" />
                </div>
                {PHONE_DISPLAY}
              </a>
              <a href="mailto:info@cerrajerocordoba.es" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <div className="bg-slate-800 p-2.5 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                info@cerrajerocordoba.es
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="bg-slate-800 p-2.5 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                Córdoba y provincia
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="bg-slate-800 p-2.5 rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
                24 horas / 365 días
              </div>
            </div>
          </div>

          {/* Servicios de Cerrajería */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6">Cerrajeros</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cerrajero" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cerrajero 24 horas
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Apertura de puertas
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cambio de cerraduras
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cerraduras de seguridad
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cerrajería urgente
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/politica-privacidad"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/aviso-legal"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link 
                  href="/politica-cookies"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Cerrajero Córdoba 24H. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href={`tel:+34${PHONE_NUMBER}`} className="text-slate-400 hover:text-amber-400 transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a href="https://www.cerrajerocordoba.es" className="text-slate-400 hover:text-amber-400 transition-colors">
              www.cerrajerocordoba.es
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
