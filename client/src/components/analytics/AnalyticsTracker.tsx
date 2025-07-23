import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Generate session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track page visits
const trackPageVisit = async (page: string, title: string, referer?: string) => {
  try {
    const sessionId = getSessionId();
    
    await fetch('/api/track/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        title,
        referer: referer || document.referrer,
        sessionId
      }),
    });
  } catch (error) {
    console.error('Failed to track page visit:', error);
  }
};

// Track active users
const trackActiveUser = async (page: string) => {
  try {
    const sessionId = getSessionId();
    
    await fetch('/api/track/active', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        sessionId
      }),
    });
  } catch (error) {
    console.error('Failed to track active user:', error);
  }
};

export function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page visit
    const title = document.title || 'TokRecharge.com';
    trackPageVisit(location, title);

    // Track active user immediately and every 30 seconds
    trackActiveUser(location);
    const activeUserInterval = setInterval(() => {
      trackActiveUser(location);
    }, 30000); // 30 seconds

    return () => {
      clearInterval(activeUserInterval);
    };
  }, [location]);

  // Component doesn't render anything
  return null;
}

export default AnalyticsTracker;