import React, { useState, useEffect } from 'react';
import { X, Wifi } from 'lucide-react';

export const RenderApiNotification = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher la notification au chargement
    const hasSeenNotification = localStorage.getItem('render-api-notification-seen');
    if (!hasSeenNotification) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('render-api-notification-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Wifi className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            API déployée sur Render
          </h3>
          <p className="mt-1 text-sm text-blue-700">
            Cette interface utilise maintenant uniquement l'API déployée sur Render. 
            Le premier chargement peut prendre 10-30 secondes (cold start).
          </p>
          <p className="mt-2 text-xs text-blue-600">
            URL: https://java-api-front.rasendra.app/
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

RenderApiNotification.displayName = 'RenderApiNotification';
