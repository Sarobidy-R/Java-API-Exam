import React from 'react';
import { Users, Clock, Phone, CheckCircle, BarChart3 } from 'lucide-react';
import type { QueueStats } from '../types/api';

interface QueueStatsProps {
  stats: QueueStats | null;
  loading?: boolean;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
  bgClassName?: string;
}

// Composant optimisé avec React.memo
const StatCard = React.memo<StatCardProps>(({ title, value, icon: IconComponent, className = 'text-blue-600', bgClassName = 'bg-blue-50 border-blue-200' }) => {
  return (
    <div className={`card-interactive p-4 ${bgClassName}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${className}`}>{value}</p>
        </div>
        <IconComponent size={24} className={className} />
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export const QueueStatsCard = React.memo<QueueStatsProps>(({ stats, loading = false }) => {
  if (loading) {
    return (
      <div className="card-base p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 size={24} className="text-gray-600" />
          Statistiques de la file d'attente
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-base p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card-base p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 size={24} className="text-gray-600" />
          Statistiques de la file d'attente
        </h2>
        <div className="text-center py-8 text-gray-500">
          Impossible de charger les statistiques
        </div>
      </div>
    );
  }

  return (
    <div className="card-base p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 size={24} className="text-gray-600" />
        Statistiques de la file d'attente
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <StatCard
          title="Total des tickets"
          value={stats.totalTickets}
          icon={Users}
          className="text-purple-600"
          bgClassName="bg-purple-50 border-purple-200"
        />
        <StatCard
          title="En attente"
          value={stats.waitingTickets}
          icon={Clock}
          className="text-yellow-600"
          bgClassName="bg-yellow-50 border-yellow-200"
        />
        <StatCard
          title="Appelés"
          value={stats.calledTickets}
          icon={Phone}
          className="text-blue-600"
          bgClassName="bg-blue-50 border-blue-200"
        />
        <StatCard
          title="Servis"
          value={stats.servedTickets}
          icon={CheckCircle}
          className="text-green-600"
          bgClassName="bg-green-50 border-green-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Taille de la file"
          value={stats.queueSize}
          icon={Users}
          className="text-indigo-600"
          bgClassName="bg-indigo-50 border-indigo-200"
        />
        <StatCard
          title="État de la file"
          value={stats.isEmpty ? 'Vide' : 'Non vide'}
          icon={BarChart3}
          className={stats.isEmpty ? 'text-gray-600' : 'text-orange-600'}
          bgClassName={stats.isEmpty ? 'bg-gray-50 border-gray-200' : 'bg-orange-50 border-orange-200'}
        />
      </div>
    </div>
  );
});

QueueStatsCard.displayName = 'QueueStatsCard';
