"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

const PHONE_NUMBER = "900433189"
const PHONE_DISPLAY = "900 433 189"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Cerrajeros", href: "/cerrajero" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/#contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.jpg"
            alt="Cerrajero Córdoba 24H"
            width={36}
            height={36}
            className="rounded-lg sm:w-10 sm:h-10"
          />
          <span className="font-bold text-lg sm:text-xl text-amber-400">
            Cerrajero Córdoba
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Phone Button */}
          <Button asChild size="sm" className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
            <a href={`tel:+34${PHONE_NUMBER}`}>
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-200/30 bg-slate-900">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-2 text-slate-200 hover:text-amber-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="mt-2 gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold w-full">
              <a href={`tel:+34${PHONE_NUMBER}`}>
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
