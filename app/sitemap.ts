import { MetadataRoute } from "next"
import { createServiceClient } from "@/lib/supabase/server"

// Force dynamic rendering - no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

/**
 * Sitemap dinámico - Solo incluye contenido publicado de la base de datos
 * Todo configurable desde Supabase:
 * - sitemap_priority: Prioridad de la página (0.0 - 1.0)
 * - sitemap_changefreq: Frecuencia de cambio (daily, weekly, monthly, etc.)
 * - sitemap_exclude: Excluir del sitemap (true/false)
 * 
 * Organizado por categorías:
 * 1. Home (prioridad máxima)
 * 2. Índices de servicios (solo si tienen páginas publicadas)
 * 3. Páginas pSEO publicadas (servicio/ciudad)
 * 4. Blog posts publicados
 * 
 * NO incluye: páginas legales, políticas, páginas estáticas
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cerrajerocordoba.es"
  const supabase = createServiceClient()

  // ============================================
  // 1. HOME - Página principal (siempre incluida)
  // ============================================
  const homePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ]

  // ============================================
  // 2. SERVICIOS - Índices y configuración desde DB
  // ============================================
  const { data: services } = await supabase
    .from("services")
    .select(`
      id,
      slug,
      updated_at,
      sitemap_priority,
      sitemap_changefreq,
      sitemap_exclude
    `)
    .eq("sitemap_exclude", false)
    .order("name")

  // Obtener IDs de servicios con páginas publicadas
  const { data: publishedPageServiceIds } = await supabase
    .from("pages")
    .select("service_id")
    .eq("status", "published")
    .eq("sitemap_exclude", false)

  const servicesWithPublishedPages = new Set(
    publishedPageServiceIds?.map(p => p.service_id) || []
  )

  // Índices de servicios - solo si tienen páginas publicadas
  const serviceIndexPages: MetadataRoute.Sitemap = (services || [])
    .filter(service => servicesWithPublishedPages.has(service.id))
    .map(service => ({
      url: `${baseUrl}/${service.slug}`,
      lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
      changeFrequency: (service.sitemap_changefreq || "weekly") as ChangeFrequency,
      priority: service.sitemap_priority ? Number(service.sitemap_priority) : 0.9,
    }))

  // ============================================
  // 3. PÁGINAS pSEO PUBLICADAS - Configuración desde DB
  // ============================================
  const { data: publishedPages } = await supabase
    .from("pages")
    .select(`
      slug,
      published_at,
      updated_at,
      sitemap_priority,
      sitemap_changefreq,
      sitemap_exclude
    `)
    .eq("status", "published")
    .eq("sitemap_exclude", false)
    .order("sitemap_priority", { ascending: false })
    .order("published_at", { ascending: false })

  const pagesEntries: MetadataRoute.Sitemap = (publishedPages || []).map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updated_at 
      ? new Date(page.updated_at) 
      : page.published_at 
        ? new Date(page.published_at) 
        : new Date(),
    changeFrequency: (page.sitemap_changefreq || "weekly") as ChangeFrequency,
    priority: page.sitemap_priority ? Number(page.sitemap_priority) : 0.8,
  }))

  // ============================================
  // 4. BLOG POSTS PUBLICADOS - Configuración desde DB
  // ============================================
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select(`
      slug,
      published_at,
      updated_at,
      sitemap_priority,
      sitemap_changefreq,
      sitemap_exclude
    `)
    .eq("status", "published")
    .eq("sitemap_exclude", false)
    .order("sitemap_priority", { ascending: false })
    .order("published_at", { ascending: false })

  // Índice del blog - solo si hay posts publicados
  const blogIndexPages: MetadataRoute.Sitemap = blogPosts && blogPosts.length > 0
    ? [{
        url: `${baseUrl}/blog`,
        lastModified: blogPosts[0]?.updated_at 
          ? new Date(blogPosts[0].updated_at) 
          : blogPosts[0]?.published_at 
            ? new Date(blogPosts[0].published_at) 
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }]
    : []

  const blogEntries: MetadataRoute.Sitemap = (blogPosts || []).map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at 
      ? new Date(post.updated_at) 
      : post.published_at 
        ? new Date(post.published_at) 
        : new Date(),
    changeFrequency: (post.sitemap_changefreq || "monthly") as ChangeFrequency,
    priority: post.sitemap_priority ? Number(post.sitemap_priority) : 0.7,
  }))

  // ============================================
  // COMBINAR TODO EN ORDEN DE PRIORIDAD
  // ============================================
  return [
    // 1. Home
    ...homePages,
    // 2. Índices de servicios (fontanero, electricista, etc.)
    ...serviceIndexPages,
    // 3. Páginas pSEO (servicio/ciudad)
    ...pagesEntries,
    // 4. Índice del blog
    ...blogIndexPages,
    // 5. Posts del blog
    ...blogEntries,
  ]
}
