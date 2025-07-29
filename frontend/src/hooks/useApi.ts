import { useState, useEffect, useCallback, useRef } from 'react';
import { apiService } from '../services/apiService';
import type { Ticket } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  silentRefetch: () => Promise<void>;
}

// Hook générique pour les appels API avec optimisation anti-clignotement
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: unknown[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousDataRef = useRef<string | null>(null);

  const fetchData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading && !data) {
        setLoading(true);
      }
      setError(null);
      const result = await apiCall();
      
      // Comparaison des données pour éviter les re-rendus inutiles
      const resultString = JSON.stringify(result);
      if (resultString !== previousDataRef.current) {
        setData(result);
        previousDataRef.current = resultString;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      if (showLoading || !data) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, apiCall]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
    silentRefetch: () => fetchData(false),
  };
}

// Hook pour les tickets en attente
export function useWaitingTickets() {
  return useApi(() => apiService.getWaitingTickets());
}

// Hook pour les tickets appelés
export function useCalledTickets() {
  return useApi(() => apiService.getCalledTickets());
}

// Hook pour les tickets servis
export function useServedTickets() {
  return useApi(() => apiService.getServedTickets());
}

// Hook pour les statistiques de la queue
export function useQueueStats() {
  return useApi(() => apiService.getQueueStats());
}

// Hook pour les actions de tickets
export function useTicketActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTicket = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.createTicket();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du ticket');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const callTicket = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.callTicket();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'appel du ticket');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const serveTicket = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.serveTicket();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du service du ticket');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createTicket,
    callTicket,
    serveTicket,
    loading,
    error,
  };
}

// Hook pour les actions de queue
export function useQueueActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enqueueTicket = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.enqueueTicket();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout à la queue');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const dequeueTicket = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.dequeueTicket();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du retrait de la queue');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const peekQueue = useCallback(async (): Promise<Ticket | null> => {
    try {
      setLoading(true);
      setError(null);
      const ticket = await apiService.peekQueue();
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la consultation de la queue');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    enqueueTicket,
    dequeueTicket,
    peekQueue,
    loading,
    error,
  };
}

// Hook pour la gestion de l'actualisation automatique optimisée avec intervalle configurable
export function useAutoRefresh(
  refreshFunctions: (() => Promise<void>)[], 
  initialInterval: number = 10000
) {
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [interval, setInterval] = useState(initialInterval);

  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const intervalId = window.setInterval(async () => {
      // Exécute tous les refresh en parallèle sans provoquer de clignotements
      await Promise.all(refreshFunctions.map(fn => fn().catch(() => {})));
    }, interval);
    
    return () => window.clearInterval(intervalId);
  }, [isAutoRefreshEnabled, refreshFunctions, interval]);

  return {
    isAutoRefreshEnabled,
    interval,
    setInterval,
    toggleAutoRefresh: () => setIsAutoRefreshEnabled(prev => !prev),
  };
}
