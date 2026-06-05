import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { LoadingState } from '@/app/components/shared/LoadingState';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { getMembros } from '@/lib/mock-data/membros';
import type { Membro } from '@/lib/types/rh';
import { Users, Plus, Eye } from 'lucide-react';

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

export function MembrosListPage() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMembros().then((result) => {
      setMembros(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState type="table" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Membros da Equipe"
        breadcrumbs={[{ label: 'Recursos Humanos' }]}
        actions={
          <Button onClick={() => navigate('/rh/novo')}>
            <Plus className="size-4 mr-2" />
            Novo Membro
          </Button>
        }
      />

      {membros.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum membro cadastrado"
          description="Comece adicionando membros à equipe da associação"
          actionLabel="Novo Membro"
          onAction={() => navigate('/rh/novo')}
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data Admissão</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membros.map((membro) => (
                <TableRow
                  key={membro.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/rh/${membro.id}`)}
                >
                  <TableCell className="font-medium">{membro.nome}</TableCell>
                  <TableCell>
                    <Badge className={tipoColors[membro.tipo] || 'bg-gray-100 text-gray-800'}>
                      {membro.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={membro.status} customLabel={statusLabels[membro.status]} />
                  </TableCell>
                  <TableCell>{membro.email}</TableCell>
                  <TableCell>{membro.telefone}</TableCell>
                  <TableCell>{new Date(membro.dataAdmissao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rh/${membro.id}`);
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
