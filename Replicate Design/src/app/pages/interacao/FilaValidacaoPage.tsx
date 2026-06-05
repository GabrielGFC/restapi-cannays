import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { getReceitas } from '@/lib/mock-data/receitas';
import type { Receita } from '@/lib/types/interacao';
import { Stethoscope, Eye, AlertTriangle, History } from 'lucide-react';

const statusLabels = {
  aguardando: 'Aguardando',
  em_analise: 'Em Análise',
  aprovada: 'Aprovada',
  ajuste_solicitado: 'Ajuste Solicitado',
  rejeitada: 'Rejeitada',
};

const severidadeColors = {
  baixa: 'bg-blue-100 text-blue-800',
  media: 'bg-amber-100 text-amber-800',
  alta: 'bg-red-100 text-red-800',
};

export function FilaValidacaoPage() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getReceitas().then((result) => {
      setReceitas(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="table" />;

  const receitasPendentes = receitas.filter(
    (r) => r.status === 'aguardando' || r.status === 'em_analise' || r.status === 'ajuste_solicitado'
  );

  const receitasComAlertas = receitas.filter((r) => r.alertas.length > 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fila de Validação"
        breadcrumbs={[{ label: 'Interação Médico-Farmacêutico' }]}
        actions={
          <Button variant="outline" onClick={() => navigate('/interacao/historico')}>
            <History className="size-4 mr-2" />
            Ver Histórico
          </Button>
        }
      />

      {/* Alertas */}
      {receitasComAlertas.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {receitasComAlertas.length} receita(s) com alertas clínicos que requerem atenção.
          </AlertDescription>
        </Alert>
      )}

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Aguardando Revisão</p>
            <p className="text-3xl font-bold">
              {receitas.filter((r) => r.status === 'aguardando').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Em Análise</p>
            <p className="text-3xl font-bold">
              {receitas.filter((r) => r.status === 'em_analise').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Ajustes Solicitados</p>
            <p className="text-3xl font-bold">
              {receitas.filter((r) => r.status === 'ajuste_solicitado').length}
            </p>
          </div>
        </Card>
      </div>

      {receitas.length === 0 ? (
        <EmptyState
          icon={Stethoscope}
          title="Nenhuma receita cadastrada"
          description="Aguardando receitas dos médicos para validação"
          actionLabel=""
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Emissão</TableHead>
                <TableHead>Alertas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receitas.map((receita) => (
                <TableRow
                  key={receita.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/interacao/${receita.id}`)}
                >
                  <TableCell className="font-medium">{receita.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{receita.paciente.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().getFullYear() -
                          new Date(receita.paciente.dataNascimento).getFullYear()}{' '}
                        anos
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{receita.medico.nome}</p>
                      <p className="text-sm text-muted-foreground">{receita.medico.crm}</p>
                    </div>
                  </TableCell>
                  <TableCell>{receita.prescricao.produto}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={receita.status}
                      customLabel={statusLabels[receita.status]}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(receita.dataEmissao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {receita.alertas.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {receita.alertas.map((alerta) => (
                          <Badge
                            key={alerta.id}
                            className={severidadeColors[alerta.severidade]}
                          >
                            {alerta.severidade}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/interacao/${receita.id}`);
                      }}
                    >
                      <Eye className="size-4 mr-2" />
                      Revisar
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
