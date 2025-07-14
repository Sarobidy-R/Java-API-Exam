// Types pour l'API de gestion de tickets

export type TicketStatus = 'WAITING' | 'CALLED' | 'SERVED';

export interface Ticket {
  ticketNumber: number;
  status: TicketStatus;
  creationDate: string;
  calledDate: string | null;
  servedDate: string | null;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version?: string;
  uptime?: string;
}

export interface ApiError {
  error: string;
  message: string;
  timestamp?: string;
  path?: string;
}

// Types pour les réponses API
export type ApiResponse<T> = {
  data: T;
  success: true;
} | {
  error: string;
  success: false;
};

// Configuration de l'API
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Types pour les statistiques
export interface QueueStats {
  totalTickets: number;
  waitingTickets: number;
  calledTickets: number;
  servedTickets: number;
  queueSize: number;
  isEmpty: boolean;
}
