import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { TipoMembro, StatusMembro } from '@/lib/types/rh';

const tiposMembro: TipoMembro[] = ['Colaborador', 'Voluntário', 'Médico', 'Farmacêutico', 'Administrador'];
const statusMembro: StatusMembro[] = ['ativo', 'inativo', 'afastado'];

export function MembroFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'novo';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    tipo: '' as TipoMembro | '',
    status: 'ativo' as StatusMembro,
    dataAdmissao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf || !formData.tipo || !formData.dataAdmissao) {
      toast.error('Erro de validação', {
        description: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    // Simular salvamento
    toast.success(isEditing ? 'Membro atualizado!' : 'Membro criado!', {
      description: `${formData.nome} foi ${isEditing ? 'atualizado' : 'adicionado'} com sucesso.`,
    });

    // Navegar de volta para a lista
    setTimeout(() => {
      navigate('/rh');
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isEditing ? 'Editar Membro' : 'Novo Membro'}
        breadcrumbs={[
          { label: 'Recursos Humanos', href: '/rh' },
          { label: isEditing ? 'Editar' : 'Novo' },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate('/rh')}>
            <ArrowLeft className="size-4 mr-2" />
            Cancelar
          </Button>
        }
      />

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Membro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nome">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nome"
                  placeholder="Ex: João Silva"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone">
                  Telefone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={formData.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                  required
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf">
                  CPF <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cpf"
                  placeholder="123.456.789-00"
                  value={formData.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                  required
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="tipo">
                  Tipo de Membro <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) => handleChange('tipo', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposMembro.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value as StatusMembro)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusMembro.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data de Admissão */}
              <div className="space-y-2">
                <Label htmlFor="dataAdmissao">
                  Data de Admissão <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dataAdmissao"
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) => handleChange('dataAdmissao', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate('/rh')}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="size-4 mr-2" />
                {isEditing ? 'Salvar Alterações' : 'Criar Membro'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
