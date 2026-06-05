import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { getLotes } from '@/lib/mock-data/lotes';
import type { Lote } from '@/lib/types/cultivo';
import { Sprout, Plus, Eye } from 'lucide-react';

const statusLabels = {
  plantio: 'Plantio',
  vegetativo: 'Vegetativo',
  floracao: 'Floração',
  colheita: 'Colheita',
  concluido: 'Concluído',
};

export function LotesListPage() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getLotes().then((result) => {
      setLotes(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="table" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lotes de Cultivo"
        breadcrumbs={[{ label: 'Cultivo' }]}
        actions={
          <Button onClick={() => navigate('/cultivo/novo')}>
            <Plus className="size-4 mr-2" />
            Novo Lote
          </Button>
        }
      />

      {lotes.length === 0 ? (
        <EmptyState
          icon={Sprout}
          title="Nenhum lote cadastrado"
          description="Comece criando seu primeiro lote de cultivo de cannabis medicinal"
          actionLabel="Novo Lote"
          onAction={() => navigate('/cultivo/novo')}
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Espécie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Plantio</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lotes.map((lote) => (
                <TableRow
                  key={lote.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/cultivo/${lote.id}`)}
                >
                  <TableCell className="font-medium">{lote.id}</TableCell>
                  <TableCell>{lote.especie}</TableCell>
                  <TableCell>
                    <StatusBadge status={lote.status} customLabel={statusLabels[lote.status]} />
                  </TableCell>
                  <TableCell>{new Date(lote.dataPlantio).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{lote.quantidadePlantas} plantas</TableCell>
                  <TableCell>{lote.localCultivo}</TableCell>
                  <TableCell>{lote.responsavel.nome}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/cultivo/${lote.id}`);
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
