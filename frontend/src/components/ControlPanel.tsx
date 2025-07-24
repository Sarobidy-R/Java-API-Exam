import { useState } from 'react';
import { Plus, ArrowRight, ArrowLeft, Eye, RotateCcw } from 'lucide-react';
import { apiService } from '../services/apiService';

interface ControlPanelProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function ControlPanel({ onRefresh, loading = false }: ControlPanelProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAction = async (action: string, apiCall: () => Promise<unknown>) => {
    try {
      setActionLoading(action);
      const result = await apiCall();
      showMessage(`${action} réussi`, 'success');
      console.log(`${action} result:`, result);
      onRefresh();
    } catch (error) {
      showMessage(`Erreur: ${action}`, 'error');
      console.error(`${action} error:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateTicket = () => {
    handleAction('Création de ticket', () => apiService.createTicket());
  };

  const handleEnqueueTicket = () => {
    handleAction('Ajout à la file', () => apiService.enqueueTicket());
  };

  const handleDequeueTicket = () => {
    handleAction('Retrait de la file', () => apiService.dequeueTicket());
  };

  const handlePeekQueue = async () => {
    try {
      setActionLoading('Consultation du prochain');
      const ticket = await apiService.peekQueue();
      
      if (ticket) {
        showMessage(`Prochain ticket: #${ticket.ticketNumber} (${ticket.status})`, 'info');
        console.log('Peek result:', ticket);
      } else {
        showMessage('Aucun ticket en file d\'attente', 'info');
      }
      
      onRefresh();
    } catch (error) {
      showMessage('Erreur: Consultation du prochain', 'error');
      console.error('Peek error:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const isLoading = (action: string) => actionLoading === action;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Panneau de contrôle</h2>


      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleCreateTicket}
          disabled={isLoading('Création de ticket') || loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} />
          {isLoading('Création de ticket') ? 'Création...' : 'Créer un ticket'}
        </button>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RotateCcw size={20} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Actualisation...' : 'Actualiser'}
        </button>
      </div>

      {/* Actions de la file */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Actions de la file d'attente</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={handleEnqueueTicket}
            disabled={isLoading('Ajout à la file') || loading}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <ArrowRight size={16} />
            {isLoading('Ajout à la file') ? 'Ajout...' : 'Enqueue'}
          </button>

          <button
            onClick={handleDequeueTicket}
            disabled={isLoading('Retrait de la file') || loading}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {isLoading('Retrait de la file') ? 'Retrait...' : 'Dequeue'}
          </button>

          <button
            onClick={handlePeekQueue}
            disabled={isLoading('Consultation du prochain') || loading}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <Eye size={16} />
            {isLoading('Consultation du prochain') ? 'Consultation...' : 'Peek'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
          message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
          'bg-blue-100 text-blue-700 border border-blue-300'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
