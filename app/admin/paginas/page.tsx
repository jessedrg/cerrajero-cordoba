"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Search,
  Globe,
  Calendar,
  Edit,
  Star,
  Loader2,
  ExternalLink,
  FileText,
  Trash2,
  ImageOff,
  Users
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Page {
  id: string
  slug: string
  status: "published" | "draft" | "pending"
  title: string | null
  sitemap_priority: number
  published_at: string | null
  updated_at: string
  hero_image_url: string | null
  services: { name: string; slug: string } | null
  cities: { name: string; slug: string; population: number | null } | null
}

export default function PaginasPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [bulkPublishing, setBulkPublishing] = useState(false)
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0, status: "" })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages/list")
      if (res.ok) {
        const data = await res.json()
        setPages(data.pages || [])
      }
    } catch (error) {
      console.error("Error fetching pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (id: string) => {
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/pages?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setPages(prev => prev.filter(p => p.id !== id))
      } else {
        const error = await res.json()
        alert("Error eliminando pagina: " + (error.error || "Error desconocido"))
      }
    } catch (error) {
      console.error("Error deleting page:", error)
      alert("Error de conexion al eliminar")
    } finally {
      setDeleting(null)
    }
  }

  // Base images for random selection
  const BASE_IMAGES = [
    "/images/cerrajero-1.png",
    "/images/cerrajero-2.png", 
    "/images/cerrajero-3.png",
    "/images/cerrajero-4.png",
  ]
  
  // Random taglines
  const TAGLINES = [
    "Servicio 24 horas",
    "Llegamos en 15-30 minutos",
    "Presupuesto sin compromiso",
    "Profesionales certificados",
    "Urgencias atendidas al momento",
  ]
  
  // Color palettes
  const TITLE_COLORS = ["#1e293b", "#0f172a", "#1e40af", "#0c4a6e", "#14532d", "#4c1d95", "#831843"]
  const ACCENT_COLORS = ["#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]
  const SUBTITLE_COLORS = ["#475569", "#64748b", "#6b7280", "#71717a"]
  
  // Generate image on canvas - SAME logic as HeroImageEditor
  const generateImageBlob = async (
    serviceName: string, 
    cityName: string
  ): Promise<Blob> => {
    const WIDTH = 1200
    const HEIGHT = 630
    
    const canvas = document.createElement("canvas")
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const ctx = canvas.getContext("2d")!
    
    // Random selections
    const randomImage = BASE_IMAGES[Math.floor(Math.random() * BASE_IMAGES.length)]
    const titleColor = TITLE_COLORS[Math.floor(Math.random() * TITLE_COLORS.length)]
    const accentColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
    const subtitleColor = SUBTITLE_COLORS[Math.floor(Math.random() * SUBTITLE_COLORS.length)]
    const tagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
    const showPhoneBadge = Math.random() > 0.2 // 80% chance
    const showWhatsappBadge = Math.random() > 0.3 // 70% chance
    const showStripe = Math.random() > 0.3 // 70% chance
    
    // Random font sizes
    const titleSize = Math.floor(42 + Math.random() * 10) * 2 // 84-104px
    const subtitleSize = Math.floor(20 + Math.random() * 6) * 2 // 40-52px
    const taglineSize = Math.floor(16 + Math.random() * 6) * 2 // 32-44px
    
    // Fill white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    
    // Load and draw background image
    const img = new Image()
    img.crossOrigin = "anonymous"
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => resolve() // Continue even if image fails
      img.src = window.location.origin + randomImage
    })
    
    if (img.complete && img.naturalWidth > 0) {
      const imgRatio = img.width / img.height
      const canvasRatio = WIDTH / HEIGHT
      let drawWidth, drawHeight, drawX, drawY
      
      if (imgRatio > canvasRatio) {
        drawHeight = HEIGHT
        drawWidth = HEIGHT * imgRatio
        drawX = (WIDTH - drawWidth) / 2
        drawY = 0
      } else {
        drawWidth = WIDTH
        drawHeight = WIDTH / imgRatio
        drawX = 0
        drawY = 0
      }
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    }
    
    // Draw gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0)
    gradient.addColorStop(0, "rgba(255,255,255,0.95)")
    gradient.addColorStop(0.4, "rgba(255,255,255,0.75)")
    gradient.addColorStop(0.7, "rgba(255,255,255,0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    
    // Draw stripe
    if (showStripe) {
      ctx.fillStyle = accentColor
      ctx.fillRect(0, 0, 8, HEIGHT)
    }
    
    // Text wrapping helper
    const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`
      const words = text.split(' ')
      const lines: string[] = []
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)
      return lines
    }
    
    // Sequential layout
    let currentY = 80
    const leftMargin = WIDTH * 0.05
    const maxTextWidth = WIDTH * 0.50
    const verticalGap = 20
    
    // Draw title
    ctx.fillStyle = titleColor
    ctx.font = `bold ${titleSize}px system-ui, -apple-system, sans-serif`
    ctx.textBaseline = "top"
    const titleText = `${serviceName} en ${cityName}`
    const titleLines = wrapText(titleText, maxTextWidth, titleSize)
    const lineHeight = titleSize * 1.15
    
    titleLines.forEach((line, i) => {
      ctx.fillText(line, leftMargin, currentY + i * lineHeight)
    })
    currentY += titleLines.length * lineHeight + verticalGap
    
    // Draw subtitle
    ctx.fillStyle = subtitleColor
    ctx.font = `normal ${subtitleSize}px system-ui, -apple-system, sans-serif`
    ctx.fillText("Servicio profesional 24 horas", leftMargin, currentY)
    currentY += subtitleSize + verticalGap
    
    // Draw tagline
    ctx.fillStyle = accentColor
    ctx.font = `600 ${taglineSize}px system-ui, -apple-system, sans-serif`
    ctx.fillText(tagline, leftMargin, currentY)
    currentY += taglineSize + verticalGap + 10
    
    // Badges
    const badgeFontSize = 36
    const badgePaddingX = 32
    const badgePaddingY = 16
    const badgeGap = 24
    
    let badgeX = leftMargin
    
    if (showPhoneBadge) {
      ctx.font = `bold ${badgeFontSize}px system-ui, -apple-system, sans-serif`
      const phoneText = "900 433 189"
      const textWidth = ctx.measureText(phoneText).width
      const boxWidth = textWidth + badgePaddingX * 2
      const boxHeight = badgeFontSize + badgePaddingY * 2
      
      ctx.fillStyle = accentColor
      ctx.fillRect(badgeX, currentY, boxWidth, boxHeight)
      ctx.fillStyle = "#ffffff"
      ctx.textBaseline = "top"
      ctx.fillText(phoneText, badgeX + badgePaddingX, currentY + badgePaddingY)
      
      badgeX += boxWidth + badgeGap
    }
    
    if (showWhatsappBadge) {
      ctx.font = `600 ${badgeFontSize}px system-ui, -apple-system, sans-serif`
      const whatsappText = "cerrajerocordoba.es"
      const textWidth = ctx.measureText(whatsappText).width
      const boxWidth = textWidth + badgePaddingX * 2
      const boxHeight = badgeFontSize + badgePaddingY * 2
      
      ctx.fillStyle = "#22c55e"
      ctx.fillRect(badgeX, currentY, boxWidth, boxHeight)
      ctx.fillStyle = "#ffffff"
      ctx.textBaseline = "top"
      ctx.fillText(whatsappText, badgeX + badgePaddingX, currentY + badgePaddingY)
    }
    
    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Failed to create blob"))
      }, "image/jpeg", 0.92)
    })
  }

  // Bulk publish pages without hero images
  const bulkPublish = async () => {
    const pagesWithoutImages = pages.filter(p => !p.hero_image_url)
    if (pagesWithoutImages.length === 0) {
      alert("No hay páginas sin imagen para publicar en bulk")
      return
    }
    
    if (!confirm(`Se van a generar imágenes para ${pagesWithoutImages.length} páginas. ¿Continuar?`)) {
      return
    }
    
    setBulkPublishing(true)
    setBulkProgress({ current: 0, total: pagesWithoutImages.length, status: "Iniciando..." })
    
    let successCount = 0
    
    for (let i = 0; i < pagesWithoutImages.length; i++) {
      const page = pagesWithoutImages[i]
      const cityName = page.cities?.name || "Ciudad"
      const serviceName = page.services?.name || "Cerrajero"
      
      setBulkProgress({ 
        current: i + 1, 
        total: pagesWithoutImages.length, 
        status: `Generando: ${serviceName} en ${cityName}` 
      })
      
      try {
        // Generate image in browser
        const blob = await generateImageBlob(serviceName, cityName)
        
        // Upload to Blob storage
        const safeCityName = cityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const safeServiceName = serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const filename = `hero-${safeServiceName}-${safeCityName}-${Date.now()}.jpg`
        const file = new File([blob], filename, { type: "image/jpeg" })
        
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "pages")
        formData.append("optimize", "false")
        
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        })
        
        if (!uploadRes.ok) {
          throw new Error("Upload failed")
        }
        
        const uploadData = await uploadRes.json()
        
        // Update page with the image URL
        const updateRes = await fetch(`/api/admin/pages/${page.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hero_image_url: uploadData.url })
        })
        
        if (updateRes.ok) {
          successCount++
        }
      } catch (error) {
        console.error(`Error processing ${page.slug}:`, error)
      }
      
      // Small delay
      await new Promise(r => setTimeout(r, 300))
    }
    
    setBulkProgress({ current: pagesWithoutImages.length, total: pagesWithoutImages.length, status: `Completado! ${successCount} imágenes generadas` })
    
    setTimeout(() => {
      setBulkPublishing(false)
      fetchPages()
    }, 2000)
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.slug.toLowerCase().includes(search.toLowerCase()) ||
      page.services?.name.toLowerCase().includes(search.toLowerCase()) ||
      page.cities?.name.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || page.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Publicada</Badge>
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pendiente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Todas las Páginas</h1>
          <p className="text-muted-foreground mt-1">
            {pages.length} páginas en total - {pages.filter(p => p.status === "published").length} publicadas
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={bulkPublish}
            disabled={bulkPublishing}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            {bulkPublishing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {bulkProgress.current}/{bulkProgress.total}
              </>
            ) : (
              <>
                <ImageOff className="h-4 w-4 mr-2" />
                Publicar en Bulk
              </>
            )}
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/admin/nueva-pagina">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Página
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por servicio, ciudad o URL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="published">Publicadas</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pages Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Fecha Publicación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No se encontraron páginas
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {page.services?.name || "Sin servicio"} en {page.cities?.name || "Sin ciudad"}
                            {!page.hero_image_url && (
                              <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded" title="Sin imagen">
                                <ImageOff className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              /{page.slug}
                            </span>
                            {page.cities?.population && (
                              <span className="flex items-center gap-1" title="Poblacion">
                                <Users className="h-3 w-3" />
                                {page.cities.population.toLocaleString('es-ES')} hab.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(page.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {page.sitemap_priority || 0.8}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(page.published_at)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/paginas/${page.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Link>
                        </Button>
                        {page.status === "published" && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              disabled={deleting === page.id}
                            >
                              {deleting === page.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar pagina</AlertDialogTitle>
                              <AlertDialogDescription>
                                Estas seguro de que quieres eliminar la pagina <strong>/{page.slug}</strong>? 
                                Esta accion no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deletePage(page.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
