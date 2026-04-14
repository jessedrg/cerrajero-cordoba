"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  Download, 
  RotateCcw,
  Type,
  Palette,
  Image as ImageIcon,
  Phone,
  Globe,
  MessageCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Check,
  Upload
} from "lucide-react"
import { ImageUploader } from "./image-uploader"

// Base images
const BASE_IMAGES = [
  { id: 1, src: "/images/bases/trabajador-1.jpeg", name: "Trabajador 1" },
  { id: 2, src: "/images/bases/trabajador-2.jpeg", name: "Trabajador 2" },
  { id: 3, src: "/images/bases/trabajador-3.jpeg", name: "Trabajador 3" },
  { id: 4, src: "/images/bases/trabajador-4.jpeg", name: "Trabajador 4" },
]

// Cities list
const CITIES = [
  "Córdoba", "Lucena", "Puente Genil", "Montilla", "Priego de Córdoba", "Cabra", "Baena", 
  "Palma del Río", "Pozoblanco", "Peñarroya-Pueblonuevo", "Aguilar de la Frontera", "La Carlota",
  "Rute", "Fernán Núñez", "Villanueva de Córdoba", "Castro del Río", "Hinojosa del Duque",
  "La Rambla", "Bujalance", "Montoro", "Almodóvar del Río", "Villa del Río", "Fuente Palmera",
  "Villafranca de Córdoba", "Cañete de las Torres", "El Carpio", "Adamuz", "Hornachuelos",
  "Santaella", "Belalcázar", "Dos Torres", "Iznájar", "Monturque", "Pedro Abad"
]

// Services
const SERVICES = [
  "Cerrajero", "Cerrajero 24h", "Cerrajero Urgente", "Apertura de Puertas",
  "Cambio de Cerraduras", "Cerraduras de Seguridad", "Cerrajería Urgente"
]

// Taglines
const TAGLINES = [
  "Servicio 24 horas",
  "Llegamos en 15-30 min",
  "Presupuesto sin compromiso",
  "Profesionales certificados",
  "Atención inmediata",
  "Precios justos y transparentes",
  "Garantía en todos los trabajos"
]

interface TextConfig {
  text: string
  x: number
  y: number
  size: number
  color: string
  visible: boolean
  fontWeight: string
}

interface BadgeConfig {
  text: string
  x: number
  y: number
  bgColor: string
  textColor: string
  visible: boolean
}

interface HeroImageEditorProps {
  value: string
  onChange: (url: string) => void
  serviceName?: string
  cityName?: string
}

export function HeroImageEditor({ value, onChange, serviceName = "Cerrajero", cityName = "Córdoba" }: HeroImageEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  
  // Selected base image
  const [selectedImage, setSelectedImage] = useState(BASE_IMAGES[0].src)
  
  // Text configurations - X is now "margin from left" (not center)
  const [titleConfig, setTitleConfig] = useState<TextConfig>({
    text: `${serviceName} en ${cityName}`,
    x: 5,
    y: 30,
    size: 48,
    color: "#1e293b",
    visible: true,
    fontWeight: "bold"
  })
  
  const [subtitleConfig, setSubtitleConfig] = useState<TextConfig>({
    text: "Servicio profesional 24 horas",
    x: 5,
    y: 45,
    size: 24,
    color: "#475569",
    visible: true,
    fontWeight: "normal"
  })
  
  const [taglineConfig, setTaglineConfig] = useState<TextConfig>({
    text: "Llegamos en 15-30 minutos",
    x: 5,
    y: 55,
    size: 18,
    color: "#f59e0b",
    visible: true,
    fontWeight: "semibold"
  })
  
  // Badges
  const [phoneBadge, setPhoneBadge] = useState<BadgeConfig>({
    text: "900 433 189",
    x: 5,
    y: 70,
    bgColor: "#f59e0b",
    textColor: "#1e293b",
    visible: true
  })
  
  const [whatsappBadge, setWhatsappBadge] = useState<BadgeConfig>({
    text: "cerrajerocordoba.es",
    x: 25,
    y: 70,
    bgColor: "#22c55e",
    textColor: "#ffffff",
    visible: true
  })
  
  // Stripe
  const [stripeColor, setStripeColor] = useState("#f59e0b")
  const [showStripe, setShowStripe] = useState(true)

  // Generate configuration using PAGE CONTEXT (service and city from props)
  const generateRandom = useCallback(() => {
    setGenerating(true)
    
    // Random image
    const randomImage = BASE_IMAGES[Math.floor(Math.random() * BASE_IMAGES.length)]
    setSelectedImage(randomImage.src)
    
    // USE PAGE CONTEXT - serviceName and cityName from props
    const randomTagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
    
    // Random positions (margin from left edge - integers only!)
    const baseX = Math.floor(3 + Math.random() * 5)  // 3-7% margin from left
    const titleY = Math.floor(22 + Math.random() * 8)  // 22-29%
    const subtitleY = Math.floor(38 + Math.random() * 8)  // 38-45%
    const taglineY = Math.floor(50 + Math.random() * 6)  // 50-55%
    const badgeY = Math.floor(64 + Math.random() * 8)  // 64-71% - SAME for both badges!
    
    // SUPER random colors - many more options!
    const titleColors = [
      "#1e293b", "#0f172a", "#334155", "#1e40af", "#7c2d12", 
      "#0c4a6e", "#14532d", "#4c1d95", "#831843", "#1f2937",
      "#18181b", "#292524", "#1c1917", "#0a0a0a", "#171717"
    ]
    const accentColors = [
      "#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6",
      "#ec4899", "#14b8a6", "#f97316", "#06b6d4", "#eab308",
      "#84cc16", "#10b981", "#6366f1", "#d946ef", "#f43f5e"
    ]
    const subtitleColors = [
      "#475569", "#64748b", "#6b7280", "#71717a", "#737373",
      "#525252", "#57534e", "#78716c", "#a8a29e", "#9ca3af"
    ]
    
    const randomTitleColor = titleColors[Math.floor(Math.random() * titleColors.length)]
    const randomAccent = accentColors[Math.floor(Math.random() * accentColors.length)]
    const randomSubtitleColor = subtitleColors[Math.floor(Math.random() * subtitleColors.length)]
    
    // Random font sizes (integers)
    const titleSize = Math.floor(38 + Math.random() * 16)  // 38-53px
    const subtitleSize = Math.floor(18 + Math.random() * 10)  // 18-27px
    const taglineSize = Math.floor(14 + Math.random() * 8)  // 14-21px
    
    // Title uses page context: serviceName + cityName
    setTitleConfig(prev => ({
      ...prev,
      text: `${serviceName} en ${cityName}`,
      x: baseX,
      y: titleY,
      size: titleSize,
      color: randomTitleColor
    }))
    
    setSubtitleConfig(prev => ({
      ...prev,
      text: "Servicio profesional 24 horas",
      x: baseX,
      y: subtitleY,
      size: subtitleSize,
      color: randomSubtitleColor
    }))
    
    setTaglineConfig(prev => ({
      ...prev,
      text: randomTagline,
      x: baseX,
      y: taglineY,
      size: taglineSize,
      color: randomAccent
    }))
    
    // Both badges on SAME Y position to avoid overlap
    setPhoneBadge(prev => ({
      ...prev,
      x: baseX,
      y: badgeY,
      bgColor: randomAccent
    }))
    
    setWhatsappBadge(prev => ({
      ...prev,
      x: baseX + 20,
      y: badgeY  // SAME Y as phone badge!
    }))
    
    setStripeColor(randomAccent)
    
    setTimeout(() => setGenerating(false), 300)
  }, [serviceName, cityName])

  // Generate image using native Canvas API - EXACT rendering guaranteed
  const generateCanvasImage = useCallback(async (): Promise<Blob> => {
    const WIDTH = 1200
    const HEIGHT = 630
    
    // Create canvas
    const canvas = document.createElement("canvas")
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const ctx = canvas.getContext("2d")!
    
    // Fill white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    
    // Load and draw background image
    const img = new Image()
    img.crossOrigin = "anonymous"
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = selectedImage
    })
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT)
    
    // Draw gradient overlay (left to right, white to transparent)
    const gradient = ctx.createLinearGradient(0, 0, WIDTH * 0.7, 0)
    gradient.addColorStop(0, "rgba(255,255,255,0.95)")
    gradient.addColorStop(0.5, "rgba(255,255,255,0.75)")
    gradient.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    
    // Draw stripe
    if (showStripe) {
      ctx.fillStyle = stripeColor
      ctx.fillRect(0, 0, 8, HEIGHT)
    }
    
    // Helper to convert percentage to pixels
    const xPx = (pct: number) => (pct / 100) * WIDTH
    const yPx = (pct: number) => (pct / 100) * HEIGHT
    
    // Draw title
    if (titleConfig.visible) {
      ctx.fillStyle = titleConfig.color
      ctx.font = `${titleConfig.fontWeight === "bold" ? "bold" : "normal"} ${titleConfig.size}px system-ui, -apple-system, sans-serif`
      ctx.textBaseline = "middle"
      ctx.fillText(titleConfig.text, xPx(titleConfig.x), yPx(titleConfig.y))
    }
    
    // Draw subtitle
    if (subtitleConfig.visible) {
      ctx.fillStyle = subtitleConfig.color
      ctx.font = `${subtitleConfig.fontWeight === "bold" ? "bold" : "normal"} ${subtitleConfig.size}px system-ui, -apple-system, sans-serif`
      ctx.textBaseline = "middle"
      ctx.fillText(subtitleConfig.text, xPx(subtitleConfig.x), yPx(subtitleConfig.y))
    }
    
    // Draw tagline
    if (taglineConfig.visible) {
      ctx.fillStyle = taglineConfig.color
      ctx.font = `${taglineConfig.fontWeight === "semibold" ? "600" : "normal"} ${taglineConfig.size}px system-ui, -apple-system, sans-serif`
      ctx.textBaseline = "middle"
      ctx.fillText(taglineConfig.text, xPx(taglineConfig.x), yPx(taglineConfig.y))
    }
    
    // Draw phone badge (rectangle with text)
    if (phoneBadge.visible) {
      const badgeX = xPx(phoneBadge.x)
      const badgeY = yPx(phoneBadge.y)
      const padding = 12
      const fontSize = 18
      
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`
      const textWidth = ctx.measureText(phoneBadge.text).width
      
      // Draw background
      ctx.fillStyle = phoneBadge.bgColor
      ctx.fillRect(badgeX, badgeY - fontSize/2 - padding, textWidth + padding*2, fontSize + padding*2)
      
      // Draw text
      ctx.fillStyle = phoneBadge.textColor
      ctx.textBaseline = "middle"
      ctx.fillText(phoneBadge.text, badgeX + padding, badgeY)
    }
    
    // Draw whatsapp badge (rectangle with text)
    if (whatsappBadge.visible) {
      const badgeX = xPx(whatsappBadge.x)
      const badgeY = yPx(whatsappBadge.y)
      const padding = 12
      const fontSize = 18
      
      ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`
      const textWidth = ctx.measureText(whatsappBadge.text).width
      
      // Draw background
      ctx.fillStyle = whatsappBadge.bgColor
      ctx.fillRect(badgeX, badgeY - fontSize/2 - padding, textWidth + padding*2, fontSize + padding*2)
      
      // Draw text
      ctx.fillStyle = whatsappBadge.textColor
      ctx.textBaseline = "middle"
      ctx.fillText(whatsappBadge.text, badgeX + padding, badgeY)
    }
    
    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Failed to create blob"))
      }, "image/jpeg", 0.92)
    })
  }, [selectedImage, showStripe, stripeColor, titleConfig, subtitleConfig, taglineConfig, phoneBadge, whatsappBadge])

  // Export as image
  const exportImage = async () => {
    try {
      const blob = await generateCanvasImage()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `hero-${Date.now()}.jpg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting image:", error)
      alert("Error al exportar la imagen. Inténtalo de nuevo.")
    }
  }

  // Use this image - generate and upload directly
  const useThisImage = async () => {
    setUploading(true)
    try {
      const blob = await generateCanvasImage()
      
      // Convert blob to File
      const safeCityName = cityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const safeServiceName = serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const filename = `hero-${safeServiceName}-${safeCityName}-${Date.now()}.jpg`
      const file = new File([blob], filename, { type: "image/jpeg" })
      
      // Create FormData and upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "pages")
      
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }
      
      // Update the form with the new URL
      onChange(data.url)
      
      // Collapse the editor
      setExpanded(false)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert(`Error al subir la imagen: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Collapsed view - just the uploader */}
      <ImageUploader
        value={value}
        onChange={onChange}
        folder="pages"
      />
      
      {/* Toggle for advanced editor */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2"
      >
        <Sparkles className="h-4 w-4" />
        {expanded ? "Ocultar editor avanzado" : "Crear imagen con IA"}
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {expanded && (
        <div className="space-y-6 pt-4 border-t">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={generateRandom}
              disabled={generating}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generar con IA
            </Button>
            
            <Button type="button" variant="outline" onClick={exportImage}>
              <Download className="h-4 w-4 mr-2" />
              Descargar PNG
            </Button>

            <Button 
              type="button" 
              onClick={useThisImage}
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              {uploading ? "Subiendo..." : "Usar esta imagen"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Vista previa</Label>
              <div 
                ref={canvasRef}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1200/630",
                  backgroundColor: "#ffffff",
                  overflow: "hidden"
                }}
              >
                {/* Background Image */}
                <img
                  src={selectedImage}
                  alt="Base"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top"
                  }}
                  crossOrigin="anonymous"
                />
                
                {/* Overlay gradient - using inline style with rgba */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0) 70%)"
                }} />
                
                {/* Stripe */}
                {showStripe && (
                  <div 
                    style={{ 
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "8px",
                      backgroundColor: stripeColor 
                    }}
                  />
                )}
                
                {/* Title */}
                {titleConfig.visible && (
                  <div
                    style={{
                      position: "absolute",
                      whiteSpace: "nowrap",
                      left: `${titleConfig.x}%`,
                      top: `${titleConfig.y}%`,
                      transform: "translateY(-50%)",
                      fontSize: `${titleConfig.size}px`,
                      color: titleConfig.color,
                      fontWeight: titleConfig.fontWeight === "bold" ? 700 : 400
                    }}
                  >
                    {titleConfig.text}
                  </div>
                )}
                
                {/* Subtitle */}
                {subtitleConfig.visible && (
                  <div
                    style={{
                      position: "absolute",
                      whiteSpace: "nowrap",
                      left: `${subtitleConfig.x}%`,
                      top: `${subtitleConfig.y}%`,
                      transform: "translateY(-50%)",
                      fontSize: `${subtitleConfig.size}px`,
                      color: subtitleConfig.color,
                      fontWeight: subtitleConfig.fontWeight === "bold" ? 700 : 400
                    }}
                  >
                    {subtitleConfig.text}
                  </div>
                )}
                
                {/* Tagline */}
                {taglineConfig.visible && (
                  <div
                    style={{
                      position: "absolute",
                      whiteSpace: "nowrap",
                      left: `${taglineConfig.x}%`,
                      top: `${taglineConfig.y}%`,
                      transform: "translateY(-50%)",
                      fontSize: `${taglineConfig.size}px`,
                      color: taglineConfig.color,
                      fontWeight: taglineConfig.fontWeight === "semibold" ? 600 : 400
                    }}
                  >
                    {taglineConfig.text}
                  </div>
                )}
                
                {/* Phone Badge */}
                {phoneBadge.visible && (
                  <div
                    style={{
                      position: "absolute",
                      padding: "10px 20px",
                      fontWeight: 700,
                      fontSize: "18px",
                      left: `${phoneBadge.x}%`,
                      top: `${phoneBadge.y}%`,
                      transform: "translateY(-50%)",
                      backgroundColor: phoneBadge.bgColor,
                      color: phoneBadge.textColor
                    }}
                  >
                    {phoneBadge.text}
                  </div>
                )}
                
                {/* WhatsApp Badge */}
                {whatsappBadge.visible && (
                  <div
                    style={{
                      position: "absolute",
                      padding: "10px 20px",
                      fontWeight: 600,
                      fontSize: "18px",
                      left: `${whatsappBadge.x}%`,
                      top: `${whatsappBadge.y}%`,
                      transform: "translateY(-50%)",
                      backgroundColor: whatsappBadge.bgColor,
                      color: whatsappBadge.textColor
                    }}
                  >
                    {whatsappBadge.text}
                  </div>
                )}
              </div>
              
              {/* Base Image Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Imagen base</Label>
                <div className="grid grid-cols-4 gap-2">
                  {BASE_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setSelectedImage(img.src)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img.src 
                          ? "border-orange-500 ring-2 ring-orange-500/30" 
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <Tabs defaultValue="title" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="title" className="text-xs">
                    <Type className="h-3 w-3 mr-1" />
                    Título
                  </TabsTrigger>
                  <TabsTrigger value="subtitle" className="text-xs">
                    <Type className="h-3 w-3 mr-1" />
                    Subtítulo
                  </TabsTrigger>
                  <TabsTrigger value="badges" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs">
                    <Palette className="h-3 w-3 mr-1" />
                    Estilo
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="title" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <Label>Mostrar título</Label>
                    <Switch
                      checked={titleConfig.visible}
                      onCheckedChange={(v) => setTitleConfig(prev => ({ ...prev, visible: v }))}
                    />
                  </div>
                  
                  {titleConfig.visible && (
                    <>
                      <div className="space-y-2">
                        <Label>Texto</Label>
                        <Input
                          value={titleConfig.text}
                          onChange={(e) => setTitleConfig(prev => ({ ...prev, text: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Posición X: {Math.round(titleConfig.x)}%</Label>
                          <Slider
                            value={[Math.round(titleConfig.x)]}
                            onValueChange={([v]) => setTitleConfig(prev => ({ ...prev, x: v }))}
                            min={0}
                            max={50}
                            step={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Posición Y: {Math.round(titleConfig.y)}%</Label>
                          <Slider
                            value={[Math.round(titleConfig.y)]}
                            onValueChange={([v]) => setTitleConfig(prev => ({ ...prev, y: v }))}
                            min={5}
                            max={85}
                            step={1}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tamaño: {titleConfig.size}px</Label>
                          <Slider
                            value={[titleConfig.size]}
                            onValueChange={([v]) => setTitleConfig(prev => ({ ...prev, size: v }))}
                            min={20}
                            max={72}
                            step={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input
                            type="color"
                            value={titleConfig.color}
                            onChange={(e) => setTitleConfig(prev => ({ ...prev, color: e.target.value }))}
                            className="h-10 p-1"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="subtitle" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <Label>Mostrar subtítulo</Label>
                    <Switch
                      checked={subtitleConfig.visible}
                      onCheckedChange={(v) => setSubtitleConfig(prev => ({ ...prev, visible: v }))}
                    />
                  </div>
                  
                  {subtitleConfig.visible && (
                    <>
                      <div className="space-y-2">
                        <Label>Texto</Label>
                        <Input
                          value={subtitleConfig.text}
                          onChange={(e) => setSubtitleConfig(prev => ({ ...prev, text: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Posición X: {Math.round(subtitleConfig.x)}%</Label>
                          <Slider
                            value={[Math.round(subtitleConfig.x)]}
                            onValueChange={([v]) => setSubtitleConfig(prev => ({ ...prev, x: v }))}
                            min={0}
                            max={50}
                            step={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Posición Y: {Math.round(subtitleConfig.y)}%</Label>
                          <Slider
                            value={[Math.round(subtitleConfig.y)]}
                            onValueChange={([v]) => setSubtitleConfig(prev => ({ ...prev, y: v }))}
                            min={5}
                            max={85}
                            step={1}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tamaño: {subtitleConfig.size}px</Label>
                          <Slider
                            value={[subtitleConfig.size]}
                            onValueChange={([v]) => setSubtitleConfig(prev => ({ ...prev, size: v }))}
                            min={14}
                            max={36}
                            step={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input
                            type="color"
                            value={subtitleConfig.color}
                            onChange={(e) => setSubtitleConfig(prev => ({ ...prev, color: e.target.value }))}
                            className="h-10 p-1"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Mostrar tagline</Label>
                      <Switch
                        checked={taglineConfig.visible}
                        onCheckedChange={(v) => setTaglineConfig(prev => ({ ...prev, visible: v }))}
                      />
                    </div>
                    
                    {taglineConfig.visible && (
                      <div className="space-y-2">
                        <Label>Texto tagline</Label>
                        <Input
                          value={taglineConfig.text}
                          onChange={(e) => setTaglineConfig(prev => ({ ...prev, text: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="badges" className="space-y-4 mt-4">
                  {/* Phone Badge */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">Badge Teléfono</Label>
                      <Switch
                        checked={phoneBadge.visible}
                        onCheckedChange={(v) => setPhoneBadge(prev => ({ ...prev, visible: v }))}
                      />
                    </div>
                    
                    {phoneBadge.visible && (
                      <>
                        <Input
                          value={phoneBadge.text}
                          onChange={(e) => setPhoneBadge(prev => ({ ...prev, text: e.target.value }))}
                          placeholder="900 433 189"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>X: {Math.round(phoneBadge.x)}%</Label>
                            <Slider
                              value={[Math.round(phoneBadge.x)]}
                              onValueChange={([v]) => setPhoneBadge(prev => ({ ...prev, x: v }))}
                              min={0}
                              max={50}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Y: {Math.round(phoneBadge.y)}%</Label>
                            <Slider
                              value={[Math.round(phoneBadge.y)]}
                              onValueChange={([v]) => setPhoneBadge(prev => ({ ...prev, y: v }))}
                              min={50}
                              max={90}
                              step={1}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Color fondo</Label>
                            <Input
                              type="color"
                              value={phoneBadge.bgColor}
                              onChange={(e) => setPhoneBadge(prev => ({ ...prev, bgColor: e.target.value }))}
                              className="h-10 p-1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Color texto</Label>
                            <Input
                              type="color"
                              value={phoneBadge.textColor}
                              onChange={(e) => setPhoneBadge(prev => ({ ...prev, textColor: e.target.value }))}
                              className="h-10 p-1"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* WhatsApp Badge */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">Badge WhatsApp</Label>
                      <Switch
                        checked={whatsappBadge.visible}
                        onCheckedChange={(v) => setWhatsappBadge(prev => ({ ...prev, visible: v }))}
                      />
                    </div>
                    
                    {whatsappBadge.visible && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>X: {Math.round(whatsappBadge.x)}%</Label>
                            <Slider
                              value={[Math.round(whatsappBadge.x)]}
                              onValueChange={([v]) => setWhatsappBadge(prev => ({ ...prev, x: v }))}
                              min={10}
                              max={60}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Y: {Math.round(whatsappBadge.y)}%</Label>
                            <Slider
                              value={[Math.round(whatsappBadge.y)]}
                              onValueChange={([v]) => setWhatsappBadge(prev => ({ ...prev, y: v }))}
                              min={50}
                              max={90}
                              step={1}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Color fondo</Label>
                            <Input
                              type="color"
                              value={whatsappBadge.bgColor}
                              onChange={(e) => setWhatsappBadge(prev => ({ ...prev, bgColor: e.target.value }))}
                              className="h-10 p-1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Color texto</Label>
                            <Input
                              type="color"
                              value={whatsappBadge.textColor}
                              onChange={(e) => setWhatsappBadge(prev => ({ ...prev, textColor: e.target.value }))}
                              className="h-10 p-1"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <Label>Mostrar raya lateral</Label>
                    <Switch
                      checked={showStripe}
                      onCheckedChange={setShowStripe}
                    />
                  </div>
                  
                  {showStripe && (
                    <div className="space-y-2">
                      <Label>Color de la raya</Label>
                      <Input
                        type="color"
                        value={stripeColor}
                        onChange={(e) => setStripeColor(e.target.value)}
                        className="h-10 p-1"
                      />
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <Label className="font-medium mb-3 block">Presets rápidos</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStripeColor("#f59e0b")
                          setPhoneBadge(prev => ({ ...prev, bgColor: "#f59e0b" }))
                          setTaglineConfig(prev => ({ ...prev, color: "#f59e0b" }))
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                        Naranja
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStripeColor("#3b82f6")
                          setPhoneBadge(prev => ({ ...prev, bgColor: "#3b82f6" }))
                          setTaglineConfig(prev => ({ ...prev, color: "#3b82f6" }))
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                        Azul
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStripeColor("#22c55e")
                          setPhoneBadge(prev => ({ ...prev, bgColor: "#22c55e" }))
                          setTaglineConfig(prev => ({ ...prev, color: "#22c55e" }))
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                        Verde
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStripeColor("#ef4444")
                          setPhoneBadge(prev => ({ ...prev, bgColor: "#ef4444" }))
                          setTaglineConfig(prev => ({ ...prev, color: "#ef4444" }))
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                        Rojo
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
