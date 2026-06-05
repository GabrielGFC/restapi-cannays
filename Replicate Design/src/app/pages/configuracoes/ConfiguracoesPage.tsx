import { useState } from 'react';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { Switch } from '@/app/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import {
  Building2,
  Users,
  Bell,
  Database,
  Shield,
  FileText,
  Save,
  Download,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';

export function ConfiguracoesPage() {
  const [formData, setFormData] = useState({
    nomeAssociacao: 'Associação CannaSYS',
    cnpj: '12.345.678/0001-90',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    telefone: '(11) 3456-7890',
    email: 'contato@cannasys.org',
  });

  const [notificacoes, setNotificacoes] = useState({
    emailReceitas: true,
    emailEstoque: true,
    emailVencimento: false,
    pushDispensacao: true,
  });

  const handleSave = () => {
    toast.success('Configurações salvas!', {
      description: 'As alterações foram aplicadas com sucesso.',
    });
  };

  const handleBackup = () => {
    toast.success('Backup iniciado!', {
      description: 'O backup está sendo gerado. Você receberá uma notificação quando concluir.',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Configurações" breadcrumbs={[{ label: 'Sistema' }]} />

      <Tabs defaultValue="associacao" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="associacao">Associação</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        {/* Dados da Associação */}
        <TabsContent value="associacao" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="size-5" />
                <CardTitle>Dados da Associação</CardTitle>
              </div>
              <CardDescription>
                Informações básicas sobre a associação de cannabis medicinal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nome">Nome da Associação</Label>
                  <Input
                    id="nome"
                    value={formData.nomeAssociacao}
                    onChange={(e) => handleChange('nomeAssociacao', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleChange('cnpj', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">E-mail de Contato</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleChange('endereco', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleChange('estado', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="size-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuários e Permissões */}
        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="size-5" />
                <CardTitle>Usuários e Permissões</CardTitle>
              </div>
              <CardDescription>Gerencie usuários e suas permissões no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Administradores</p>
                    <p className="text-sm text-muted-foreground">Acesso total ao sistema</p>
                  </div>
                  <Badge>2 usuários</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Médicos</p>
                    <p className="text-sm text-muted-foreground">
                      Prescrição e acompanhamento de pacientes
                    </p>
                  </div>
                  <Badge>1 usuário</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Farmacêuticos</p>
                    <p className="text-sm text-muted-foreground">
                      Validação de receitas e dispensação
                    </p>
                  </div>
                  <Badge>1 usuário</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Colaboradores</p>
                    <p className="text-sm text-muted-foreground">Cultivo e produção</p>
                  </div>
                  <Badge>2 usuários</Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-end">
                <Button>
                  <Shield className="size-4 mr-2" />
                  Gerenciar Permissões
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="size-5" />
                <CardTitle>Notificações</CardTitle>
              </div>
              <CardDescription>Configure como e quando receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-receitas">Novas receitas por e-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um e-mail quando houver novas receitas para validar
                    </p>
                  </div>
                  <Switch
                    id="email-receitas"
                    checked={notificacoes.emailReceitas}
                    onCheckedChange={(checked) =>
                      setNotificacoes((prev) => ({ ...prev, emailReceitas: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-estoque">Alertas de estoque por e-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações quando o estoque estiver crítico
                    </p>
                  </div>
                  <Switch
                    id="email-estoque"
                    checked={notificacoes.emailEstoque}
                    onCheckedChange={(checked) =>
                      setNotificacoes((prev) => ({ ...prev, emailEstoque: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-vencimento">Vencimento de produtos</Label>
                    <p className="text-sm text-muted-foreground">
                      Avisos sobre produtos próximos ao vencimento
                    </p>
                  </div>
                  <Switch
                    id="email-vencimento"
                    checked={notificacoes.emailVencimento}
                    onCheckedChange={(checked) =>
                      setNotificacoes((prev) => ({ ...prev, emailVencimento: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-dispensacao">Notificações de dispensação</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas em tempo real sobre dispensações realizadas
                    </p>
                  </div>
                  <Switch
                    id="push-dispensacao"
                    checked={notificacoes.pushDispensacao}
                    onCheckedChange={(checked) =>
                      setNotificacoes((prev) => ({ ...prev, pushDispensacao: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="size-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="size-5" />
                <CardTitle>Backup e Restauração</CardTitle>
              </div>
              <CardDescription>
                Gerencie backups do sistema e restaure dados quando necessário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Último Backup</p>
                      <p className="text-sm text-muted-foreground">
                        05 de junho de 2026 às 03:00
                      </p>
                    </div>
                    <Badge variant="secondary">Concluído</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="size-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="size-4 mr-2" />
                      Restaurar
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Backup Automático</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Backups automáticos são realizados diariamente às 03:00
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ativar backup automático</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3">
                <Button onClick={handleBackup}>
                  <Database className="size-4 mr-2" />
                  Criar Backup Agora
                </Button>
                <Button variant="outline">
                  <Upload className="size-4 mr-2" />
                  Importar Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="size-5" />
                <CardTitle>Logs de Auditoria</CardTitle>
              </div>
              <CardDescription>
                Histórico de ações realizadas no sistema para auditoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    usuario: 'Admin',
                    acao: 'Criou novo lote',
                    modulo: 'Cultivo',
                    data: '2026-06-05 14:30',
                  },
                  {
                    usuario: 'Dr. Carlos Farmacêutico',
                    acao: 'Aprovou receita REC-2026-001',
                    modulo: 'Interação',
                    data: '2026-06-05 13:15',
                  },
                  {
                    usuario: 'João Silva',
                    acao: 'Registrou produção',
                    modulo: 'Produção',
                    data: '2026-06-05 11:00',
                  },
                  {
                    usuario: 'Dr. Pedro Lima',
                    acao: 'Emitiu nova receita',
                    modulo: 'Interação',
                    data: '2026-06-05 10:20',
                  },
                  {
                    usuario: 'Maria Costa',
                    acao: 'Atualizou etapa de lote',
                    modulo: 'Cultivo',
                    data: '2026-06-04 16:45',
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{log.usuario}</p>
                        <Badge variant="secondary" className="text-xs">
                          {log.modulo}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.acao}</p>
                    </div>
                    <time className="text-sm text-muted-foreground">{log.data}</time>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="size-4 mr-2" />
                  Exportar Logs
                </Button>
                <Button variant="outline">Filtrar por Período</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
