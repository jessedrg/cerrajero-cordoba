"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Sparkles, RotateCcw, Phone, MessageCircle, Globe, Shuffle } from "lucide-react"
import html2canvas from "html2canvas"

// Configuración de datos
const IMAGENES_BASE = [
  { id: 1, src: "/images/bases/trabajador-1.jpeg", nombre: "Trabajador 1" },
  { id: 2, src: "/images/bases/trabajador-2.jpeg", nombre: "Trabajador 2" },
  { id: 3, src: "/images/bases/trabajador-3.jpeg", nombre: "Trabajador 3" },
  { id: 4, src: "/images/bases/trabajador-4.jpeg", nombre: "Trabajador 4" },
]

const CIUDADES = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", 
  "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "Granada",
  "A Coruña", "Vitoria", "Elche", "Oviedo", "Santa Cruz", "Pamplona", "Almería", "San Sebastián",
  "Burgos", "Santander", "Castellón", "Albacete", "Logroño", "Badajoz", "Salamanca", "Huelva",
  "Lleida", "Tarragona", "León", "Cádiz", "Jaén", "Ourense", "Girona", "Lugo", "Toledo",
  "Jerez", "Cartagena", "Talavera", "Marbella", "Fuengirola", "Torremolinos", "Benidorm",
  "Getafe", "Leganés", "Alcalá", "Móstoles", "Alcorcón", "Hospitalet", "Badalona", "Terrassa"
]

const SERVICIOS = ["Cerrajero", "Electricista", "Fontanero"]

const TAGLINES = [
  "Servicio rápido y profesional",
  "24 horas, 365 días",
  "Presupuesto sin compromiso",
  "Llegamos en 30 minutos",
  "Precios económicos",
  "Profesionales certificados",
  "Tu confianza, nuestra prioridad",
  "Servicio urgente garantizado",
  "Sin desplazamiento gratis",
  "Más de 10 años de experiencia",
  "Atención inmediata",
  "Calidad y rapidez",
]

const COLORES_TEMA = [
  { nombre: "Naranja", primary: "#f97316", secondary: "#ea580c" },
  { nombre: "Azul", primary: "#3b82f6", secondary: "#2563eb" },
  { nombre: "Verde", primary: "#22c55e", secondary: "#16a34a" },
  { nombre: "Rojo", primary: "#ef4444", secondary: "#dc2626" },
  { nombre: "Morado", primary: "#a855f7", secondary: "#9333ea" },
  { nombre: "Amarillo", primary: "#eab308", secondary: "#ca8a04" },
  { nombre: "Cyan", primary: "#06b6d4", secondary: "#0891b2" },
  { nombre: "Rosa", primary: "#ec4899", secondary: "#db2777" },
]

const PRESETS = [
  { nombre: "Cerrajero Madrid Naranja", servicio: "Cerrajero", ciudad: "Madrid", colorIndex: 0 },
  { nombre: "Electricista Barcelona Azul", servicio: "Electricista", ciudad: "Barcelona", colorIndex: 1 },
  { nombre: "Fontanero Valencia Verde", servicio: "Fontanero", ciudad: "Valencia", colorIndex: 2 },
  { nombre: "Cerrajero Sevilla Rojo", servicio: "Cerrajero", ciudad: "Sevilla", colorIndex: 3 },
  { nombre: "Electricista Málaga Morado", servicio: "Electricista", ciudad: "Málaga", colorIndex: 4 },
]

interface TextConfig {
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  visible: boolean
}

interface BadgeConfig {
  x: number
  y: number
  bgColor: string
  visible: boolean
}

interface EditorState {
  imagenBase: number
  titulo: TextConfig
  subtitulo: TextConfig
  tagline: TextConfig
  textoExtra: TextConfig
  badgeTelefono: BadgeConfig & { numero: string }
  badgeWhatsapp: BadgeConfig & { numero: string }
  badgeWeb: BadgeConfig & { url: string }
  rayasDecorativas: { visible: boolean; color: string }
  colorTema: typeof COLORES_TEMA[0]
}

const estadoInicial: EditorState = {
  imagenBase: 0,
  titulo: { text: "Cerrajero", x: 5, y: 30, fontSize: 72, color: "#ffffff", visible: true },
  subtitulo: { text: "en Córdoba", x: 5, y: 42, fontSize: 48, color: "#f97316", visible: true },
  tagline: { text: "Servicio rápido y profesional", x: 5, y: 55, fontSize: 24, color: "#ffffff", visible: true },
  textoExtra: { text: "", x: 5, y: 65, fontSize: 20, color: "#ffffff", visible: false },
  badgeTelefono: { numero: "900 433 189", x: 5, y: 75, bgColor: "#f97316", visible: true },
  badgeWhatsapp: { numero: "711 267 223", x: 5, y: 85, bgColor: "#22c55e", visible: true },
  badgeWeb: { url: "cerrajerocordoba.es", x: 35, y: 75, bgColor: "#1e293b", visible: true },
  rayasDecorativas: { visible: true, color: "#f97316" },
  colorTema: COLORES_TEMA[0],
}

export default function EditorImagenPage() {
  const [estado, setEstado] = useState<EditorState>(estadoInicial)
  const [generacionRapida, setGeneracionRapida] = useState({ ciudad: "", servicio: "" })
  const canvasRef = useRef<HTMLDivElement>(null)

  const actualizarEstado = useCallback(<K extends keyof EditorState>(
    key: K,
    value: EditorState[K]
  ) => {
    setEstado(prev => ({ ...prev, [key]: value }))
  }, [])

  const actualizarTexto = useCallback(<K extends keyof EditorState>(
    key: K,
    campo: string,
    valor: string | number | boolean
  ) => {
    setEstado(prev => ({
      ...prev,
      [key]: { ...(prev[key] as object), [campo]: valor }
    }))
  }, [])

  const generarAleatorio = useCallback(() => {
    const ciudadFinal = generacionRapida.ciudad || CIUDADES[Math.floor(Math.random() * CIUDADES.length)]
    const servicioFinal = generacionRapida.servicio || SERVICIOS[Math.floor(Math.random() * SERVICIOS.length)]
    const taglineRandom = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
    const colorRandom = COLORES_TEMA[Math.floor(Math.random() * COLORES_TEMA.length)]
    const imagenRandom = Math.floor(Math.random() * IMAGENES_BASE.length)

    // Posiciones aleatorias con límites razonables
    const randomX = () => Math.floor(Math.random() * 15) + 3
    const randomY = (base: number, range: number) => Math.floor(Math.random() * range) + base

    setEstado({
      imagenBase: imagenRandom,
      titulo: {
        text: servicioFinal,
        x: randomX(),
        y: randomY(25, 15),
        fontSize: Math.floor(Math.random() * 20) + 60,
        color: "#ffffff",
        visible: true
      },
      subtitulo: {
        text: `en ${ciudadFinal}`,
        x: randomX(),
        y: randomY(40, 10),
        fontSize: Math.floor(Math.random() * 15) + 38,
        color: colorRandom.primary,
        visible: true
      },
      tagline: {
        text: taglineRandom,
        x: randomX(),
        y: randomY(52, 8),
        fontSize: Math.floor(Math.random() * 8) + 20,
        color: "#ffffff",
        visible: true
      },
      textoExtra: { ...estadoInicial.textoExtra, visible: false },
      badgeTelefono: {
        numero: "900 433 189",
        x: randomX(),
        y: randomY(70, 10),
        bgColor: colorRandom.primary,
        visible: true
      },
      badgeWhatsapp: {
        numero: "711 267 223",
        x: randomX(),
        y: randomY(82, 8),
        bgColor: "#22c55e",
        visible: Math.random() > 0.3
      },
      badgeWeb: {
        url: "cerrajerocordoba.es",
        x: randomX() + 25,
        y: randomY(70, 10),
        bgColor: "#1e293b",
        visible: Math.random() > 0.4
      },
      rayasDecorativas: {
        visible: Math.random() > 0.3,
        color: colorRandom.primary
      },
      colorTema: colorRandom
    })
  }, [generacionRapida])

  const aplicarPreset = useCallback((preset: typeof PRESETS[0]) => {
    const color = COLORES_TEMA[preset.colorIndex]
    setEstado(prev => ({
      ...prev,
      titulo: { ...prev.titulo, text: preset.servicio },
      subtitulo: { ...prev.subtitulo, text: `en ${preset.ciudad}`, color: color.primary },
      badgeTelefono: { ...prev.badgeTelefono, bgColor: color.primary },
      rayasDecorativas: { ...prev.rayasDecorativas, color: color.primary },
      colorTema: color
    }))
  }, [])

  const resetear = useCallback(() => {
    setEstado(estadoInicial)
    setGeneracionRapida({ ciudad: "", servicio: "" })
  }, [])

  const exportarImagen = useCallback(async () => {
    if (!canvasRef.current) return
    
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      })
      
      const link = document.createElement("a")
      link.download = `hero-${estado.titulo.text}-${estado.subtitulo.text.replace("en ", "")}-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error al exportar:", error)
    }
  }, [estado])

  return (
    <div className="min-h-screen bg-slate-950 p-4 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Panel de controles */}
          <div className="w-full lg:w-[420px] space-y-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  Generador de Imágenes Hero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Generación rápida con IA */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-4 border border-amber-500/30">
                  <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generación Rápida
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <Label className="text-slate-400 text-xs">Ciudad (opcional)</Label>
                      <Input
                        placeholder="Aleatorio"
                        value={generacionRapida.ciudad}
                        onChange={(e) => setGeneracionRapida(prev => ({ ...prev, ciudad: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-white h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs">Servicio (opcional)</Label>
                      <Select
                        value={generacionRapida.servicio}
                        onValueChange={(v) => setGeneracionRapida(prev => ({ ...prev, servicio: v }))}
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-9">
                          <SelectValue placeholder="Aleatorio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Aleatorio</SelectItem>
                          {SERVICIOS.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={generarAleatorio}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 font-bold"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Generar con IA
                  </Button>
                </div>

                {/* Presets rápidos */}
                <div>
                  <Label className="text-slate-400 text-xs mb-2 block">Presets Rápidos</Label>
                  <div className="flex flex-wrap gap-1">
                    {PRESETS.map((preset, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => aplicarPreset(preset)}
                        className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800 h-7"
                      >
                        {preset.nombre}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selector de imagen base */}
                <div>
                  <Label className="text-slate-400 text-xs mb-2 block">Imagen Base</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {IMAGENES_BASE.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => actualizarEstado("imagenBase", i)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          estado.imagenBase === i ? "border-amber-500 ring-2 ring-amber-500/50" : "border-slate-700 hover:border-slate-600"
                        }`}
                      >
                        <img src={img.src} alt={img.nombre} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs de configuración */}
            <Card className="bg-slate-900 border-slate-800">
              <Tabs defaultValue="textos" className="w-full">
                <TabsList className="w-full bg-slate-800 border-b border-slate-700 rounded-none">
                  <TabsTrigger value="textos" className="flex-1 text-xs">Textos</TabsTrigger>
                  <TabsTrigger value="badges" className="flex-1 text-xs">Badges</TabsTrigger>
                  <TabsTrigger value="decoracion" className="flex-1 text-xs">Decoración</TabsTrigger>
                </TabsList>

                <TabsContent value="textos" className="p-4 space-y-4">
                  {/* Título */}
                  <TextControl
                    label="Título Principal"
                    config={estado.titulo}
                    onChange={(campo, valor) => actualizarTexto("titulo", campo, valor)}
                  />
                  {/* Subtítulo */}
                  <TextControl
                    label="Subtítulo"
                    config={estado.subtitulo}
                    onChange={(campo, valor) => actualizarTexto("subtitulo", campo, valor)}
                  />
                  {/* Tagline */}
                  <TextControl
                    label="Tagline"
                    config={estado.tagline}
                    onChange={(campo, valor) => actualizarTexto("tagline", campo, valor)}
                  />
                  {/* Texto Extra */}
                  <TextControl
                    label="Texto Extra"
                    config={estado.textoExtra}
                    onChange={(campo, valor) => actualizarTexto("textoExtra", campo, valor)}
                  />
                </TabsContent>

                <TabsContent value="badges" className="p-4 space-y-4">
                  {/* Badge Teléfono */}
                  <BadgeControl
                    label="Teléfono"
                    icon={<Phone className="h-4 w-4" />}
                    config={estado.badgeTelefono}
                    textField="numero"
                    textValue={estado.badgeTelefono.numero}
                    onChange={(campo, valor) => actualizarTexto("badgeTelefono", campo, valor)}
                  />
                  {/* Badge WhatsApp */}
                  <BadgeControl
                    label="WhatsApp"
                    icon={<MessageCircle className="h-4 w-4" />}
                    config={estado.badgeWhatsapp}
                    textField="numero"
                    textValue={estado.badgeWhatsapp.numero}
                    onChange={(campo, valor) => actualizarTexto("badgeWhatsapp", campo, valor)}
                  />
                  {/* Badge Web */}
                  <BadgeControl
                    label="Web"
                    icon={<Globe className="h-4 w-4" />}
                    config={estado.badgeWeb}
                    textField="url"
                    textValue={estado.badgeWeb.url}
                    onChange={(campo, valor) => actualizarTexto("badgeWeb", campo, valor)}
                  />
                </TabsContent>

                <TabsContent value="decoracion" className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Rayas Decorativas</Label>
                    <Switch
                      checked={estado.rayasDecorativas.visible}
                      onCheckedChange={(v) => actualizarTexto("rayasDecorativas", "visible", v)}
                    />
                  </div>
                  {estado.rayasDecorativas.visible && (
                    <div>
                      <Label className="text-slate-400 text-xs">Color</Label>
                      <Input
                        type="color"
                        value={estado.rayasDecorativas.color}
                        onChange={(e) => actualizarTexto("rayasDecorativas", "color", e.target.value)}
                        className="h-10 w-full bg-slate-800 border-slate-700"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-700">
                    <Label className="text-slate-300 mb-2 block">Color de Tema</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLORES_TEMA.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            actualizarEstado("colorTema", color)
                            actualizarTexto("subtitulo", "color", color.primary)
                            actualizarTexto("badgeTelefono", "bgColor", color.primary)
                            actualizarTexto("rayasDecorativas", "color", color.primary)
                          }}
                          className={`h-8 rounded-md transition-all ${
                            estado.colorTema.nombre === color.nombre ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""
                          }`}
                          style={{ backgroundColor: color.primary }}
                          title={color.nombre}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetear}
                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Resetear
              </Button>
              <Button
                onClick={exportarImagen}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PNG
              </Button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1">
            <Card className="bg-slate-900 border-slate-800 sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Preview en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={canvasRef}
                  className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-800"
                >
                  {/* Imagen de fondo */}
                  <img
                    src={IMAGENES_BASE[estado.imagenBase].src}
                    alt="Base"
                    className="absolute inset-0 w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />

                  {/* Overlay oscuro en el lado izquierdo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent" />

                  {/* Rayas decorativas */}
                  {estado.rayasDecorativas.visible && (
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                      <div
                        className="absolute -top-20 -left-20 w-40 h-[200%] rotate-12 opacity-20"
                        style={{ backgroundColor: estado.rayasDecorativas.color }}
                      />
                      <div
                        className="absolute -top-20 left-20 w-8 h-[200%] rotate-12 opacity-30"
                        style={{ backgroundColor: estado.rayasDecorativas.color }}
                      />
                    </div>
                  )}

                  {/* Título */}
                  {estado.titulo.visible && (
                    <div
                      className="absolute font-bold leading-none drop-shadow-lg"
                      style={{
                        left: `${estado.titulo.x}%`,
                        top: `${estado.titulo.y}%`,
                        fontSize: `${estado.titulo.fontSize}px`,
                        color: estado.titulo.color,
                        transform: "translateY(-50%)"
                      }}
                    >
                      {estado.titulo.text}
                    </div>
                  )}

                  {/* Subtítulo */}
                  {estado.subtitulo.visible && (
                    <div
                      className="absolute font-bold leading-none drop-shadow-lg"
                      style={{
                        left: `${estado.subtitulo.x}%`,
                        top: `${estado.subtitulo.y}%`,
                        fontSize: `${estado.subtitulo.fontSize}px`,
                        color: estado.subtitulo.color,
                        transform: "translateY(-50%)"
                      }}
                    >
                      {estado.subtitulo.text}
                    </div>
                  )}

                  {/* Tagline */}
                  {estado.tagline.visible && (
                    <div
                      className="absolute font-medium leading-none drop-shadow-md"
                      style={{
                        left: `${estado.tagline.x}%`,
                        top: `${estado.tagline.y}%`,
                        fontSize: `${estado.tagline.fontSize}px`,
                        color: estado.tagline.color,
                        transform: "translateY(-50%)"
                      }}
                    >
                      {estado.tagline.text}
                    </div>
                  )}

                  {/* Texto Extra */}
                  {estado.textoExtra.visible && estado.textoExtra.text && (
                    <div
                      className="absolute font-medium leading-none drop-shadow-md"
                      style={{
                        left: `${estado.textoExtra.x}%`,
                        top: `${estado.textoExtra.y}%`,
                        fontSize: `${estado.textoExtra.fontSize}px`,
                        color: estado.textoExtra.color,
                        transform: "translateY(-50%)"
                      }}
                    >
                      {estado.textoExtra.text}
                    </div>
                  )}

                  {/* Badge Teléfono */}
                  {estado.badgeTelefono.visible && (
                    <div
                      className="absolute flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold shadow-lg"
                      style={{
                        left: `${estado.badgeTelefono.x}%`,
                        top: `${estado.badgeTelefono.y}%`,
                        backgroundColor: estado.badgeTelefono.bgColor,
                        transform: "translateY(-50%)"
                      }}
                    >
                      <Phone className="h-5 w-5" />
                      <span>{estado.badgeTelefono.numero}</span>
                    </div>
                  )}

                  {/* Badge WhatsApp */}
                  {estado.badgeWhatsapp.visible && (
                    <div
                      className="absolute flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold shadow-lg"
                      style={{
                        left: `${estado.badgeWhatsapp.x}%`,
                        top: `${estado.badgeWhatsapp.y}%`,
                        backgroundColor: estado.badgeWhatsapp.bgColor,
                        transform: "translateY(-50%)"
                      }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{estado.badgeWhatsapp.numero}</span>
                    </div>
                  )}

                  {/* Badge Web */}
                  {estado.badgeWeb.visible && (
                    <div
                      className="absolute flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium shadow-lg"
                      style={{
                        left: `${estado.badgeWeb.x}%`,
                        top: `${estado.badgeWeb.y}%`,
                        backgroundColor: estado.badgeWeb.bgColor,
                        transform: "translateY(-50%)"
                      }}
                    >
                      <Globe className="h-4 w-4" />
                      <span>{estado.badgeWeb.url}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para controles de texto
function TextControl({
  label,
  config,
  onChange
}: {
  label: string
  config: TextConfig
  onChange: (campo: string, valor: string | number | boolean) => void
}) {
  return (
    <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-slate-300 font-medium">{label}</Label>
        <Switch
          checked={config.visible}
          onCheckedChange={(v) => onChange("visible", v)}
        />
      </div>
      {config.visible && (
        <>
          <Input
            value={config.text}
            onChange={(e) => onChange("text", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
            placeholder="Texto..."
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-slate-400 text-xs">X: {config.x}%</Label>
              <Slider
                value={[config.x]}
                onValueChange={([v]) => onChange("x", v)}
                max={80}
                step={1}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-400 text-xs">Y: {config.y}%</Label>
              <Slider
                value={[config.y]}
                onValueChange={([v]) => onChange("y", v)}
                max={95}
                step={1}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-slate-400 text-xs">Tamaño: {config.fontSize}px</Label>
              <Slider
                value={[config.fontSize]}
                onValueChange={([v]) => onChange("fontSize", v)}
                min={12}
                max={100}
                step={1}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-400 text-xs">Color</Label>
              <Input
                type="color"
                value={config.color}
                onChange={(e) => onChange("color", e.target.value)}
                className="h-8 w-full bg-slate-800 border-slate-700 mt-1"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Componente para controles de badges
function BadgeControl({
  label,
  icon,
  config,
  textField,
  textValue,
  onChange
}: {
  label: string
  icon: React.ReactNode
  config: BadgeConfig
  textField: string
  textValue: string
  onChange: (campo: string, valor: string | number | boolean) => void
}) {
  return (
    <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-slate-300 font-medium flex items-center gap-2">
          {icon}
          {label}
        </Label>
        <Switch
          checked={config.visible}
          onCheckedChange={(v) => onChange("visible", v)}
        />
      </div>
      {config.visible && (
        <>
          <Input
            value={textValue}
            onChange={(e) => onChange(textField, e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-slate-400 text-xs">X: {config.x}%</Label>
              <Slider
                value={[config.x]}
                onValueChange={([v]) => onChange("x", v)}
                max={80}
                step={1}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-400 text-xs">Y: {config.y}%</Label>
              <Slider
                value={[config.y]}
                onValueChange={([v]) => onChange("y", v)}
                max={95}
                step={1}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-400 text-xs">Fondo</Label>
              <Input
                type="color"
                value={config.bgColor}
                onChange={(e) => onChange("bgColor", e.target.value)}
                className="h-8 w-full bg-slate-800 border-slate-700 mt-1"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
