import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Clock, CheckCircle } from 'lucide-react';
import { apiService } from '../services/apiService';

interface ApiStatusProps {
  className?: string;
}

export const ApiStatus = React.memo<ApiStatusProps>(({ className = '' }) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline' | 'warming'>('checking');
  const [responseTime, setResponseTime] = useState<number | null>(null);
  
  useEffect(() => {
    checkApiStatus();
    // Vérifier le statut toutes les 30 secondes
    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    try {
      const startTime = Date.now();
      setStatus('checking');
      
      // Essayer un appel simple à l'API
      await apiService.getHealth();
      
      const endTime = Date.now();
      const time = endTime - startTime;
      setResponseTime(time);
      
      // Si c'est très lent (>10s), c'est probablement un cold start
      if (time > 10000) {
        setStatus('warming');
        // Attendre un peu puis remettre à online
        setTimeout(() => setStatus('online'), 5000);
      } else {
        setStatus('online');
      }
    } catch {
      setStatus('offline');
      setResponseTime(null);
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'checking':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'Vérification...',
          description: 'Test de connexion à l\'API'
        };
      case 'warming':
        return {
          icon: Clock,
          color: 'text-orange-600',
          bg: 'bg-orange-50 border-orange-200',
          text: 'Réveil en cours...',
          description: 'L\'API Render se réveille (cold start)'
        };
      case 'online':
        return {
          icon: responseTime && responseTime > 5000 ? Wifi : CheckCircle,
          color: responseTime && responseTime > 5000 ? 'text-yellow-600' : 'text-green-600',
          bg: responseTime && responseTime > 5000 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200',
          text: 'En ligne',
          description: responseTime ? `Temps de réponse: ${responseTime}ms` : 'API accessible'
        };
      case 'offline':
        return {
          icon: WifiOff,
          color: 'text-red-600',
          bg: 'bg-red-50 border-red-200',
          text: 'Hors ligne',
          description: 'Impossible de contacter l\'API'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bg} ${className}`}>
      <IconComponent 
        size={16} 
        className={`${config.color} ${status === 'checking' ? 'animate-spin' : ''}`} 
      />
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${config.color}`}>
          {config.text}
        </span>
        <span className="text-xs text-gray-500">
          {config.description}
        </span>
      </div>
      
      {status === 'warming' && (
        <div className="ml-2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
});

ApiStatus.displayName = 'ApiStatus';
