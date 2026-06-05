import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { getProducoes } from '@/lib/mock-data/producoes';
import type { Producao } from '@/lib/types/producao';
import { Droplets, Plus, Eye } from 'lucide-react';

const statusLabels = {
  em_producao: 'Em Produção',
  disponivel: 'Disponível',
  estoque_critico: 'Estoque Crítico',
  esgotado: 'Esgotado',
};

export function ProducoesListPage() {
  const [producoes, setProducoes] = useState<Producao[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducoes().then((result) => {
      setProducoes(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="table" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Produções de Óleo"
        breadcrumbs={[{ label: 'Produção' }]}
        actions={
          <Button onClick={() => navigate('/producao/novo')}>
            <Plus className="size-4 mr-2" />
            Nova Produção
          </Button>
        }
      />

      {producoes.length === 0 ? (
        <EmptyState
          icon={Droplets}
          title="Nenhuma produção cadastrada"
          description="Comece criando sua primeira produção de óleo de cannabis medicinal"
          actionLabel="Nova Produção"
          onAction={() => navigate('/producao/novo')}
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Lote Origem</TableHead>
                <TableHead>Tipo de Óleo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Produção</TableHead>
                <TableHead>Volume (ml)</TableHead>
                <TableHead>Concentração</TableHead>
                <TableHead>Frascos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {producoes.map((producao) => (
                <TableRow
                  key={producao.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/producao/${producao.id}`)}
                >
                  <TableCell className="font-medium">{producao.id}</TableCell>
                  <TableCell>{producao.loteOrigem}</TableCell>
                  <TableCell>{producao.tipoOleo}</TableCell>
                  <TableCell>
                    <StatusBadge status={producao.status} customLabel={statusLabels[producao.status]} />
                  </TableCell>
                  <TableCell>{new Date(producao.dataProducao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{producao.volumeTotal} ml</TableCell>
                  <TableCell>{producao.concentracao}</TableCell>
                  <TableCell>{producao.frascos?.length || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/producao/${producao.id}`);
                      }}
                    >
                      <Eye className="size-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
