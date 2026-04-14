"use client"

import { MessageCircle, Phone } from "lucide-react"

const WHATSAPP_NUMBER = "34711267223"
const WHATSAPP_MESSAGE = "Hola, me gustaría solicitar información sobre sus servicios."
const PHONE_NUMBER = "900433189"

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3">
      {/* Boton de WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 fill-current" />
      </a>
      {/* Boton de llamada con numero */}
      <a
        href={`tel:+34${PHONE_NUMBER}`}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 h-12 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base whitespace-nowrap"
        aria-label="Llamar ahora"
      >
        <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <span>900 433 189</span>
      </a>
    </div>
  )
}
