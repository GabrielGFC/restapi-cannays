import { useEffect, useState } from 'react';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { getDashboardData } from '@/lib/mock-data/relatorios';
import type { DashboardData } from '@/lib/types/relatorios';
import { BarChart3, Users, Droplets, Sprout, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#062E2D', '#75A38C', '#026874', '#4C1041', '#F59E0B'];

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="grid" />;

  if (!data) return null;

  const getTrendIcon = (trend: string | undefined) => {
    if (trend === 'up') return <TrendingUp className="size-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="size-4 text-red-600" />;
    return <Minus className="size-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" breadcrumbs={[{ label: 'Relatórios' }]} />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.pacientesAtivos.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.pacientesAtivos.trend)}
              <span>{data.kpis.pacientesAtivos.variacao}% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dispensações (30d)</CardTitle>
            <Droplets className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.dispensacoesUltimo30d.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.dispensacoesUltimo30d.trend)}
              <span>{data.kpis.dispensacoesUltimo30d.variacao}% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estoque de Óleo (ml)</CardTitle>
            <Droplets className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.volumeOleoEstoque.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.volumeOleoEstoque.trend)}
              <span>{data.kpis.volumeOleoEstoque.variacao}% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lotes em Cultivo</CardTitle>
            <Sprout className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.lotesAtivos.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.lotesAtivos.trend)}
              <span>Estável</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.receitaFinanceira.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.receitaFinanceira.trend)}
              <span>{data.kpis.receitaFinanceira.variacao}% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inadimplência</CardTitle>
            <TrendingDown className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.inadimplencia.valor}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(data.kpis.inadimplencia.trend)}
              <span>{data.kpis.inadimplencia.variacao}% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.charts.evolucaoPacientes}>
                <CartesianGrid strokeDasharray="3 3" key="grid-evolucao" />
                <XAxis dataKey="label" key="xaxis-evolucao" />
                <YAxis key="yaxis-evolucao" />
                <Tooltip key="tooltip-evolucao" />
                <Legend key="legend-evolucao" />
                <Line type="monotone" dataKey="valor" stroke="#062E2D" strokeWidth={2} name="Pacientes" key="line-evolucao" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispensações por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.dispensacoesPorMes}>
                <CartesianGrid strokeDasharray="3 3" key="grid-dispensacoes" />
                <XAxis dataKey="label" key="xaxis-dispensacoes" />
                <YAxis key="yaxis-dispensacoes" />
                <Tooltip key="tooltip-dispensacoes" />
                <Legend key="legend-dispensacoes" />
                <Bar dataKey="valor" fill="#75A38C" name="Dispensações" key="bar-dispensacoes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produção por Mês (ml)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.producaoPorMes}>
                <CartesianGrid strokeDasharray="3 3" key="grid-producao" />
                <XAxis dataKey="label" key="xaxis-producao" />
                <YAxis key="yaxis-producao" />
                <Tooltip key="tooltip-producao" />
                <Legend key="legend-producao" />
                <Bar dataKey="valor" fill="#026874" name="Volume Produzido" key="bar-producao" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes por Condição</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart key="piechart-condicoes">
                <Pie
                  data={data.charts.pacientesPorCondicao}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ label, percent }) => `${label}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  key="pie-condicoes"
                >
                  {data.charts.pacientesPorCondicao.map((entry, index) => (
                    <Cell key={`pie-cell-${entry.label}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip key="tooltip-pie" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
