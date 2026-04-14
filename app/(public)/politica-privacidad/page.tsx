import { Metadata } from "next"
import { ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Cerrajero Córdoba 24H.",
}

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 mb-6">
            <ShieldCheck className="h-8 w-8 text-slate-900" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Política de Privacidad</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-10">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  1. Responsable del Tratamiento
                </h2>
                <ul className="space-y-2 text-slate-600">
                  <li><span className="font-medium text-slate-900">Responsable:</span> Cerrajero Córdoba 24H</li>
                  <li><span className="font-medium text-slate-900">Dirección:</span> Córdoba, España</li>
                  <li><span className="font-medium text-slate-900">Teléfono:</span> 900 433 189</li>
                  <li><span className="font-medium text-slate-900">Email:</span> info@cerrajerocordoba.es</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  2. Finalidad del Tratamiento
                </h2>
                <p className="text-slate-600 mb-4">
                  Tratamos la información que nos facilitan los usuarios con las siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Gestionar las solicitudes de servicio de cerrajería</li>
                  <li>Enviar presupuestos y comunicaciones relacionadas con el servicio</li>
                  <li>Atender consultas y reclamaciones</li>
                  <li>Mejorar nuestros servicios</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  3. Legitimación
                </h2>
                <p className="text-slate-600">
                  La base legal para el tratamiento de sus datos es el consentimiento del interesado y la ejecución de un contrato de prestación de servicios. El suministro de datos personales solicitados es obligatorio para poder atender sus solicitudes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  4. Destinatarios
                </h2>
                <p className="text-slate-600">
                  No se cederán datos a terceros, salvo obligación legal. No se realizan transferencias internacionales de datos.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  5. Derechos del Interesado
                </h2>
                <p className="text-slate-600 mb-4">
                  Puede ejercer los siguientes derechos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Derecho de acceso a sus datos personales</li>
                  <li>Derecho de rectificación de datos inexactos</li>
                  <li>Derecho de supresión de sus datos</li>
                  <li>Derecho a limitar el tratamiento de sus datos</li>
                  <li>Derecho a la portabilidad de sus datos</li>
                  <li>Derecho de oposición al tratamiento</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  6. Conservación de Datos
                </h2>
                <p className="text-slate-600">
                  Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades derivadas.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  7. Seguridad
                </h2>
                <p className="text-slate-600">
                  Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  8. Reclamaciones
                </h2>
                <p className="text-slate-600">
                  Si considera que el tratamiento de sus datos no es conforme a la normativa, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-amber-400">
                  9. Contacto
                </h2>
                <p className="text-slate-600">
                  Para cualquier consulta relacionada con esta política, puede contactar con nosotros a través del teléfono <span className="font-semibold text-amber-600">900 433 189</span> o enviando un email a <span className="font-semibold text-amber-600">info@cerrajerocordoba.es</span>.
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
