import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { getProducaoById } from '@/lib/mock-data/producoes';
import type { Producao } from '@/lib/types/producao';
import { Droplets, Calendar, User, FlaskConical, Package, ArrowLeft } from 'lucide-react';

const statusLabels = {
  em_producao: 'Em Produção',
  disponivel: 'Disponível',
  estoque_critico: 'Estoque Crítico',
  esgotado: 'Esgotado',
};

export function ProducaoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producao, setProducao] = useState<Producao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProducaoById(id).then((result) => {
        setProducao(result);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <LoadingState type="form" />;

  if (!producao) {
    return (
      <div className="space-y-6">
        <PageHeader title="Produção não encontrada" breadcrumbs={[{ label: 'Produção', href: '/producao' }]} />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">A produção solicitada não foi encontrada.</p>
            <Button onClick={() => navigate('/producao')} className="mt-4">
              <ArrowLeft className="size-4 mr-2" />
              Voltar para lista
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Produção ${producao.id}`}
        breadcrumbs={[{ label: 'Produção', href: '/producao' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/producao')}>
              <ArrowLeft className="size-4 mr-2" />
              Voltar
            </Button>
            <Button onClick={() => navigate(`/producao/${producao.id}/editar`)}>Editar</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações da Produção</CardTitle>
              <StatusBadge status={producao.status} customLabel={statusLabels[producao.status]} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="size-4" />
                  <span>Lote de Origem</span>
                </div>
                <p className="font-medium">{producao.loteOrigem}</p>
                <p className="text-sm text-muted-foreground">{producao.tipoOleo}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>Data de Produção</span>
                </div>
                <p className="font-medium">
                  {new Date(producao.dataProducao).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>Responsável</span>
                </div>
                <p className="font-medium">{producao.responsavel.nome}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FlaskConical className="size-4" />
                  <span>Método de Extração</span>
                </div>
                <p className="font-medium">{producao.metodoExtracao}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Volume Total</p>
                <p className="text-2xl font-bold">{producao.volumeTotal} ml</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Concentração</p>
                <p className="text-2xl font-bold">{producao.concentracao}</p>
              </div>

              {producao.rendimento && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rendimento</p>
                  <p className="text-2xl font-bold">{producao.rendimento}%</p>
                </div>
              )}
            </div>

            {producao.observacoes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Observações</p>
                  <p className="text-sm">{producao.observacoes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status Atual</p>
                <p className="text-2xl font-bold capitalize">
                  {statusLabels[producao.status]}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Frascos Gerados</p>
                <p className="text-2xl font-bold">{producao.frascos?.length || 0}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Rendimento</p>
                <p className="text-2xl font-bold">{producao.volumeTotal} ml</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Frascos Gerados */}
      {producao.frascos && producao.frascos.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Frascos Gerados</CardTitle>
              <Badge variant="secondary">{producao.frascos.length} frascos</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium">Código</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Volume (ml)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Validade</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Dispensações</th>
                  </tr>
                </thead>
                <tbody>
                  {producao.frascos.map((frasco) => (
                    <tr key={frasco.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-medium">{frasco.codigo}</td>
                      <td className="py-3 px-4 text-sm">{frasco.volume} ml</td>
                      <td className="py-3 px-4 text-sm">
                        <StatusBadge
                          status={frasco.status}
                          customLabel={
                            frasco.status === 'disponivel'
                              ? 'Disponível'
                              : frasco.status === 'dispensado'
                              ? 'Dispensado'
                              : 'Vencido'
                          }
                        />
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(frasco.dataValidade).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {frasco.dispensacoes?.length || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
