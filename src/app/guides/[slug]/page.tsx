import { Metadata } from 'next';
import { notFound } from "next/navigation";
import GuideDetailDisplay from "../../../components/GuideDetailDisplay";

const getDifficulty = (guide) => {
  if (!guide?._embedded?.['wp:term']) {
    return 'beginner'; // Fallback if no terms are embedded
  }

  const difficultyTerm = guide._embedded['wp:term']
    .flat() // Flatten the array of term arrays
    .find(term => term.taxonomy === 'difficulty');

  return difficultyTerm?.name || 'beginner'; // Use term name or fallback
};

// Fetch the guide data on the server
async function getGuide(slug: string) {
  try {
    const response = await fetch(
      `http://localhost/mylocalwp/wp-json/wp/v2/guides?slug=${slug}&_embed`,
      //{ next: { revalidate: 3600 } } // Revalidate every hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch guide: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.length) {
      return null;
    }
    
    const guide = data[0];

    // Get featured image if available
    let featuredImage = "/placeholder.svg";
    if (guide.uagb_featured_image_src && guide.uagb_featured_image_src.full) {
      featuredImage = guide.uagb_featured_image_src.full[0];
    } else if (guide._embedded && 
        guide._embedded['wp:featuredmedia'] && 
        guide._embedded['wp:featuredmedia'][0] &&
        guide._embedded['wp:featuredmedia'][0].source_url) {
      featuredImage = guide._embedded['wp:featuredmedia'][0].source_url;
    }
    
    // Calculate read time (rough estimate)
    const wordCount = guide.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) + ' min read'; // Assuming 200 words per minute

    const difficulty = getDifficulty(guide);
    
    // Parse recommended products from meta field if available
    let relatedProducts = [];
    if (guide.meta && guide.meta.recommended_products && 
        guide.meta.recommended_products !== "" && 
        guide.meta.recommended_products !== "[]") {
      try {
        let parsedProducts = JSON.parse(guide.meta.recommended_products);
        if (!Array.isArray(parsedProducts)) {
          parsedProducts = [parsedProducts];
        }
        relatedProducts = parsedProducts.map(product => ({
          title: product.product_name || "Product",
          price: "$" + product.product_price || "$0.00",
          image: product.product_url || "/placeholder.svg",
          rating: 4.5, // Default rating since it's not in the meta
          amazonUrl: product.amazon_url || "https://amazon.com",
          description: product.product_description || "Check out this recommended product",
          slug: "" // No slug available from the meta data
        }));
      } catch (error) {
        console.error('Error parsing recommended products:', error);
      }
    }
    
    // If no products were specified or parsing failed, fetch fallback products
    if (relatedProducts.length === 0) {
      try {
        const fallbackResponse = await fetch(
          "http://localhost/mylocalwp/wp-json/my_namespace/v1/products"
        );
        
        if (fallbackResponse.ok) {
          const fallbackProducts = await fallbackResponse.json();
          relatedProducts = fallbackProducts.map(product => ({
            title: product.title || "Product",
            price: "$" + product.price || "$0.00",
            image: product.product_url || "/placeholder.svg",
            rating: product.rating || 4.5,
            amazonUrl: product.amazon_url || "https://amazon.com",
            description: product.description || "Check out this recommended product",
            slug: "" // No slug available from the fallback data
          }));
        }
      } catch (error) {
        console.error('Error fetching fallback products:', error);
      }
    }
    
    return {
      title: guide.title.rendered,
      content: guide.content.rendered,
      excerpt: guide.excerpt.rendered
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .substring(0, 150) + '...', // Limit to 150 characters and add ellipsis
      date: new Date(guide.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      slug: guide.slug,
      featuredImage,
      difficulty,
      readTime,
      relatedProducts,
    };
  } catch (error) {
    console.error('Error fetching guide:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    return {
      title: 'Guide Not Found | StreamGearHub',
      description: 'The requested guide could not be found.'
    };
  }
  
  const guide = await getGuide(resolvedParams.slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found | StreamGearHub',
      description: 'The requested guide could not be found.'
    };
  }
  
  return {
    title: `${guide.title} | StreamGearHub Guides`,
    description: guide.excerpt.replace(/<[^>]*>/g, '').substring(0, 100),
    openGraph: {
      title: guide.title,
      description: guide.excerpt.replace(/<[^>]*>/g, '').substring(0, 100),
      images: [guide.featuredImage],
      type: 'article',
    },
    metadataBase: new URL('http://localhost:3000'),
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const resolvedParams = await params;
 
  if (!resolvedParams.slug) {
    return notFound();
  }
  
  const guide = await getGuide(resolvedParams.slug);
  
  if (!guide) {
    return notFound();
  }
  
  return <GuideDetailDisplay guide={guide} />;
}