import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
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

  const isLoading = (action: string) => actionLoading === action;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-secondary-900">Panneau de Contrôle</h2>
            <p className="text-xs text-secondary-500">Gestion des tickets</p>
          </div>
        </div>

        {/* Bouton Créer un Ticket */}
        <button
          onClick={handleCreateTicket}
          disabled={isLoading('Création de ticket') || loading}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          {isLoading('Création de ticket') ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isLoading('Création de ticket') ? 'Création...' : 'Créer un Ticket'}
        </button>
      </div>

      {/* Messages avec design professionnel */}
      {message && (
        <div 
          className={`p-3 rounded-lg border animate-slide-down ${
            message.type === 'success' 
              ? 'bg-success-50 text-success-800 border-success-200' 
              : message.type === 'error' 
              ? 'bg-danger-50 text-danger-800 border-danger-200' 
              : 'bg-primary-50 text-primary-800 border-primary-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              message.type === 'success' ? 'bg-success-500' :
              message.type === 'error' ? 'bg-danger-500' : 'bg-primary-500'
            }`}></div>
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
