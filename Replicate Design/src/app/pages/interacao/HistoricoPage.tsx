import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { getReceitas } from '@/lib/mock-data/receitas';
import type { Receita } from '@/lib/types/interacao';
import { MessageSquare, Search, Calendar, User, ClipboardList } from 'lucide-react';

export function HistoricoPage() {
  const navigate = useNavigate();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getReceitas().then((result) => {
      setReceitas(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="grid" />;

  // Agrupar receitas por paciente
  const receitasPorPaciente = receitas.reduce((acc, receita) => {
    const pacienteId = receita.paciente.id;
    if (!acc[pacienteId]) {
      acc[pacienteId] = {
        paciente: receita.paciente,
        receitas: [],
        totalInteracoes: 0,
      };
    }
    acc[pacienteId].receitas.push(receita);
    acc[pacienteId].totalInteracoes += receita.interacoes.length;
    return acc;
  }, {} as Record<string, { paciente: Receita['paciente']; receitas: Receita[]; totalInteracoes: number }>);

  const pacientes = Object.values(receitasPorPaciente).filter((p) =>
    p.paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Histórico de Interações"
        breadcrumbs={[{ label: 'Interação Médico-Farmacêutico' }]}
        actions={
          <Button variant="outline" onClick={() => navigate('/interacao')}>
            <ClipboardList className="size-4 mr-2" />
            Fila de Validação
          </Button>
        }
      />

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {pacientes.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="Nenhum histórico encontrado"
          description={
            searchTerm
              ? 'Nenhum paciente encontrado com esse nome'
              : 'Ainda não há histórico de interações'
          }
          actionLabel=""
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pacientes.map(({ paciente, receitas: receitasPaciente, totalInteracoes }) => (
            <Card key={paciente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {paciente.nome
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{paciente.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date().getFullYear() -
                          new Date(paciente.dataNascimento).getFullYear()}{' '}
                        anos
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{receitasPaciente.length} receitas</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Interações</p>
                    <p className="text-2xl font-bold">{totalInteracoes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receitas</p>
                    <p className="text-2xl font-bold">{receitasPaciente.length}</p>
                  </div>
                </div>

                {/* Últimas Receitas */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="size-4" />
                    Receitas Recentes
                  </h4>
                  {receitasPaciente.slice(0, 3).map((receita) => (
                    <div
                      key={receita.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/interacao/${receita.id}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{receita.id}</p>
                        <Badge
                          variant={
                            receita.status === 'aprovada'
                              ? 'default'
                              : receita.status === 'rejeitada'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {receita.status === 'aprovada'
                            ? 'Aprovada'
                            : receita.status === 'rejeitada'
                            ? 'Rejeitada'
                            : receita.status === 'aguardando'
                            ? 'Aguardando'
                            : receita.status === 'em_analise'
                            ? 'Em Análise'
                            : 'Ajuste Solicitado'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {receita.prescricao.produto}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(receita.dataEmissao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {receita.interacoes.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <MessageSquare className="size-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {receita.interacoes.length}{' '}
                            {receita.interacoes.length === 1 ? 'interação' : 'interações'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Timeline de Comunicações */}
                {receitasPaciente.some((r) => r.interacoes.length > 0) && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="size-4" />
                      Últimas Comunicações
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {receitasPaciente
                        .flatMap((r) =>
                          r.interacoes.map((int) => ({ ...int, receitaId: r.id }))
                        )
                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                        .slice(0, 5)
                        .map((interacao) => (
                          <div
                            key={interacao.id}
                            className="flex gap-3 p-3 bg-muted/30 rounded-lg"
                          >
                            <Avatar className="size-8">
                              <AvatarFallback className="text-xs bg-secondary">
                                {interacao.autor.nome
                                  .split(' ')
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium">{interacao.autor.nome}</p>
                                <time className="text-xs text-muted-foreground">
                                  {new Date(interacao.data).toLocaleDateString('pt-BR')}
                                </time>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">
                                {interacao.autor.perfil} · Receita {interacao.receitaId}
                              </p>
                              <p className="text-sm line-clamp-2">{interacao.mensagem}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Médico Responsável */}
                {receitasPaciente[0] && (
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Médico:</span>
                      <span className="font-medium">
                        {receitasPaciente[0].medico.nome}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
