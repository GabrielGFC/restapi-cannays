import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Textarea } from '@/app/components/ui/textarea';
import { getReceitaById } from '@/lib/mock-data/receitas';
import type { Receita } from '@/lib/types/interacao';
import {
  ArrowLeft,
  User,
  Calendar,
  Pill,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

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

const tipoInteracaoLabels = {
  comentario: 'Comentário',
  aprovacao: 'Aprovação',
  ajuste: 'Ajuste Solicitado',
  rejeicao: 'Rejeição',
};

export function ReceitaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [receita, setReceita] = useState<Receita | null>(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (id) {
      getReceitaById(id).then((result) => {
        setReceita(result || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleAprovar = () => {
    toast.success('Receita aprovada!', {
      description: 'A receita foi aprovada e o paciente pode retirar o medicamento.',
    });
    setTimeout(() => navigate('/interacao'), 1000);
  };

  const handleSolicitarAjuste = () => {
    if (!mensagem.trim()) {
      toast.error('Mensagem obrigatória', {
        description: 'Por favor, descreva os ajustes necessários.',
      });
      return;
    }
    toast.success('Ajuste solicitado!', {
      description: 'O médico receberá a solicitação de ajuste.',
    });
    setTimeout(() => navigate('/interacao'), 1000);
  };

  const handleRejeitar = () => {
    if (!mensagem.trim()) {
      toast.error('Mensagem obrigatória', {
        description: 'Por favor, justifique a rejeição da receita.',
      });
      return;
    }
    toast.success('Receita rejeitada!', {
      description: 'O médico receberá a notificação de rejeição.',
    });
    setTimeout(() => navigate('/interacao'), 1000);
  };

  if (loading) return <LoadingState type="form" />;

  if (!receita) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Receita não encontrada"
          breadcrumbs={[{ label: 'Interação', href: '/interacao' }]}
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">A receita solicitada não foi encontrada.</p>
            <Button onClick={() => navigate('/interacao')} className="mt-4">
              <ArrowLeft className="size-4 mr-2" />
              Voltar para fila
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Receita ${receita.id}`}
        breadcrumbs={[{ label: 'Interação Médico-Farmacêutico', href: '/interacao' }]}
        actions={
          <Button variant="outline" onClick={() => navigate('/interacao')}>
            <ArrowLeft className="size-4 mr-2" />
            Voltar
          </Button>
        }
      />

      {/* Alertas Clínicos */}
      {receita.alertas.length > 0 && (
        <div className="space-y-3">
          {receita.alertas.map((alerta) => (
            <Alert
              key={alerta.id}
              variant={alerta.severidade === 'alta' ? 'destructive' : 'default'}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                Alerta: {alerta.tipo.replace('_', ' ')}
                <Badge className={severidadeColors[alerta.severidade]}>
                  {alerta.severidade}
                </Badge>
              </AlertTitle>
              <AlertDescription>{alerta.mensagem}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações da Receita */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações da Receita</CardTitle>
              <StatusBadge status={receita.status} customLabel={statusLabels[receita.status]} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Paciente */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="size-4" />
                <span>Paciente</span>
              </div>
              <p className="font-medium text-lg">{receita.paciente.nome}</p>
              <p className="text-sm text-muted-foreground">
                {new Date().getFullYear() -
                  new Date(receita.paciente.dataNascimento).getFullYear()}{' '}
                anos · Nascimento:{' '}
                {new Date(receita.paciente.dataNascimento).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <Separator />

            {/* Médico */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="size-4" />
                <span>Médico Responsável</span>
              </div>
              <p className="font-medium text-lg">{receita.medico.nome}</p>
              <p className="text-sm text-muted-foreground">CRM: {receita.medico.crm}</p>
            </div>

            <Separator />

            {/* Prescrição */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Pill className="size-4" />
                <span>Prescrição</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-muted-foreground">Produto</p>
                  <p className="font-medium">{receita.prescricao.produto}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Concentração</p>
                  <p className="font-medium">{receita.prescricao.concentracao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dosagem</p>
                  <p className="font-medium">{receita.prescricao.dosagem}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posologia</p>
                  <p className="font-medium">{receita.prescricao.posologia}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duração</p>
                  <p className="font-medium">{receita.prescricao.duracao}</p>
                </div>
              </div>
              {receita.prescricao.observacoes && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Observações</p>
                  <p className="text-sm mt-1">{receita.prescricao.observacoes}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="size-4" />
                  <span>Data de Emissão</span>
                </div>
                <p className="font-medium">
                  {new Date(receita.dataEmissao).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="size-4" />
                  <span>Validade</span>
                </div>
                <p className="font-medium">
                  {new Date(receita.dataValidade).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold capitalize">
                  {statusLabels[receita.status]}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Interações</p>
                <p className="text-2xl font-bold">{receita.interacoes.length}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Alertas</p>
                <p className="text-2xl font-bold">{receita.alertas.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de Interações */}
      {receita.interacoes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Histórico de Interações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {receita.interacoes.map((interacao, index) => (
                <div key={interacao.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-3 rounded-full ${
                        index === receita.interacoes.length - 1 ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    />
                    {index < receita.interacoes.length - 1 && (
                      <div className="w-px h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{interacao.autor.nome}</p>
                        <p className="text-sm text-muted-foreground">{interacao.autor.perfil}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {tipoInteracaoLabels[interacao.tipo]}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(interacao.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{interacao.mensagem}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações do Farmacêutico */}
      {(receita.status === 'aguardando' || receita.status === 'em_analise') && (
        <Card>
          <CardHeader>
            <CardTitle>Ações de Validação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mensagem / Observações (opcional para aprovação)
              </label>
              <Textarea
                placeholder="Adicione comentários sobre a validação..."
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAprovar} className="flex-1">
                <CheckCircle className="size-4 mr-2" />
                Aprovar Receita
              </Button>
              <Button variant="outline" onClick={handleSolicitarAjuste} className="flex-1">
                <MessageSquare className="size-4 mr-2" />
                Solicitar Ajuste
              </Button>
              <Button variant="destructive" onClick={handleRejeitar}>
                <XCircle className="size-4 mr-2" />
                Rejeitar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
