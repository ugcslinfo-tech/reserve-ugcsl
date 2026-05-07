import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEO({ title, description, canonical, noindex = false }: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://ugcsl.lk';
  
  useEffect(() => {
    // Set title
    if (title) {
      document.title = title;
    }
    
    // Set or update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || `${baseUrl}${location.pathname}`;
    
    // Set or update description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.content = description;
    }
    
    // Set robots meta
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = noindex ? 'noindex, nofollow' : 'index, follow';
    
  }, [title, description, canonical, location.pathname, noindex]);
  
  return null;
}
