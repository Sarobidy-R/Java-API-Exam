import React from 'react';
import { Users, Clock, Phone, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';
import type { QueueStats } from '../types/api';

interface QueueStatsProps {
  stats: QueueStats | null;
  loading?: boolean;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  trend?: number;
}

// Composant optimisé avec React.memo
const StatCard = React.memo<StatCardProps>(({ title, value, icon: IconComponent, variant, trend }) => {
  const variantClasses = {
    primary: 'card-primary',
    success: 'card-success', 
    warning: 'card-warning',
    danger: 'card-danger',
    info: 'card'
  };

  const iconColors = {
    primary: 'text-primary-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600', 
    danger: 'text-red-600',
    info: 'text-gray-600'
  };

  const valueColors = {
    primary: 'text-primary-700',
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    danger: 'text-red-700', 
    info: 'text-gray-700'
  };

  return (
    <div className={`${variantClasses[variant]} p-6 card-interactive`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${valueColors[variant]}`}>{value}</p>
            {trend !== undefined && (
              <span className={`text-sm font-medium flex items-center gap-1 ${
                trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {trend > 0 && <TrendingUp className="w-3 h-3" />}
                {trend !== 0 && `${trend > 0 ? '+' : ''}${trend}%`}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-2xl bg-white/50 ${iconColors[variant]}`}>
          <IconComponent size={28} />
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export const QueueStatsCard = React.memo<QueueStatsProps>(({ stats, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="section-header">
          <h2 className="section-title">
            <BarChart3 className="w-6 h-6" />
            Statistiques de la File d'Attente
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-6">
              <div className="skeleton h-4 w-3/4 mb-3"></div>
              <div className="skeleton h-8 w-1/2 mb-2"></div>
              <div className="skeleton h-3 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="section-header">
          <h2 className="section-title">
            <BarChart3 className="w-6 h-6" />
            Statistiques de la File d'Attente
          </h2>
        </div>
        <div className="card p-8 text-center">
          <div className="text-gray-400 mb-2">
            <BarChart3 className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600">Impossible de charger les statistiques</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="section-header">
        <h2 className="section-title gradient-text">
          <div className="p-2 bg-primary-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-primary-600" />
          </div>
          Statistiques de la File d'Attente
        </h2>
        <div className="text-sm text-gray-500">
          Vue d'ensemble en temps réel
        </div>
      </div>
      
      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total des Tickets"
          value={stats.totalTickets}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="En Attente"
          value={stats.waitingTickets}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Appelés"
          value={stats.calledTickets}
          icon={Phone}
          variant="info"
        />
        <StatCard
          title="Servis"
          value={stats.servedTickets}
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Stats secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Taille de la File"
          value={stats.queueSize}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="État de la File"
          value={stats.isEmpty ? 'Vide' : 'Active'}
          icon={BarChart3}
          variant={stats.isEmpty ? 'info' : 'success'}
        />
      </div>

      {/* Barre de progression si des tickets sont en cours */}
      {stats.totalTickets > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Progression du Service</h3>
            <span className="text-sm text-gray-600">
              {Math.round((stats.servedTickets / stats.totalTickets) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(stats.servedTickets / stats.totalTickets) * 100}%`,
                animation: 'slideUp 1s ease-out'
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0</span>
            <span>{stats.totalTickets} tickets</span>
          </div>
        </div>
      )}
    </div>
  );
});

QueueStatsCard.displayName = 'QueueStatsCard';
