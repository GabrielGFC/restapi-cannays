import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { getLoteById } from '@/lib/mock-data/lotes';
import type { Lote } from '@/lib/types/cultivo';
import { Sprout, Calendar, User, MapPin, FileText, History, ArrowLeft } from 'lucide-react';

export function LoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lote, setLote] = useState<Lote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getLoteById(id).then((result) => {
        setLote(result);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <LoadingState type="form" />;

  if (!lote) {
    return (
      <div className="space-y-6">
        <PageHeader title="Lote não encontrado" breadcrumbs={[{ label: 'Cultivo', href: '/cultivo' }]} />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">O lote solicitado não foi encontrado.</p>
            <Button onClick={() => navigate('/cultivo')} className="mt-4">
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
        title={`Lote ${lote.codigo}`}
        breadcrumbs={[{ label: 'Cultivo', href: '/cultivo' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/cultivo')}>
              <ArrowLeft className="size-4 mr-2" />
              Voltar
            </Button>
            <Button onClick={() => navigate(`/cultivo/${lote.id}/editar`)}>Editar</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações do Lote</CardTitle>
              <StatusBadge status={lote.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sprout className="size-4" />
                  <span>Espécie</span>
                </div>
                <p className="font-medium">{lote.especie}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>Data de Plantio</span>
                </div>
                <p className="font-medium">
                  {new Date(lote.dataPlantio).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>Responsável</span>
                </div>
                <p className="font-medium">{lote.responsavel.nome}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sprout className="size-4" />
                  <span>Quantidade de Plantas</span>
                </div>
                <p className="font-medium">{lote.quantidadePlantas}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>Local de Cultivo</span>
                </div>
                <p className="font-medium">{lote.localCultivo}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>Última Atualização</span>
                </div>
                <p className="font-medium">
                  {new Date(lote.dataAtualizacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {lote.observacoes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>Observações</span>
                  </div>
                  <p className="text-sm">{lote.observacoes}</p>
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
                <p className="text-2xl font-bold capitalize">{lote.status.replace('_', ' ')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Dias desde plantio</p>
                <p className="text-2xl font-bold">
                  {Math.floor(
                    (new Date().getTime() - new Date(lote.dataPlantio).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Plantas Ativas</p>
                <p className="text-2xl font-bold">{lote.quantidadePlantas}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timeline de Etapas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="size-5" />
            Linha do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lote.etapas.map((etapa, index) => (
              <div key={`${etapa.etapa}-${etapa.data}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-3 rounded-full ${
                      index === lote.etapas.length - 1
                        ? 'bg-primary'
                        : 'bg-muted-foreground'
                    }`}
                  />
                  {index < lote.etapas.length - 1 && (
                    <div className="w-px h-full bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium capitalize">{etapa.etapa.replace('_', ' ')}</h4>
                    <time className="text-sm text-muted-foreground">
                      {new Date(etapa.data).toLocaleDateString('pt-BR')}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Responsável: {etapa.responsavel}
                  </p>
                  {etapa.observacoes && (
                    <p className="text-sm text-muted-foreground mt-1">{etapa.observacoes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insumos Utilizados */}
      {lote.insumos && lote.insumos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Insumos Utilizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Responsável</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Quantidade</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Data de Aplicação</th>
                  </tr>
                </thead>
                <tbody>
                  {lote.insumos.map((insumo) => (
                    <tr key={insumo.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm capitalize">{insumo.tipo}</td>
                      <td className="py-3 px-4 text-sm">{insumo.responsavel}</td>
                      <td className="py-3 px-4 text-sm">{insumo.quantidade}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(insumo.data).toLocaleDateString('pt-BR')}
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
