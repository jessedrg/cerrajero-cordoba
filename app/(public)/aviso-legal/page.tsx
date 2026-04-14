import { Metadata } from "next"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal y condiciones de uso de Cerrajero Córdoba 24H.",
}

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 mb-6">
            <FileText className="h-8 w-8 text-slate-900" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Aviso Legal</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-10">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  1. Datos Identificativos
                </h2>
                <p className="text-slate-600 mb-4">
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se informa:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li><span className="font-medium text-slate-900">Denominación social:</span> Cerrajero Córdoba 24H</li>
                  <li><span className="font-medium text-slate-900">Dominio web:</span> www.cerrajerocordoba.es</li>
                  <li><span className="font-medium text-slate-900">Teléfono:</span> 900 433 189</li>
                  <li><span className="font-medium text-slate-900">Email:</span> info@cerrajerocordoba.es</li>
                  <li><span className="font-medium text-slate-900">Actividad:</span> Servicios de cerrajería</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  2. Objeto
                </h2>
                <p className="text-slate-600">
                  El presente aviso legal regula el uso del sitio web www.cerrajerocordoba.es, del que es titular Cerrajero Córdoba 24H. La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  3. Condiciones de Uso
                </h2>
                <p className="text-slate-600">
                  El usuario se compromete a utilizar el sitio web, sus contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público. El usuario se obliga a no utilizar el sitio web o los servicios que se presten a través de él con fines o efectos ilícitos o contrarios al contenido del presente Aviso Legal.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  4. Propiedad Intelectual
                </h2>
                <p className="text-slate-600">
                  Todos los contenidos del sitio web (incluyendo, sin carácter limitativo, bases de datos, imágenes, dibujos, gráficos, archivos de texto, audio, vídeo y software) son propiedad de Cerrajero Córdoba 24H o de sus proveedores de contenidos y están protegidos por las normas nacionales e internacionales de propiedad intelectual e industrial.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  5. Exclusión de Responsabilidad
                </h2>
                <p className="text-slate-600">
                  Cerrajero Córdoba 24H no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad o continuidad del funcionamiento del sitio web, de la defraudación de la utilidad que los usuarios hubieran podido atribuir al sitio web, de la fiabilidad del sitio web.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  6. Legislación Aplicable
                </h2>
                <p className="text-slate-600">
                  Las presentes condiciones se regirán por la legislación española, siendo competentes los Juzgados y Tribunales españoles para conocer de cuantas cuestiones se susciten sobre la interpretación, aplicación y cumplimiento de las mismas.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  7. Contacto
                </h2>
                <p className="text-slate-600">
                  Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros a través del teléfono <span className="font-semibold text-amber-600">900 433 189</span> o enviando un email a <span className="font-semibold text-amber-600">info@cerrajerocordoba.es</span>.
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
