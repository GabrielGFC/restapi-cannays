import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const responsaveis = [
  { id: 'USR-001', nome: 'João Silva' },
  { id: 'USR-002', nome: 'Maria Costa' },
  { id: 'USR-003', nome: 'Pedro Santos' },
];

export function LoteFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'novo';

  const [formData, setFormData] = useState({
    especie: '',
    dataPlantio: '',
    quantidadePlantas: '',
    localCultivo: '',
    responsavel: '',
    observacoes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.especie || !formData.dataPlantio || !formData.quantidadePlantas || !formData.localCultivo || !formData.responsavel) {
      toast.error('Erro de validação', {
        description: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    // Simular salvamento
    toast.success(isEditing ? 'Lote atualizado!' : 'Lote criado!', {
      description: `O lote ${formData.especie} foi ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
    });

    // Navegar de volta para a lista
    setTimeout(() => {
      navigate('/cultivo');
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isEditing ? 'Editar Lote' : 'Novo Lote'}
        breadcrumbs={[
          { label: 'Cultivo', href: '/cultivo' },
          { label: isEditing ? 'Editar' : 'Novo' },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate('/cultivo')}>
            <ArrowLeft className="size-4 mr-2" />
            Cancelar
          </Button>
        }
      />

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Lote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Espécie */}
              <div className="space-y-2">
                <Label htmlFor="especie">
                  Espécie <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="especie"
                  placeholder="Ex: Cannabis Sativa L. - ACDC"
                  value={formData.especie}
                  onChange={(e) => handleChange('especie', e.target.value)}
                  required
                />
              </div>

              {/* Data de Plantio */}
              <div className="space-y-2">
                <Label htmlFor="dataPlantio">
                  Data de Plantio <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dataPlantio"
                  type="date"
                  value={formData.dataPlantio}
                  onChange={(e) => handleChange('dataPlantio', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Quantidade de Plantas */}
              <div className="space-y-2">
                <Label htmlFor="quantidadePlantas">
                  Quantidade de Plantas <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantidadePlantas"
                  type="number"
                  min="1"
                  placeholder="Ex: 50"
                  value={formData.quantidadePlantas}
                  onChange={(e) => handleChange('quantidadePlantas', e.target.value)}
                  required
                />
              </div>

              {/* Local de Cultivo */}
              <div className="space-y-2">
                <Label htmlFor="localCultivo">
                  Local de Cultivo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="localCultivo"
                  placeholder="Ex: Estufa A - Setor 1"
                  value={formData.localCultivo}
                  onChange={(e) => handleChange('localCultivo', e.target.value)}
                  required
                />
              </div>

              {/* Responsável */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="responsavel">
                  Responsável <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.responsavel}
                  onValueChange={(value) => handleChange('responsavel', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {responsaveis.map((resp) => (
                      <SelectItem key={resp.id} value={resp.id}>
                        {resp.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Observações */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Informações adicionais sobre o lote..."
                  rows={4}
                  value={formData.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate('/cultivo')}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="size-4 mr-2" />
                {isEditing ? 'Salvar Alterações' : 'Criar Lote'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
