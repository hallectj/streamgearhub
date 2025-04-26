import { MetadataRoute } from 'next'
import { wpApiUrl, SITE_URL } from '@/config/api'

// Helper function to fetch all posts with better error handling
async function getAllPosts() {
  try {
    const response = await fetch(wpApiUrl('posts?per_page=100'), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
    return [] // Return empty array on error
  }
}

// Helper function to fetch all reviews with better error handling
async function getAllReviews() {
  try {
    const response = await fetch(wpApiUrl('review?per_page=100'), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error('Error fetching reviews for sitemap:', error)
    return [] // Return empty array on error
  }
}

// Helper function to fetch all guides with better error handling
async function getAllGuides() {
  try {
    const response = await fetch(wpApiUrl('guide?per_page=100'), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error('Error fetching guides for sitemap:', error)
    return [] // Return empty array on error
  }
}

// Helper function to fetch all streamers with better error handling
async function getAllStreamers() {
  try {
    const response = await fetch(wpApiUrl('streamer?per_page=100'), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error('Error fetching streamers for sitemap:', error)
    return [] // Return empty array on error
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/streamers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Fetch all dynamic content with error handling
  let posts = [], reviews = [], guides = [], streamers = []
  
  try {
    // Use Promise.allSettled instead of Promise.all to handle partial failures
    const results = await Promise.allSettled([
      getAllPosts(),
      getAllReviews(),
      getAllGuides(),
      getAllStreamers(),
    ])
    
    // Extract successful results
    posts = results[0].status === 'fulfilled' ? results[0].value : []
    reviews = results[1].status === 'fulfilled' ? results[1].value : []
    guides = results[2].status === 'fulfilled' ? results[2].value : []
    streamers = results[3].status === 'fulfilled' ? results[3].value : []
  } catch (error) {
    console.error('Error fetching content for sitemap:', error)
    // Continue with empty arrays
  }

  // Add blog posts to sitemap
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Add reviews to sitemap
  const reviewUrls = reviews.map((review: any) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: new Date(review.modified || review.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Add guides to sitemap
  const guideUrls = guides.map((guide: any) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.modified || guide.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Add streamers to sitemap
  const streamerUrls = streamers.map((streamer: any) => ({
    url: `${baseUrl}/streamers/${streamer.slug}`,
    lastModified: new Date(streamer.modified || streamer.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...postUrls, ...reviewUrls, ...guideUrls, ...streamerUrls] as MetadataRoute.Sitemap
}