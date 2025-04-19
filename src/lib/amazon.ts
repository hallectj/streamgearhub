/**
 * Utility function to append Amazon affiliate tag to Amazon URLs
 * @param url The Amazon URL to append the affiliate tag to
 * @returns The URL with the affiliate tag appended
 */
export function appendAmazonAffiliateTag(url: string): string {
  // Check if it's an Amazon URL
  if (!url || !url.includes('amazon.com')) {
    return url;
  }

  // The affiliate tag to append
  const affiliateTag = 'streamgearh09-20';
  
  // Check if the URL already has parameters
  const hasParams = url.includes('?');
  
  // Check if the URL already has the tag
  if (url.includes(`tag=${affiliateTag}`)) {
    return url;
  }
  
  // If the URL already has parameters, append the tag with &
  // Otherwise, append the tag with ?
  const separator = hasParams ? '&' : '?';
  
  return `${url}${separator}tag=${affiliateTag}`;
}