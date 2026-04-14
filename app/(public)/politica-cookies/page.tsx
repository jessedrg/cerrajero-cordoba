import { Metadata } from "next"
import { Cookie } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Cerrajero Córdoba 24H.",
}

export default function PoliticaCookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 mb-6">
            <Cookie className="h-8 w-8 text-slate-900" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Política de Cookies</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-10">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  1. ¿Qué son las cookies?
                </h2>
                <p className="text-slate-600">
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Estas cookies nos ayudan a mejorar su experiencia de navegación y a entender cómo utiliza nuestro sitio web.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  2. Tipos de cookies que utilizamos
                </h2>
                <ul className="space-y-4 text-slate-600">
                  <li>
                    <span className="font-medium text-slate-900">Cookies técnicas:</span> Son necesarias para el funcionamiento básico del sitio web.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">Cookies analíticas:</span> Nos ayudan a entender cómo los visitantes interactúan con el sitio web.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">Cookies de preferencias:</span> Permiten recordar sus preferencias de navegación.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  3. Cookies utilizadas en este sitio web
                </h2>
                <div className="bg-slate-50 rounded-xl p-6 text-sm">
                  <div className="grid grid-cols-3 gap-4 font-medium text-slate-900 border-b border-slate-200 pb-3 mb-3">
                    <span>Nombre</span>
                    <span>Finalidad</span>
                    <span>Duración</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-slate-600 py-2 border-b border-slate-100">
                    <span>_ga</span>
                    <span>Analítica</span>
                    <span>2 años</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-slate-600 py-2">
                    <span>cookie_consent</span>
                    <span>Preferencias</span>
                    <span>1 año</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  4. ¿Cómo gestionar las cookies?
                </h2>
                <p className="text-slate-600">
                  Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  5. Actualización de la política
                </h2>
                <p className="text-slate-600">
                  Esta política de cookies puede actualizarse en cualquier momento. Le recomendamos que revise esta página periódicamente para estar informado sobre cómo utilizamos las cookies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  6. Contacto
                </h2>
                <p className="text-slate-600">
                  Para cualquier consulta relacionada con las cookies, puede contactar con nosotros a través del teléfono <span className="font-semibold text-amber-600">900 433 189</span> o enviando un email a <span className="font-semibold text-amber-600">info@cerrajerocordoba.es</span>.
                </p>
              </div>

              <p className="text-sm text-slate-500 pt-6 border-t border-slate-200">
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
