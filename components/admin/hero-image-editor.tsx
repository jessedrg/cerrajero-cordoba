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
  
  // Text configurations
  const [titleConfig, setTitleConfig] = useState<TextConfig>({
    text: `${serviceName} en ${cityName}`,
    x: 50,
    y: 30,
    size: 48,
    color: "#1e293b",
    visible: true,
    fontWeight: "bold"
  })
  
  const [subtitleConfig, setSubtitleConfig] = useState<TextConfig>({
    text: "Servicio profesional 24 horas",
    x: 50,
    y: 45,
    size: 24,
    color: "#475569",
    visible: true,
    fontWeight: "normal"
  })
  
  const [taglineConfig, setTaglineConfig] = useState<TextConfig>({
    text: "Llegamos en 15-30 minutos",
    x: 50,
    y: 55,
    size: 18,
    color: "#f59e0b",
    visible: true,
    fontWeight: "semibold"
  })
  
  // Badges
  const [phoneBadge, setPhoneBadge] = useState<BadgeConfig>({
    text: "900 433 189",
    x: 50,
    y: 70,
    bgColor: "#f59e0b",
    textColor: "#1e293b",
    visible: true
  })
  
  const [whatsappBadge, setWhatsappBadge] = useState<BadgeConfig>({
    text: "WhatsApp",
    x: 75,
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
    
    // Random positions (within safe areas)
    const baseX = 25 + Math.random() * 15  // Keep text on left side
    
    // Random colors
    const colors = ["#1e293b", "#0f172a", "#334155", "#1e40af", "#7c2d12"]
    const accentColors = ["#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"]
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomAccent = accentColors[Math.floor(Math.random() * accentColors.length)]
    
    // Title uses page context: serviceName + cityName
    setTitleConfig(prev => ({
      ...prev,
      text: `${serviceName} en ${cityName}`,
      x: baseX,
      y: 25 + Math.random() * 10,
      color: randomColor
    }))
    
    setSubtitleConfig(prev => ({
      ...prev,
      text: "Servicio profesional 24 horas",
      x: baseX,
      y: 40 + Math.random() * 10,
      color: "#475569"
    }))
    
    setTaglineConfig(prev => ({
      ...prev,
      text: randomTagline,
      x: baseX,
      y: 52 + Math.random() * 8,
      color: randomAccent
    }))
    
    setPhoneBadge(prev => ({
      ...prev,
      x: baseX,
      y: 68 + Math.random() * 10,
      bgColor: randomAccent
    }))
    
    setWhatsappBadge(prev => ({
      ...prev,
      x: baseX + 20,
      y: 68 + Math.random() * 10
    }))
    
    setStripeColor(randomAccent)
    
    setTimeout(() => setGenerating(false), 500)
  }, [serviceName, cityName])

  // Export as image using html2canvas
  const exportImage = async () => {
    if (!canvasRef.current) return
    
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      })
      
      const link = document.createElement("a")
      link.download = `hero-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error exporting image:", error)
    }
  }

  // Quick update title with city/service
  const quickUpdateTitle = (city: string, service: string) => {
    setTitleConfig(prev => ({
      ...prev,
      text: `${service} en ${city}`
    }))
  }

  // Use this image - generate and upload directly
  const useThisImage = async () => {
    if (!canvasRef.current) return
    
    setUploading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      })
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error("Failed to create blob"))
        }, "image/png", 0.95)
      })
      
      // Create FormData and upload
      const formData = new FormData()
      formData.append("file", blob, `hero-${Date.now()}.png`)
      formData.append("folder", "pages")
      formData.append("optimize", "true")
      
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      })
      
      if (!response.ok) {
        throw new Error("Upload failed")
      }
      
      const data = await response.json()
      
      // Update the form with the new URL
      onChange(data.url)
      
      // Collapse the editor
      setExpanded(false)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error al subir la imagen. Inténtalo de nuevo.")
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
                className="relative w-full aspect-[1200/630] bg-white rounded-lg overflow-hidden border shadow-lg"
              >
                {/* Background Image */}
                <img
                  src={selectedImage}
                  alt="Base"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  crossOrigin="anonymous"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
                
                {/* Stripe */}
                {showStripe && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-2"
                    style={{ backgroundColor: stripeColor }}
                  />
                )}
                
                {/* Title */}
                {titleConfig.visible && (
                  <div
                    className="absolute whitespace-nowrap"
                    style={{
                      left: `${titleConfig.x}%`,
                      top: `${titleConfig.y}%`,
                      transform: "translate(-50%, -50%)",
                      fontSize: `${titleConfig.size}px`,
                      color: titleConfig.color,
                      fontWeight: titleConfig.fontWeight
                    }}
                  >
                    {titleConfig.text}
                  </div>
                )}
                
                {/* Subtitle */}
                {subtitleConfig.visible && (
                  <div
                    className="absolute whitespace-nowrap"
                    style={{
                      left: `${subtitleConfig.x}%`,
                      top: `${subtitleConfig.y}%`,
                      transform: "translate(-50%, -50%)",
                      fontSize: `${subtitleConfig.size}px`,
                      color: subtitleConfig.color,
                      fontWeight: subtitleConfig.fontWeight
                    }}
                  >
                    {subtitleConfig.text}
                  </div>
                )}
                
                {/* Tagline */}
                {taglineConfig.visible && (
                  <div
                    className="absolute whitespace-nowrap"
                    style={{
                      left: `${taglineConfig.x}%`,
                      top: `${taglineConfig.y}%`,
                      transform: "translate(-50%, -50%)",
                      fontSize: `${taglineConfig.size}px`,
                      color: taglineConfig.color,
                      fontWeight: taglineConfig.fontWeight
                    }}
                  >
                    {taglineConfig.text}
                  </div>
                )}
                
                {/* Phone Badge */}
                {phoneBadge.visible && (
                  <div
                    className="absolute px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                    style={{
                      left: `${phoneBadge.x}%`,
                      top: `${phoneBadge.y}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: phoneBadge.bgColor,
                      color: phoneBadge.textColor
                    }}
                  >
                    <Phone className="h-5 w-5" />
                    {phoneBadge.text}
                  </div>
                )}
                
                {/* WhatsApp Badge */}
                {whatsappBadge.visible && (
                  <div
                    className="absolute px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                    style={{
                      left: `${whatsappBadge.x}%`,
                      top: `${whatsappBadge.y}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: whatsappBadge.bgColor,
                      color: whatsappBadge.textColor
                    }}
                  >
                    <MessageCircle className="h-5 w-5" />
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
                          <Label>Posición X: {titleConfig.x}%</Label>
                          <Slider
                            value={[titleConfig.x]}
                            onValueChange={([v]) => setTitleConfig(prev => ({ ...prev, x: v }))}
                            min={10}
                            max={90}
                            step={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Posición Y: {titleConfig.y}%</Label>
                          <Slider
                            value={[titleConfig.y]}
                            onValueChange={([v]) => setTitleConfig(prev => ({ ...prev, y: v }))}
                            min={10}
                            max={90}
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
                          <Label>Posición X: {subtitleConfig.x}%</Label>
                          <Slider
                            value={[subtitleConfig.x]}
                            onValueChange={([v]) => setSubtitleConfig(prev => ({ ...prev, x: v }))}
                            min={10}
                            max={90}
                            step={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Posición Y: {subtitleConfig.y}%</Label>
                          <Slider
                            value={[subtitleConfig.y]}
                            onValueChange={([v]) => setSubtitleConfig(prev => ({ ...prev, y: v }))}
                            min={10}
                            max={90}
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
