import { useState, useEffect } from 'react';
import { Server, Globe, RefreshCw } from 'lucide-react';
import { apiService } from '../services/apiService';

interface ApiEnvironmentDisplayProps {
  className?: string;
}

export function ApiEnvironmentDisplay({ className = '' }: ApiEnvironmentDisplayProps) {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [isLocal, setIsLocal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const updateApiInfo = async () => {
    setIsLoading(true);
    try {
      // Rafraîchir la configuration de l'API
      await apiService.refreshConfiguration();
      
      const currentUrl = apiService.getCurrentApiUrl();
      const localStatus = apiService.isUsingLocalApi();
      
      setApiUrl(currentUrl);
      setIsLocal(localStatus);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Failed to update API info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateApiInfo();
  }, []);

  const getDisplayInfo = () => {
    if (isLocal) {
      return {
        icon: Server,
        label: 'API Locale',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Développement local'
      };
    } else {
      return {
        icon: Globe,
        label: 'API Production',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: 'Serveur Render'
      };
    }
  };

  const { icon: Icon, label, color, bgColor, borderColor, description } = getDisplayInfo();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200 ${className}`}>
        <RefreshCw className="h-4 w-4 text-gray-500 animate-spin" />
        <span className="text-sm text-gray-600">Configuration de l'API...</span>
      </div>
    );
  }

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <div>
            <span className={`font-medium text-sm ${color}`}>{label}</span>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        </div>
        
        <button
          onClick={updateApiInfo}
          className="p-1 rounded hover:bg-white/50 transition-colors"
          title="Rafraîchir la configuration"
        >
          <RefreshCw className={`h-3 w-3 ${color} ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-200/50">
        <p className="text-xs text-gray-500 font-mono break-all">
          {apiUrl}
        </p>
        {lastCheck && (
          <p className="text-xs text-gray-400 mt-1">
            Dernière vérification: {lastCheck.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Composant minimal pour l'affichage dans la barre de statut
 */
export function ApiEnvironmentBadge({ className = '' }: ApiEnvironmentDisplayProps) {
  const [isLocal, setIsLocal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkApiEnvironment = async () => {
      try {
        await apiService.refreshConfiguration();
        setIsLocal(apiService.isUsingLocalApi());
      } catch (error) {
        console.error('Failed to check API environment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkApiEnvironment();
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <RefreshCw className="h-3 w-3 text-gray-400 animate-spin" />
        <span className="text-xs text-gray-500">API...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {isLocal ? (
        <>
          <Server className="h-3 w-3 text-green-600" />
          <span className="text-xs text-green-600 font-medium">Local</span>
        </>
      ) : (
        <>
          <Globe className="h-3 w-3 text-blue-600" />
          <span className="text-xs text-blue-600 font-medium">Prod</span>
        </>
      )}
    </div>
  );
}
