import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { Ticket, HealthCheckResponse, ApiConfig, QueueStats } from '../types/api';

class ApiService {
  private api: AxiosInstance;
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.api = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour les réponses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      }
    );
  }

  // Endpoint de base
  async getWelcome(): Promise<string> {
    const response: AxiosResponse<string> = await this.api.get('/', {
      headers: { 'Content-Type': 'text/plain' }
    });
    return response.data;
  }

  // Gestion des tickets
  async createTicket(): Promise<Ticket> {
    const response: AxiosResponse<Ticket> = await this.api.post('/api/tickets');
    return response.data;
  }

  async getWaitingTickets(): Promise<Ticket[]> {
    const response: AxiosResponse<Ticket[]> = await this.api.get('/api/tickets');
    return response.data;
  }

  async callTicket(ticketNumber: number): Promise<string> {
    const response: AxiosResponse<string> = await this.api.post(
      '/api/tickets/call',
      ticketNumber.toString(),
      {
        headers: { 'Content-Type': 'text/plain' }
      }
    );
    return response.data;
  }

  async serveTicket(ticketNumber: number): Promise<string> {
    const response: AxiosResponse<string> = await this.api.post(
      '/api/tickets/serve',
      ticketNumber.toString(),
      {
        headers: { 'Content-Type': 'text/plain' }
      }
    );
    return response.data;
  }

  async getCalledTickets(): Promise<Ticket[]> {
    const response: AxiosResponse<Ticket[]> = await this.api.get('/api/tickets/called');
    return response.data;
  }

  async getServedTickets(): Promise<Ticket[]> {
    const response: AxiosResponse<Ticket[]> = await this.api.get('/api/tickets/served');
    return response.data;
  }

  // Gestion de la file d'attente
  async enqueueTicket(): Promise<Ticket> {
    const response: AxiosResponse<Ticket> = await this.api.post('/api/queue/enqueue');
    return response.data;
  }

  async dequeueTicket(): Promise<Ticket> {
    const response: AxiosResponse<Ticket> = await this.api.post('/api/queue/dequeue');
    return response.data;
  }

  async peekQueue(): Promise<Ticket> {
    const response: AxiosResponse<Ticket> = await this.api.get('/api/queue/peek');
    return response.data;
  }

  async isQueueEmpty(): Promise<boolean> {
    const response: AxiosResponse<string> = await this.api.get('/api/queue/isEmpty', {
      headers: { 'Content-Type': 'text/plain' }
    });
    // Debug pour voir ce que retourne l'API
    console.log('isEmpty API response:', response.data, typeof response.data);
    // Conversion plus robuste
    return String(response.data).toLowerCase() === 'true';
  }

  async getQueueSize(): Promise<number> {
    const response: AxiosResponse<string> = await this.api.get('/api/queue/size', {
      headers: { 'Content-Type': 'text/plain' }
    });
    return parseInt(response.data, 10);
  }

  // Health check
  async getHealth(): Promise<HealthCheckResponse> {
    const response: AxiosResponse<HealthCheckResponse> = await this.api.get('/api/health');
    return response.data;
  }

  // Méthode utilitaire pour obtenir les statistiques complètes
  async getQueueStats(): Promise<QueueStats> {
    const [waiting, called, served, size, isEmpty] = await Promise.all([
      this.getWaitingTickets(),
      this.getCalledTickets(),
      this.getServedTickets(),
      this.getQueueSize(),
      this.isQueueEmpty()
    ]);

    return {
      totalTickets: waiting.length + called.length + served.length,
      waitingTickets: waiting.length,
      calledTickets: called.length,
      servedTickets: served.length,
      queueSize: size,
      isEmpty
    };
  }

  // Changer l'URL de base (pour basculer entre dev et prod)
  updateBaseUrl(newBaseUrl: string): void {
    this.config.baseUrl = newBaseUrl;
    this.api.defaults.baseURL = newBaseUrl;
  }
}

// Configuration par défaut - API déployée sur Render
const defaultConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'https://java-api-exam-latest.onrender.com',
  timeout: 15000, // 15 secondes pour Render (peut être plus lent au démarrage)
};

// Instance exportée
export const apiService = new ApiService(defaultConfig);

export default ApiService;
