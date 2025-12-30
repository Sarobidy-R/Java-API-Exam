/**
 * Configuration automatique de l'API selon l'environnement
 * - En développement local : utilise http://localhost:8080
 * - En production (Netlify) : utilise l'API Render
 */

const PRODUCTION_API_URL = 'http://100.71.225.115:8008';
const LOCAL_API_URL = 'http://localhost:8008';

/**
 * Détecte automatiquement l'environnement et retourne l'URL de l'API appropriée
 */
export function getApiUrl(): string {
  // Variables d'environnement explicites (priorité maximale)
  if (import.meta.env.VITE_API_URL) {
    console.log('🔧 Using explicit API URL from environment:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }

  // Détection automatique basée sur l'environnement
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.startsWith('192.168.');

  if (isLocalhost) {
    console.log('🏠 Development environment detected, using local API:', LOCAL_API_URL);
    return LOCAL_API_URL;
  }

  console.log('🌐 Production environment detected, using production API:', PRODUCTION_API_URL);
  return PRODUCTION_API_URL;
}

/**
 * Vérifie si l'API locale est disponible
 */
export async function checkLocalApiAvailability(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // Timeout de 2 secondes
    
    const response = await fetch(`${LOCAL_API_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Configuration de l'API avec fallback automatique
 */
export async function getApiConfigWithFallback(): Promise<{ url: string; isLocal: boolean }> {
  const configuredUrl = getApiUrl();
  
  // Si une URL locale est configurée, vérifie sa disponibilité
  if (configuredUrl === LOCAL_API_URL) {
    const isLocalAvailable = await checkLocalApiAvailability();
    
    if (isLocalAvailable) {
      console.log('✅ Local API is available');
      return { url: LOCAL_API_URL, isLocal: true };
    } else {
      console.log('⚠️ Local API not available, falling back to production');
      return { url: PRODUCTION_API_URL, isLocal: false };
    }
  }
  
  return { url: configuredUrl, isLocal: false };
}

export const API_CONFIG = {
  PRODUCTION_URL: PRODUCTION_API_URL,
  LOCAL_URL: LOCAL_API_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
