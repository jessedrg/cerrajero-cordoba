import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { put } from "@vercel/blob"

// Base images for random selection
const BASE_IMAGES = [
  "/images/hero/cerrajero-1.png",
  "/images/hero/cerrajero-2.png", 
  "/images/hero/cerrajero-3.png",
  "/images/hero/cerrajero-4.png",
]

// Random taglines
const TAGLINES = [
  "Servicio 24 horas",
  "Presupuesto sin compromiso",
  "Llegamos en 20 minutos",
  "Profesionales certificados",
  "Precio económico garantizado",
  "Disponible en tu zona, llama ya",
]

// Color palettes for variety
const ACCENT_COLORS = [
  "#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#06b6d4", "#eab308",
]

const TITLE_COLORS = [
  "#1e293b", "#0f172a", "#334155", "#1e40af", "#0c4a6e", 
  "#14532d", "#4c1d95", "#831843", "#1f2937", "#18181b",
]

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { pageId } = await request.json()
    
    if (!pageId) {
      return NextResponse.json({ error: "Missing pageId" }, { status: 400 })
    }
    
    // Get page details
    const { data: page, error: pageError } = await supabase
      .from("pages")
      .select(`
        id, slug, status,
        services:service_id(name, slug),
        cities:city_id(name, slug)
      `)
      .eq("id", pageId)
      .single()
    
    if (pageError || !page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }
    
    const serviceName = (page.services as { name: string })?.name || "Cerrajero"
    const cityName = (page.cities as { name: string })?.name || "Tu ciudad"
    
    // Random selections for variety
    const randomImage = BASE_IMAGES[Math.floor(Math.random() * BASE_IMAGES.length)]
    const randomTagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
    const randomAccent = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
    const randomTitleColor = TITLE_COLORS[Math.floor(Math.random() * TITLE_COLORS.length)]
    
    // Random positions (with some variation)
    const baseX = Math.floor(4 + Math.random() * 3) // 4-6%
    const titleY = Math.floor(25 + Math.random() * 5) // 25-29%
    const subtitleY = Math.floor(40 + Math.random() * 5) // 40-44%
    const taglineY = Math.floor(52 + Math.random() * 4) // 52-55%
    const badgeY = Math.floor(66 + Math.random() * 6) // 66-71%
    
    // Random badge visibility (sometimes hide one)
    const showPhoneBadge = Math.random() > 0.1 // 90% chance
    const showWhatsappBadge = Math.random() > 0.3 // 70% chance
    
    // Generate image using Canvas API on the server
    // For now, we'll create a simple placeholder and let the client generate
    // In production, you'd use node-canvas or similar
    
    // Update page with configuration (client will generate image on next edit)
    const heroConfig = {
      image: randomImage,
      title: {
        text: `${serviceName} en ${cityName}`,
        x: baseX,
        y: titleY,
        color: randomTitleColor,
        size: 42,
        visible: true,
        fontWeight: "bold"
      },
      subtitle: {
        text: "Servicio profesional 24 horas",
        x: baseX,
        y: subtitleY,
        color: "#475569",
        size: 22,
        visible: true
      },
      tagline: {
        text: randomTagline,
        x: baseX,
        y: taglineY,
        color: randomAccent,
        size: 16,
        visible: true
      },
      phoneBadge: {
        text: "900 433 189",
        x: baseX,
        y: badgeY,
        bgColor: randomAccent,
        textColor: "#ffffff",
        visible: showPhoneBadge
      },
      whatsappBadge: {
        text: "cerrajerocordoba.es",
        x: baseX + 22,
        y: badgeY,
        bgColor: "#22c55e",
        textColor: "#ffffff",
        visible: showWhatsappBadge
      },
      stripe: {
        visible: Math.random() > 0.2, // 80% chance
        color: randomAccent
      }
    }
    
    // Store config and mark as pending for image generation
    const { error: updateError } = await supabase
      .from("pages")
      .update({
        hero_config: heroConfig,
        status: "pending",
        updated_at: new Date().toISOString()
      })
      .eq("id", pageId)
    
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      config: heroConfig,
      message: `Config generated for ${serviceName} en ${cityName}`
    })
    
  } catch (error) {
    console.error("Bulk generate error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
