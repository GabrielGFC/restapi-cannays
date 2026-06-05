import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { getProducoes } from '@/lib/mock-data/producoes';
import type { Producao } from '@/lib/types/producao';
import { Droplets, AlertTriangle, TrendingUp, Package } from 'lucide-react';

interface EstoqueItem {
  tipoOleo: string;
  volumeTotal: number;
  volumeDisponivel: number;
  volumeDispensado: number;
  frascos: number;
  status: 'ok' | 'critico' | 'esgotado';
}

export function EstoqueOleoPage() {
  const [estoque, setEstoque] = useState<EstoqueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducoes().then((producoes) => {
      const estoqueMap = new Map<string, EstoqueItem>();

      producoes.forEach((producao) => {
        const key = producao.tipoOleo;
        const volumeDisponivel = producao.frascos
          .filter((f) => f.status === 'disponivel')
          .reduce((sum, f) => sum + f.volume, 0);
        const volumeDispensado = producao.frascos
          .filter((f) => f.status === 'dispensado')
          .reduce((sum, f) => sum + f.volume, 0);

        if (!estoqueMap.has(key)) {
          estoqueMap.set(key, {
            tipoOleo: key,
            volumeTotal: 0,
            volumeDisponivel: 0,
            volumeDispensado: 0,
            frascos: 0,
            status: 'ok',
          });
        }

        const item = estoqueMap.get(key)!;
        item.volumeTotal += producao.volumeTotal;
        item.volumeDisponivel += volumeDisponivel;
        item.volumeDispensado += volumeDispensado;
        item.frascos += producao.frascos.filter((f) => f.status === 'disponivel').length;

        // Definir status baseado no percentual disponível
        const percentualDisponivel = (volumeDisponivel / producao.volumeTotal) * 100;
        if (percentualDisponivel === 0) {
          item.status = 'esgotado';
        } else if (percentualDisponivel < 30) {
          item.status = 'critico';
        }
      });

      setEstoque(Array.from(estoqueMap.values()));
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="grid" />;

  const itensCriticos = estoque.filter((item) => item.status === 'critico' || item.status === 'esgotado');

  return (
    <div className="space-y-6">
      <PageHeader title="Estoque de Óleo" breadcrumbs={[{ label: 'Produção' }]} />

      {/* Alerta de Estoque Crítico */}
      {itensCriticos.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção: Estoque Crítico</AlertTitle>
          <AlertDescription>
            {itensCriticos.length} tipo(s) de óleo com estoque {itensCriticos.some((i) => i.status === 'esgotado') ? 'esgotado ou ' : ''}
            crítico. Considere iniciar nova produção.
          </AlertDescription>
        </Alert>
      )}

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <Droplets className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {estoque.reduce((sum, item) => sum + item.volumeTotal, 0)} ml
            </div>
            <p className="text-xs text-muted-foreground">Produzido até o momento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume Disponível</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {estoque.reduce((sum, item) => sum + item.volumeDisponivel, 0)} ml
            </div>
            <p className="text-xs text-muted-foreground">Pronto para dispensação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Volume Dispensado</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {estoque.reduce((sum, item) => sum + item.volumeDispensado, 0)} ml
            </div>
            <p className="text-xs text-muted-foreground">Entregue aos pacientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Estoque por Tipo */}
      <div className="grid grid-cols-1 gap-6">
        {estoque.map((item) => {
          const percentualDisponivel =
            item.volumeTotal > 0 ? (item.volumeDisponivel / item.volumeTotal) * 100 : 0;

          return (
            <Card key={item.tipoOleo}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.tipoOleo}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.frascos} frascos disponíveis
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.status === 'esgotado'
                        ? 'destructive'
                        : item.status === 'critico'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {item.status === 'esgotado'
                      ? 'Esgotado'
                      : item.status === 'critico'
                      ? 'Crítico'
                      : 'OK'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{item.volumeTotal} ml</p>
                    <p className="text-xs text-muted-foreground">Total Produzido</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{item.volumeDisponivel} ml</p>
                    <p className="text-xs text-muted-foreground">Disponível</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{item.volumeDispensado} ml</p>
                    <p className="text-xs text-muted-foreground">Dispensado</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Disponibilidade</span>
                    <span className="font-medium">{percentualDisponivel.toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={percentualDisponivel}
                    className={
                      item.status === 'esgotado'
                        ? '[&>div]:bg-destructive'
                        : item.status === 'critico'
                        ? '[&>div]:bg-amber-500'
                        : '[&>div]:bg-green-600'
                    }
                  />
                </div>

                {(item.status === 'critico' || item.status === 'esgotado') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/producao/novo')}
                  >
                    <Droplets className="size-4 mr-2" />
                    Iniciar Nova Produção
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
