'use client'

import { useEffect } from 'react'

export default function SiteBehaviourScript() {
  useEffect(() => {
    // Only run on client side
    const sbSiteSecret = process.env.NEXT_PUBLIC_SITEBEHAVIOUR_SECRET;
    
    // If the secret is not available, don't proceed
    if (!sbSiteSecret) {
      console.warn('SiteBehaviour tracking secret is not defined in environment variables');
      return;
    }
    
    // Set the tracking secret on the window object
    (window as any).sitebehaviourTrackingSecret = sbSiteSecret;
    
    const scriptElement = document.createElement('script')
    scriptElement.async = true
    scriptElement.id = 'site-behaviour-script-v2'
    scriptElement.src = `https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=${sbSiteSecret}`
    
    document.head.appendChild(scriptElement)
    
    // Cleanup function to remove script if component unmounts
    return () => {
      const existingScript = document.getElementById('site-behaviour-script-v2')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, []) // Empty dependency array means this runs once on mount

  return null // This component doesn't render anything
}