import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: object;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage = "/og-image.jpg",
  schemaData 
}: SEOHeadProps) {
  useEffect(() => {
    // Set title
    document.title = title;
    
    // Set meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: ogImage },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const existingTag = document.querySelector(`meta[${name ? 'name' : 'property'}="${name || property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const newTag = document.createElement('meta');
        if (name) newTag.setAttribute('name', name);
        if (property) newTag.setAttribute('property', property);
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
      }
    });

    // Set canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonical);
        document.head.appendChild(canonicalTag);
      }
    }

    // Set structured data
    if (schemaData) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schemaData);
      } else {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.textContent = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
      }
    }
  }, [title, description, keywords, canonical, ogImage, schemaData]);

  return null;
}
