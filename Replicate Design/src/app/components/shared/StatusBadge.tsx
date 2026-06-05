import { Badge } from '../ui/badge';
import type { Status } from '@/lib/types/common';

const statusConfig = {
  pending: { label: 'Pendente', variant: 'secondary' as const, className: 'bg-[#F59E0B] text-white' },
  approved: { label: 'Aprovado', variant: 'default' as const, className: 'bg-[#16A34A] text-white' },
  rejected: { label: 'Rejeitado', variant: 'destructive' as const, className: 'bg-[#DC2626] text-white' },
  in_progress: { label: 'Em Andamento', variant: 'secondary' as const, className: 'bg-[#026874] text-white' },
  inactive: { label: 'Inativo', variant: 'secondary' as const, className: 'bg-[#6B7280] text-white' },
  active: { label: 'Ativo', variant: 'default' as const, className: 'bg-primary text-white' },
  ativo: { label: 'Ativo', variant: 'default' as const, className: 'bg-primary text-white' },
  inativo: { label: 'Inativo', variant: 'secondary' as const, className: 'bg-[#6B7280] text-white' },
  afastado: { label: 'Afastado', variant: 'secondary' as const, className: 'bg-[#F59E0B] text-white' },
  plantio: { label: 'Plantio', variant: 'secondary' as const, className: 'bg-[#75A38C] text-white' },
  vegetativo: { label: 'Vegetativo', variant: 'secondary' as const, className: 'bg-[#026874] text-white' },
  floracao: { label: 'Floração', variant: 'secondary' as const, className: 'bg-[#4C1041] text-white' },
  colheita: { label: 'Colheita', variant: 'default' as const, className: 'bg-primary text-white' },
  concluido: { label: 'Concluído', variant: 'default' as const, className: 'bg-[#16A34A] text-white' },
  em_producao: { label: 'Em Produção', variant: 'secondary' as const, className: 'bg-[#026874] text-white' },
  disponivel: { label: 'Disponível', variant: 'default' as const, className: 'bg-[#16A34A] text-white' },
  estoque_critico: { label: 'Estoque Crítico', variant: 'secondary' as const, className: 'bg-[#F59E0B] text-white' },
  esgotado: { label: 'Esgotado', variant: 'destructive' as const, className: 'bg-[#DC2626] text-white' },
  dispensado: { label: 'Dispensado', variant: 'secondary' as const, className: 'bg-[#75A38C] text-white' },
  vencido: { label: 'Vencido', variant: 'destructive' as const, className: 'bg-[#DC2626] text-white' },
  agendado: { label: 'Agendado', variant: 'secondary' as const, className: 'bg-[#026874] text-white' },
  realizado: { label: 'Realizado', variant: 'default' as const, className: 'bg-[#16A34A] text-white' },
  cancelado: { label: 'Cancelado', variant: 'secondary' as const, className: 'bg-[#6B7280] text-white' },
};

interface StatusBadgeProps {
  status: Status | string;
  customLabel?: string;
}

export function StatusBadge({ status, customLabel }: StatusBadgeProps) {
  const config = statusConfig[status as Status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} className={config.className}>
      {customLabel || config.label}
    </Badge>
  );
}
