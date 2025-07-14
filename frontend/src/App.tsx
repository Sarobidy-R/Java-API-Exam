import { useState, useCallback, useMemo } from 'react';
import { RefreshCw, Server } from 'lucide-react';
import { TicketList } from './components/OptimizedTicketCard';
import { QueueStatsCard } from './components/QueueStats';
import { ControlPanel } from './components/ControlPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { ApiStatus } from './components/ApiStatus';
import { RenderApiNotification } from './components/RenderApiNotification';
import { ApiEnvironmentDisplay } from './components/ApiEnvironmentDisplay';
import { 
  useWaitingTickets, 
  useCalledTickets, 
  useServedTickets, 
  useQueueStats,
  useTicketActions,
  useAutoRefresh 
} from './hooks/useApi';

function App() {
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  // Hooks pour les données
  const waitingTickets = useWaitingTickets();
  const calledTickets = useCalledTickets();
  const servedTickets = useServedTickets();
  const queueStats = useQueueStats();
  
  // Hooks pour les actions
  const { callTicket, serveTicket, loading: actionLoading, error: actionError } = useTicketActions();

  // Fonctions de rafraîchissement silencieux optimisées
  const refreshFunctions = useMemo(() => [
    waitingTickets.silentRefetch,
    calledTickets.silentRefetch,
    servedTickets.silentRefetch,
    queueStats.silentRefetch,
  ], [waitingTickets.silentRefetch, calledTickets.silentRefetch, servedTickets.silentRefetch, queueStats.silentRefetch]);

  // Fonction de rafraîchissement manuel complet
  const refreshAll = useCallback(() => {
    waitingTickets.refetch();
    calledTickets.refetch();
    servedTickets.refetch();
    queueStats.refetch();
    setLastRefresh(new Date());
  }, [waitingTickets, calledTickets, servedTickets, queueStats]);

  // Auto-refresh optimisé pour éviter les clignotements (intervalle initial 10 secondes)
  const { isAutoRefreshEnabled, toggleAutoRefresh, interval, setInterval } = useAutoRefresh(refreshFunctions, 10000);

  // Gestion des actions sur les tickets
  const handleCallTicket = async (ticketNumber: number) => {
    const success = await callTicket(ticketNumber);
    if (success) {
      refreshAll();
    }
  };

  const handleServeTicket = async (ticketNumber: number) => {
    const success = await serveTicket(ticketNumber);
    if (success) {
      refreshAll();
    }
  };

  const isLoading = waitingTickets.loading || calledTickets.loading || servedTickets.loading || queueStats.loading;
  const hasError = waitingTickets.error || calledTickets.error || servedTickets.error || queueStats.error || actionError;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    🎫 Java API Exam - Frontend
                  </h1>
                  <ApiStatus />
                </div>
                <p className="text-sm text-gray-600">
                  Interface de test avec détection automatique d'environnement
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              {/* Configuration de l'API */}
              <ApiEnvironmentDisplay className="lg:min-w-[280px]" />
              
              <div className="flex items-center gap-3">
                <SettingsPanel
                  isAutoRefreshEnabled={isAutoRefreshEnabled}
                  onToggleAutoRefresh={toggleAutoRefresh}
                  refreshInterval={interval}
                  onIntervalChange={setInterval}
                />
                
                <button
                  onClick={refreshAll}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                  Actualiser
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Dernière mise à jour: {lastRefresh.toLocaleTimeString('fr-FR')}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages d'erreur globaux */}
        {hasError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <h3 className="font-medium mb-2">Erreurs détectées :</h3>
            <ul className="text-sm space-y-1">
              {waitingTickets.error && <li>• Tickets en attente: {waitingTickets.error}</li>}
              {calledTickets.error && <li>• Tickets appelés: {calledTickets.error}</li>}
              {servedTickets.error && <li>• Tickets servis: {servedTickets.error}</li>}
              {queueStats.error && <li>• Statistiques: {queueStats.error}</li>}
              {actionError && <li>• Action: {actionError}</li>}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Contrôles et Statistiques */}
          <div className="space-y-6">
            <ControlPanel onRefresh={refreshAll} loading={isLoading} />
            <QueueStatsCard stats={queueStats.data} loading={queueStats.loading} />
          </div>

          {/* Colonne centrale - Tickets en attente */}
          <div>
            <TicketList
              tickets={waitingTickets.data || []}
              title="🟡 Tickets en attente"
              emptyMessage="Aucun ticket en attente"
              onCall={handleCallTicket}
              showActions={true}
            />
          </div>

          {/* Colonne droite - Tickets appelés et servis */}
          <div className="space-y-6">
            <TicketList
              tickets={calledTickets.data || []}
              title="🔵 Tickets appelés"
              emptyMessage="Aucun ticket appelé"
              onServe={handleServeTicket}
              showActions={true}
            />
            
            <TicketList
              tickets={servedTickets.data || []}
              title="🟢 Tickets servis"
              emptyMessage="Aucun ticket servi"
            />
          </div>
        </div>

        {/* Indicateur de chargement global */}
        {(isLoading || actionLoading) && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            Chargement...
          </div>
        )}
      </main>

      {/* Notification API Render */}
      <RenderApiNotification />
    </div>
  );
}

export default App;
