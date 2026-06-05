import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { getMembroById } from '@/lib/mock-data/membros';
import type { Membro } from '@/lib/types/rh';
import { User, Mail, Phone, Calendar, FileText, Clock, ArrowLeft, CreditCard } from 'lucide-react';

const statusLabels = {
  ativo: 'Ativo',
  inativo: 'Inativo',
  afastado: 'Afastado',
};

const tipoColors: Record<string, string> = {
  Colaborador: 'bg-blue-100 text-blue-800',
  Voluntário: 'bg-green-100 text-green-800',
  Médico: 'bg-purple-100 text-purple-800',
  Farmacêutico: 'bg-orange-100 text-orange-800',
  Administrador: 'bg-red-100 text-red-800',
};

export function MembroDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [membro, setMembro] = useState<Membro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getMembroById(id).then((result) => {
        setMembro(result || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <LoadingState type="form" />;

  if (!membro) {
    return (
      <div className="space-y-6">
        <PageHeader title="Membro não encontrado" breadcrumbs={[{ label: 'RH', href: '/rh' }]} />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">O membro solicitado não foi encontrado.</p>
            <Button onClick={() => navigate('/rh')} className="mt-4">
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
        title={membro.nome}
        breadcrumbs={[{ label: 'Recursos Humanos', href: '/rh' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/rh')}>
              <ArrowLeft className="size-4 mr-2" />
              Voltar
            </Button>
            <Button onClick={() => navigate(`/rh/${membro.id}/editar`)}>Editar</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações Pessoais</CardTitle>
              <div className="flex gap-2">
                <Badge className={tipoColors[membro.tipo] || 'bg-gray-100 text-gray-800'}>
                  {membro.tipo}
                </Badge>
                <StatusBadge status={membro.status} customLabel={statusLabels[membro.status]} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>Nome Completo</span>
                </div>
                <p className="font-medium">{membro.nome}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  <span>E-mail</span>
                </div>
                <p className="font-medium">{membro.email}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  <span>Telefone</span>
                </div>
                <p className="font-medium">{membro.telefone}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="size-4" />
                  <span>CPF</span>
                </div>
                <p className="font-medium">{membro.cpf}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>Data de Admissão</span>
                </div>
                <p className="font-medium">
                  {new Date(membro.dataAdmissao).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>Tempo de Casa</span>
                </div>
                <p className="font-medium">
                  {Math.floor(
                    (new Date().getTime() - new Date(membro.dataAdmissao).getTime()) /
                      (1000 * 60 * 60 * 24 * 30)
                  )}{' '}
                  meses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold capitalize">{statusLabels[membro.status]}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Documentos</p>
                <p className="text-2xl font-bold">{membro.documentos.length}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Escalas Agendadas</p>
                <p className="text-2xl font-bold">{membro.escalas.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Documentos */}
      {membro.documentos.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Documentos
              </CardTitle>
              <Badge variant="secondary">{membro.documentos.length} documentos</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Número</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Data Upload</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {membro.documentos.map((doc) => (
                    <tr key={doc.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm font-medium">{doc.tipo}</td>
                      <td className="py-3 px-4 text-sm">{doc.numero}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(doc.dataUpload).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {doc.dataValidade
                          ? new Date(doc.dataValidade).toLocaleDateString('pt-BR')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escalas */}
      {membro.escalas.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Escalas Agendadas
              </CardTitle>
              <Badge variant="secondary">{membro.escalas.length} escalas</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {membro.escalas.map((escala) => (
                <div
                  key={escala.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{escala.atividade}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(escala.data).toLocaleDateString('pt-BR')} - {escala.turno}
                    </p>
                  </div>
                  <StatusBadge
                    status={escala.status}
                    customLabel={
                      escala.status === 'agendado'
                        ? 'Agendado'
                        : escala.status === 'realizado'
                        ? 'Realizado'
                        : 'Cancelado'
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Atividades */}
      {membro.atividades.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Histórico de Atividades
              </CardTitle>
              <Badge variant="secondary">{membro.atividades.length} atividades</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membro.atividades.map((atividade, index) => (
                <div key={atividade.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-3 rounded-full ${
                        index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    />
                    {index < membro.atividades.length - 1 && (
                      <div className="w-px h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{atividade.tipo}</h4>
                      <time className="text-sm text-muted-foreground">
                        {new Date(atividade.data).toLocaleDateString('pt-BR')}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{atividade.descricao}</p>
                    {atividade.duracao && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Duração: {atividade.duracao} minutos
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
