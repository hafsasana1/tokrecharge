import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SiteSettings {
  title: string;
  metaTitle: string;
  metaDescription: string;
  logo?: string;
  favicon?: string;
  googleAnalytics?: string;
  googleTagManager?: string;
  googleSearchConsole?: string;
  googleAdsense?: string;
  facebookPixel?: string;
  verificationMeta?: string;
}

export default function DynamicMeta() {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['/api/site-settings'],
  });

  useEffect(() => {
    // Clear existing analytics scripts to prevent duplicates
    const existingScripts = document.querySelectorAll('script[data-analytics="true"]');
    existingScripts.forEach(script => script.remove());

    if (settings?.googleAnalytics && settings.googleAnalytics.trim()) {
      // Add Google Analytics 4
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics}`;
      script1.setAttribute('data-analytics', 'true');
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.setAttribute('data-analytics', 'true');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.googleAnalytics}');
      `;
      document.head.appendChild(script2);
    }

    if (settings?.googleTagManager && settings.googleTagManager.trim()) {
      // Add Google Tag Manager
      const script = document.createElement('script');
      script.setAttribute('data-analytics', 'true');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settings.googleTagManager}');
      `;
      document.head.appendChild(script);

      // Add noscript fallback for GTM
      const existingNoscript = document.querySelector('noscript[data-gtm="true"]');
      if (existingNoscript) existingNoscript.remove();
      
      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-gtm', 'true');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${settings.googleTagManager}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }

    if (settings?.facebookPixel && settings.facebookPixel.trim()) {
      // Add Facebook Pixel
      const script = document.createElement('script');
      script.setAttribute('data-analytics', 'true');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${settings.facebookPixel}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Add noscript fallback for Facebook Pixel
      const existingPixelNoscript = document.querySelector('noscript[data-fb-pixel="true"]');
      if (existingPixelNoscript) existingPixelNoscript.remove();
      
      const noscript = document.createElement('noscript');
      noscript.setAttribute('data-fb-pixel', 'true');
      noscript.innerHTML = `<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${settings.facebookPixel}&ev=PageView&noscript=1"/>`;
      document.body.appendChild(noscript);
    }

    if (settings?.googleAdsense && settings.googleAdsense.trim()) {
      // Remove existing AdSense scripts
      const existingAdsense = document.querySelectorAll('script[data-adsense="true"]');
      existingAdsense.forEach(script => script.remove());
      
      // Handle both full script tags and client IDs
      if (settings.googleAdsense.includes('<script')) {
        // Full script tag provided - extract and inject
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = settings.googleAdsense;
        const scriptElement = tempDiv.querySelector('script');
        if (scriptElement) {
          const newScript = document.createElement('script');
          newScript.async = scriptElement.async;
          newScript.src = scriptElement.src;
          newScript.crossOrigin = scriptElement.crossOrigin || 'anonymous';
          newScript.setAttribute('data-adsense', 'true');
          document.head.appendChild(newScript);
        }
      } else if (settings.googleAdsense.startsWith('ca-')) {
        // Client ID provided - create script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.googleAdsense}`;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-adsense', 'true');
        document.head.appendChild(script);
      }
    }
  }, [settings]);

  if (!settings) return null;

  return (
    <Helmet>
      {/* Dynamic Title and Meta Tags */}
      <title>{settings.metaTitle}</title>
      <meta name="description" content={settings.metaDescription} />
      
      {/* Favicon */}
      {settings.favicon && <link rel="icon" href={settings.favicon} />}
      
      {/* Verification Meta Tags */}
      {settings.googleSearchConsole && (
        <meta name="google-site-verification" content={settings.googleSearchConsole} />
      )}
      
      {/* Custom Verification Meta Tags */}
      {settings.verificationMeta && 
        settings.verificationMeta.split('\n').map((tag, index) => {
          const trimmedTag = tag.trim();
          if (trimmedTag.startsWith('<meta')) {
            const content = trimmedTag.match(/content="([^"]+)"/)?.[1];
            const name = trimmedTag.match(/name="([^"]+)"/)?.[1];
            const property = trimmedTag.match(/property="([^"]+)"/)?.[1];
            
            if (content && (name || property)) {
              return name ? 
                <meta key={index} name={name} content={content} /> :
                <meta key={index} property={property} content={content} />;
            }
          }
          return null;
        }).filter(Boolean)
      }
      
      {/* Open Graph Tags with Dynamic Content */}
      <meta property="og:title" content={settings.metaTitle} />
      <meta property="og:description" content={settings.metaDescription} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:title" content={settings.metaTitle} />
      <meta name="twitter:description" content={settings.metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}