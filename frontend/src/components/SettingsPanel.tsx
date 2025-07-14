import React, { useState } from 'react';
import { Settings, Clock, Zap, ZapOff } from 'lucide-react';

interface SettingsPanelProps {
  isAutoRefreshEnabled: boolean;
  onToggleAutoRefresh: () => void;
  refreshInterval?: number;
  onIntervalChange?: (interval: number) => void;
}

export const SettingsPanel = React.memo<SettingsPanelProps>(({
  isAutoRefreshEnabled,
  onToggleAutoRefresh,
  refreshInterval = 10000,
  onIntervalChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempInterval, setTempInterval] = useState(refreshInterval / 1000);

  const handleIntervalSave = () => {
    if (onIntervalChange) {
      onIntervalChange(tempInterval * 1000);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        title="Paramètres d'actualisation"
      >
        <Settings size={16} />
        Paramètres
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-64">
          <h3 className="font-semibold mb-3 text-gray-800">Actualisation automatique</h3>
          
          <div className="space-y-3">
            {/* Toggle auto-refresh */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-refresh</span>
              <button
                onClick={onToggleAutoRefresh}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  isAutoRefreshEnabled 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAutoRefreshEnabled ? (
                  <>
                    <Zap size={14} />
                    Activé
                  </>
                ) : (
                  <>
                    <ZapOff size={14} />
                    Désactivé
                  </>
                )}
              </button>
            </div>

            {/* Interval setting */}
            {onIntervalChange && (
              <div className="space-y-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock size={14} />
                  Intervalle (secondes)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={tempInterval}
                    onChange={(e) => setTempInterval(Number(e.target.value))}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={handleIntervalSave}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    OK
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Actuellement: {refreshInterval / 1000}s
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
});

SettingsPanel.displayName = 'SettingsPanel';
