import React from 'react';
import { Clock, Phone, CheckCircle } from 'lucide-react';
import type { Ticket, TicketStatus } from '../types/api';

interface TicketCardProps {
  ticket: Ticket;
  onCall?: (ticketNumber: number) => void;
  onServe?: (ticketNumber: number) => void;
  showActions?: boolean;
}

const statusConfig: Record<TicketStatus, {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  className: string;
  bgClassName: string;
}> = {
  WAITING: {
    label: 'En attente',
    icon: Clock,
    className: 'text-yellow-600',
    bgClassName: 'bg-yellow-50 border-yellow-200',
  },
  CALLED: {
    label: 'Appelé',
    icon: Phone,
    className: 'text-blue-600',
    bgClassName: 'bg-blue-50 border-blue-200',
  },
  SERVED: {
    label: 'Servi',
    icon: CheckCircle,
    className: 'text-green-600',
    bgClassName: 'bg-green-50 border-green-200',
  },
};

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Composant optimisé avec React.memo pour éviter les re-rendus inutiles
export const TicketCard = React.memo<TicketCardProps>(({ ticket, onCall, onServe, showActions = false }) => {
  const config = statusConfig[ticket.status];
  const IconComponent = config.icon;

  return (
    <div className={`p-4 rounded-lg border-2 ${config.bgClassName} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconComponent size={20} className={config.className} />
          <span className={`font-semibold text-lg ${config.className}`}>
            Ticket #{ticket.ticketNumber}
          </span>
        </div>
        <span className={`text-sm px-2 py-1 rounded-full ${config.className} ${config.bgClassName} border`}>
          {config.label}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <strong>Créé:</strong> {formatDate(ticket.creationDate)}
        </div>
        {ticket.calledDate && (
          <div className="text-sm text-gray-600">
            <strong>Appelé:</strong> {formatDate(ticket.calledDate)}
          </div>
        )}
        {ticket.servedDate && (
          <div className="text-sm text-gray-600">
            <strong>Servi:</strong> {formatDate(ticket.servedDate)}
          </div>
        )}
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2">
          {ticket.status === 'WAITING' && onCall && (
            <button
              onClick={() => onCall(ticket.ticketNumber)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              <Phone size={16} />
              Appeler
            </button>
          )}
          {ticket.status === 'CALLED' && onServe && (
            <button
              onClick={() => onServe(ticket.ticketNumber)}
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              <CheckCircle size={16} />
              Servir
            </button>
          )}
        </div>
      )}
    </div>
  );
});

TicketCard.displayName = 'TicketCard';

interface TicketListProps {
  tickets: Ticket[];
  title: string;
  loading?: boolean;
  error?: string | null;
  onCall?: (ticketNumber: number) => void;
  onServe?: (ticketNumber: number) => void;
  showActions?: boolean;
  emptyMessage?: string;
}

// Liste optimisée avec React.memo
export const TicketList = React.memo<TicketListProps>(({ 
  tickets, 
  title, 
  loading, 
  error, 
  onCall, 
  onServe, 
  showActions = false, 
  emptyMessage = "Aucun ticket"
}) => {
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">❌ Erreur</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
          {loading ? '...' : tickets.length}
        </span>
      </div>
      
      {loading && tickets.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {tickets.map((ticket) => (
            <TicketCard
              key={`${ticket.ticketNumber}-${ticket.status}`}
              ticket={ticket}
              onCall={onCall}
              onServe={onServe}
              showActions={showActions}
            />
          ))}
        </div>
      )}
    </div>
  );
});

TicketList.displayName = 'TicketList';
