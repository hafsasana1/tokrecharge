import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AdSenseAdProps {
  position: string;
  pageType?: string;
  className?: string;
}

interface AdPlacement {
  id: number;
  name: string;
  type: string;
  size: string;
  position: string;
  adUnitId: string;
  isActive: boolean;
  pageType: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({ position, pageType = "all", className = "" }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  const { data: adsResponse, isError, isLoading } = useQuery<AdPlacement[]>({
    queryKey: ["/api/adsense/active"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/adsense/active");
        if (!response.ok) {
          return []; // Return empty array if API fails
        }
        const data = await response.json();
        return Array.isArray(data) ? data : []; // Ensure we always return an array
      } catch (error) {
        console.error("Failed to fetch ads:", error);
        return []; // Return empty array on error
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  // Ensure ads is always an array
  const ads = Array.isArray(adsResponse) ? adsResponse : [];

  // Find matching ad placement
  const adPlacement = ads.find(ad => 
    ad.isActive && 
    ad.position === position && 
    (ad.pageType === "all" || ad.pageType === pageType)
  );

  useEffect(() => {
    if (adPlacement && adPlacement.adUnitId && adRef.current) {
      try {
        // Initialize AdSense if not already done
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Push the ad
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adPlacement]);

  // Don't render if no matching ad placement or if still loading
  if (isLoading || !adPlacement || !adPlacement.adUnitId) {
    return null;
  }

  const getAdStyle = () => {
    switch (adPlacement.size) {
      case '728x90':
        return { width: '728px', height: '90px' };
      case '300x250':
        return { width: '300px', height: '250px' };
      case '320x100':
        return { width: '320px', height: '100px' };
      case '320x50':
        return { width: '320px', height: '50px' };
      case '160x600':
        return { width: '160px', height: '600px' };
      case 'responsive':
      default:
        return { display: 'block', width: '100%' };
    }
  };

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client={adPlacement.adUnitId.split('/')[0]}
        data-ad-slot={adPlacement.adUnitId.split('/')[1]}
        data-ad-format={adPlacement.size === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={adPlacement.size === 'responsive' ? 'true' : undefined}
      />
    </div>
  );
}

// Specific ad components for different positions
export function HeaderAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="header" 
      pageType={pageType}
      className="my-4 flex justify-center"
    />
  );
}

export function SidebarAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="sidebar" 
      pageType={pageType}
      className="sticky top-4"
    />
  );
}

export function FooterAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="footer" 
      pageType={pageType}
      className="my-4 flex justify-center"
    />
  );
}

export function ArticleTopAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="article-top" 
      pageType={pageType}
      className="my-6 flex justify-center"
    />
  );
}

export function ArticleMiddleAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="article-middle" 
      pageType={pageType}
      className="my-8 flex justify-center"
    />
  );
}

export function ArticleBottomAd({ pageType }: { pageType?: string }) {
  return (
    <AdSenseAd 
      position="article-bottom" 
      pageType={pageType}
      className="my-6 flex justify-center"
    />
  );
}