import { useCallback, useMemo } from 'react';
import { RefreshCw, Server, AlertCircle, Users, Phone, CheckCircle, TrendingUp } from 'lucide-react';
import { ControlPanel } from './components/ControlPanel';
import { ApiStatus } from './components/ApiStatus';
import {
  useWaitingTickets,
  useCalledTickets,
  useServedTickets,
  useQueueStats,
  useTicketActions,
  useAutoRefresh
} from './hooks/useApi';
import { QueueStatsCard } from './components/QueueStats';

function App() {

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
  }, [waitingTickets, calledTickets, servedTickets, queueStats]);

  // Auto-refresh automatique en arrière-plan (10 secondes)
  useAutoRefresh(refreshFunctions, 10000);

  // Gestion des actions sur les tickets
  const handleCallTicket = async () => {
    const ticket = await callTicket();
    if (ticket) {
      refreshAll();
    }
  };

  const handleServeTicket = async () => {
    const ticket = await serveTicket();
    if (ticket) {
      refreshAll();
    }
  };

  // Fonction pour formater les dates avec date ET heure
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Date non disponible';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      // Formatage complet avec date et heure
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'Erreur de date';
    }
  };

  // Fonction pour obtenir une propriété de ticket en mode sécurisé
  const getTicketProperty = (ticket: any, property: string, fallback: any = null) => {
    return ticket && typeof ticket === 'object' && ticket.hasOwnProperty(property)
      ? ticket[property]
      : fallback;
  };

  const isLoading = waitingTickets.loading || calledTickets.loading || servedTickets.loading || queueStats.loading;
  const hasError = waitingTickets.error || calledTickets.error || servedTickets.error || queueStats.error || actionError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-secondary-100">
      {/* Header compact et moderne */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-secondary-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo et titre */}
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-glow">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  File d'Attente
                </h1>
                <p className="text-xs text-secondary-500">Système de gestion</p>
              </div>
            </div>

            {/* Status et contrôles - Réorganisé */}
            <div className="flex items-center gap-3">
              {/* Status API */}
              <ApiStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Messages d'erreur optimisés */}
      {hasError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-danger-50 border border-danger-200 rounded-xl p-4 animate-slide-down">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-danger-800 text-sm">Erreurs détectées</h3>
                <div className="mt-1 text-xs text-danger-600 space-y-1">
                  {waitingTickets.error && <div>• En attente: {waitingTickets.error}</div>}
                  {calledTickets.error && <div>• Appelés: {calledTickets.error}</div>}
                  {servedTickets.error && <div>• Servis: {servedTickets.error}</div>}
                  {queueStats.error && <div>• Stats: {queueStats.error}</div>}
                  {actionError && <div>• Action: {actionError}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard avec métriques rapides */}
        <div className="mb-6 animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Carte Total */}
            <div className="bg-white rounded-xl p-4 shadow-soft border border-secondary-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-secondary-600 uppercase tracking-wide">Total</p>
                  <p className="text-2xl font-bold text-secondary-900">{queueStats.data?.totalTickets || 0}</p>
                </div>
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-secondary-600" />
                </div>
              </div>
            </div>

            {/* Carte En Attente */}
            <div className="bg-white rounded-xl p-4 shadow-soft border border-warning-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-warning-600 uppercase tracking-wide">En Attente</p>
                  <p className="text-2xl font-bold text-warning-800">{waitingTickets.data?.length || 0}</p>
                </div>
                <div className="p-2 bg-warning-100 rounded-lg">
                  <Users className="w-5 h-5 text-warning-600" />
                </div>
              </div>
            </div>

            {/* Carte Appelés */}
            <div className="bg-white rounded-xl p-4 shadow-soft border border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-primary-600 uppercase tracking-wide">Appelés</p>
                  <p className="text-2xl font-bold text-primary-800">{calledTickets.data?.length || 0}</p>
                </div>
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </div>

            {/* Carte Servis */}
            <div className="bg-white rounded-xl p-4 shadow-soft border border-success-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-success-600 uppercase tracking-wide">Servis</p>
                  <p className="text-2xl font-bold text-success-800">{servedTickets.data?.length || 0}</p>
                </div>
                <div className="p-2 bg-success-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Panneau de contrôle intégré */}
          <div className="bg-white rounded-xl shadow-soft border border-secondary-100 p-4">
            <ControlPanel onRefresh={refreshAll} loading={isLoading} />
          </div>
        </div>

        {/* Layout principal en grille responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1: File d'Attente avec bouton Appeler */}
          <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-xl shadow-soft border border-secondary-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning-100 rounded-lg">
                    <Users className="w-5 h-5 text-warning-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-secondary-900">File d'Attente</h2>
                    <p className="text-xs text-secondary-500">
                      {waitingTickets.data?.length || 0} en attente
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCallTicket()}
                    disabled={actionLoading || !waitingTickets.data?.length}
                    className="px-3 py-1 bg-warning-600 hover:bg-warning-700 disabled:bg-warning-400 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Appeler
                  </button>
                  <div className="w-3 h-3 bg-warning-400 rounded-full animate-pulse-soft"></div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {waitingTickets.data?.length ? (
                  waitingTickets.data.map((ticket) => (
                    <div key={getTicketProperty(ticket, 'ticketNumber', Math.random())} className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-warning-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {getTicketProperty(ticket, 'ticketNumber', '?')}
                          </div>
                          <div>
                            <p className="font-medium text-warning-800">Ticket #{getTicketProperty(ticket, 'ticketNumber', '?')}</p>
                            <p className="text-xs text-warning-600">
                              {formatDate(getTicketProperty(ticket, 'creationDate'))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondary-500">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Aucun ticket en attente</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne 2: Tickets Appelés avec bouton Servir */}
          <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-xl shadow-soft border border-secondary-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-secondary-900">Appelés</h2>
                    <p className="text-xs text-secondary-500">
                      {calledTickets.data?.length || 0} appelé{(calledTickets.data?.length || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleServeTicket()}
                    disabled={actionLoading || !calledTickets.data?.length}
                    className="px-3 py-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Servir
                  </button>
                  <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse-soft"></div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {calledTickets.data?.length ? (
                  calledTickets.data.map((ticket) => (
                    <div key={getTicketProperty(ticket, 'ticketNumber', Math.random())} className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {getTicketProperty(ticket, 'ticketNumber', '?')}
                          </div>
                          <div>
                            <p className="font-medium text-primary-800">Ticket #{getTicketProperty(ticket, 'ticketNumber', '?')}</p>
                            <p className="text-xs text-primary-600">
                              {formatDate(getTicketProperty(ticket, 'calledDate'))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondary-500">
                    <Phone className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Aucun ticket appelé</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne 3: Tickets Servis (lecture seule) */}
          <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white rounded-xl shadow-soft border border-secondary-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-secondary-900">Servis</h2>
                    <p className="text-xs text-secondary-500">
                      {servedTickets.data?.length || 0} servi{(servedTickets.data?.length || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-success-400 rounded-full"></div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {servedTickets.data?.length ? (
                  servedTickets.data.map((ticket) => (
                    <div key={getTicketProperty(ticket, 'ticketNumber', Math.random())} className="p-3 bg-success-50 border border-success-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-success-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {getTicketProperty(ticket, 'ticketNumber', '?')}
                          </div>
                          <div>
                            <p className="font-medium text-success-800">Ticket #{getTicketProperty(ticket, 'ticketNumber', '?')}</p>
                            <p className="text-xs text-success-600">
                              {formatDate(getTicketProperty(ticket, 'servedDate'))}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-success-600 bg-success-100 px-2 py-1 rounded-full">
                          Servi
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondary-500">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Aucun ticket servi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques détaillées (optionnel, masqué sur petit écran) */}
        <div className="hidden xl:block mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <QueueStatsCard stats={queueStats.data} loading={queueStats.loading} />
        </div>
      </main>

      {/* Indicateur de chargement flottant optimisé */}
      {(isLoading || actionLoading) && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce-in">
          <div className="bg-white/90 backdrop-blur-sm border border-secondary-200 px-4 py-2 rounded-full shadow-medium">
            <div className="flex items-center gap-2 text-primary-700">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Mise à jour...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;