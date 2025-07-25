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
  badgeClass: string;
}> = {
  WAITING: {
    label: 'En attente',
    icon: Clock,
    className: 'text-yellow-600',
    bgClassName: 'bg-yellow-50 border-yellow-200',
    badgeClass: 'badge-waiting',
  },
  CALLED: {
    label: 'Appelé',
    icon: Phone,
    className: 'text-blue-600',
    bgClassName: 'bg-blue-50 border-blue-200',
    badgeClass: 'badge-called',
  },
  SERVED: {
    label: 'Servi',
    icon: CheckCircle,
    className: 'text-green-600',
    bgClassName: 'bg-green-50 border-green-200',
    badgeClass: 'badge-served',
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

export function TicketCard({ ticket, onCall, onServe, showActions = false }: TicketCardProps) {
  const config = statusConfig[ticket.status];
  const IconComponent = config.icon;

  return (
    <div className={`card-interactive p-4 ${config.bgClassName}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconComponent size={20} className={config.className} />
          <span className={`font-semibold text-lg ${config.className}`}>
            Ticket #{ticket.ticketNumber}
          </span>
        </div>
        <span className={config.badgeClass}>
          {config.label}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Créé :</span> {formatDate(ticket.creationDate)}
        </div>
        {ticket.calledDate && (
          <div>
            <span className="font-medium">Appelé :</span> {formatDate(ticket.calledDate)}
          </div>
        )}
        {ticket.servedDate && (
          <div>
            <span className="font-medium">Servi :</span> {formatDate(ticket.servedDate)}
          </div>
        )}
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2">
          {ticket.status === 'WAITING' && onCall && (
            <button
              onClick={() => onCall(ticket.ticketNumber)}
              className="btn-primary flex-1 text-sm"
            >
              📞 Appeler
            </button>
          )}
          {ticket.status === 'CALLED' && onServe && (
            <button
              onClick={() => onServe(ticket.ticketNumber)}
              className="btn-success flex-1 text-sm"
            >
              ✅ Servir
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface TicketListProps {
  tickets: Ticket[];
  title: string;
  emptyMessage?: string;
  onCall?: (ticketNumber: number) => void;
  onServe?: (ticketNumber: number) => void;
  showActions?: boolean;
}

export function TicketList({ 
  tickets, 
  title, 
  emptyMessage = 'Aucun ticket', 
  onCall, 
  onServe, 
  showActions = false 
}: TicketListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        {title}
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          {tickets.length}
        </span>
      </h3>
      
      {tickets.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketNumber}
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
}
