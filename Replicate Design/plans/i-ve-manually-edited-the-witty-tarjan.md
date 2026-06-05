# Plano de Implementação: CannaSYS - 6 Módulos ERP

## Contexto

Implementar 6 módulos funcionais do sistema ERP CannaSYS para associações de cannabis medicinal, seguindo especificação de design detalhada. O projeto já possui uma base sólida com 48 componentes shadcn/ui, React Router, react-hook-form, recharts e design system parcialmente implementado.

**Objetivo**: Criar protótipos funcionais completos dos módulos de Cultivo, Produção de Óleo, RH, Interação Médico-Farmacêutico, Relatórios e Configurações, com todos os estados (vazio, carregando, preenchido, erro) e navegação integrada.

---

## Abordagem de Implementação

### 1. Fundação (Infraestrutura Base)

**Atualizar Design System** (`src/styles/theme.css`):
- Adicionar cores da especificação como variáveis CSS:
  - Primary Dark: `#1A5C38` → `--cannasys-primary-dark`
  - Primary Medium: `#2E7D4F` → `--cannasys-primary-medium`
  - Primary Light: `#D6EAD8` → `--cannasys-primary-light`
  - Alert: `#F59E0B`, Error: `#DC2626`, Success: `#16A34A`
- Mapear para tokens shadcn (`--primary`, `--secondary`, etc.)

**Configurar Roteamento** (`src/app/App.tsx`):
```
/cultivo → Lista, Detalhe, Formulário, Etapas
/producao → Lista, Detalhe, Formulário, Estoque, Rastreabilidade
/rh → Lista, Detalhe, Formulário, Escala
/interacao → Fila, Revisão, Histórico
/relatorios → Dashboard, Pacientes, Produção, Dispensação, Financeiro, Rastreabilidade
/configuracoes → Associação, Usuários, Permissões, Notificações, Logs, Backup
```

**Criar Layout Principal** (`src/app/components/layout/`):
- `AppShell.tsx`: Wrapper com Sidebar + Header + Outlet (react-router)
- `MainSidebar.tsx`: Navegação com ícones (Sprout, Droplets, Users, Stethoscope, BarChart3, Settings)
- `MainHeader.tsx`: Breadcrumb + avatar + notificações

### 2. Componentes Compartilhados

Criar em `src/app/components/shared/`:

**Estados Universais**:
- `EmptyState.tsx`: Ilustração + mensagem + botão CTA (reutiliza Card, Button)
- `LoadingState.tsx`: Skeleton placeholders (tipos: table, grid, form)
- `ErrorState.tsx`: Banner de erro + botão retry (reutiliza Alert, Button)

**UI Complexos**:
- `StatusBadge.tsx`: Badge com cores mapeadas (pending→amber, approved→green, rejected→red)
- `PageHeader.tsx`: Título + breadcrumb + ações (reutiliza Breadcrumb, Button)
- `DataTable.tsx`: Tabela com ordenação, filtro, paginação (reutiliza Table, Input, Select)
- `FilterBar.tsx`: Barra de filtros com date range (reutiliza Calendar, Popover, Select)
- `Timeline.tsx`: Visualização de eventos em linha do tempo (SVG customizado)
- `TraceabilityGraph.tsx`: Visualização de rastreabilidade lote→produção→frascos→dispensações
- `KPICard.tsx`: Card de métrica com ícone, valor, tendência (reutiliza Card)

### 3. Estrutura de Dados

**Tipos TypeScript** (`src/lib/types/`):
- `cultivo.ts`: Lote, Etapa, Insumo
- `producao.ts`: Producao, Frasco, Oleo
- `rh.ts`: Membro, Documento, Escala, Atividade
- `interacao.ts`: Receita, Interacao, Alerta
- `relatorios.ts`: KPI, ChartData
- `common.ts`: Status, Perfil, Paginacao

**Mock Data** (`src/lib/mock-data/`):
- `lotes.ts`: 15-20 lotes com status variado (plantio, vegetativo, floracao, colheita)
- `producoes.ts`: 10 produções vinculadas a lotes
- `membros.ts`: 8 membros (médicos, farmacêuticos, admin)
- `receitas.ts`: 12 receitas com status variado
- `relatorios.ts`: Dados de KPIs e gráficos

### 4. Módulos por Ordem de Prioridade

#### Módulo 1: Relatórios (PRIMEIRO)
**Razão**: Dashboard é landing page, valida design system rapidamente, não depende de CRUD complexo

**Páginas** (`src/app/pages/relatorios/`):
- `DashboardPage.tsx`: Grid de KPICards + 3-4 charts (Recharts: linha, barras, pizza)
- `RelatoriosPacientesPage.tsx`: Tabela com filtros
- `RelatoriosProducaoPage.tsx`: Chart de volume por mês
- `RelatoriosDispensacaoPage.tsx`: Chart de dispensações
- `RelatoriosFinanceiroPage.tsx`: Receitas vs despesas
- `RastreabilidadePage.tsx`: TraceabilityGraph com filtro por período

**Componentes específicos** (`components/`):
- `KPIGrid.tsx`: Layout responsivo de KPIs
- `ChartDispensacao.tsx`, `ChartProducao.tsx`: Wrappers para Recharts
- `ExportButton.tsx`: Simula download PDF/Excel
- `DateRangeFilter.tsx`: Filtro de período

#### Módulo 2: Cultivo
**Razão**: Início da cadeia de rastreabilidade, valida DataTable e formulários

**Páginas** (`src/app/pages/cultivo/`):
- `LotesListPage.tsx`: DataTable com filtros (status, data, responsável)
- `LoteDetailPage.tsx`: Informações + Timeline de etapas + lista de insumos
- `LoteFormPage.tsx`: Formulário com react-hook-form + zod
- Modal: `EtapaModal.tsx` para registrar transição de etapa

**Campos do formulário**:
- Espécie (text, obrigatório)
- Data de Plantio (DatePicker, obrigatório)
- Responsável (Select de membros, obrigatório)
- Quantidade de Plantas (number, obrigatório)
- Local de Cultivo (text, obrigatório)
- Observações (textarea, opcional)

#### Módulo 3: Produção de Óleo
**Razão**: Depende de Cultivo, introduz rastreabilidade completa

**Páginas** (`src/app/pages/producao/`):
- `ProducoesListPage.tsx`: DataTable vinculada a lotes
- `ProducaoDetailPage.tsx`: Info detalhada + lista de frascos gerados
- `ProducaoFormPage.tsx`: Formulário vinculando lote colhido
- `EstoqueOleoPage.tsx`: Visão consolidada + alerta de estoque crítico
- Componente: `RastreabilidadeFlow.tsx` (timeline/flowchart visual)

**Alerta de estoque crítico**: Banner amarelo quando volume total < threshold (configurável)

#### Módulo 4: Interação Médico-Farmacêutico
**Razão**: Feature única (validação + chat), não bloqueia outros módulos

**Páginas** (`src/app/pages/interacao-medico/`):
- `FilaValidacaoPage.tsx`: Lista de receitas com badges de status
- `RevisaoReceitaPage.tsx`: Layout lado a lado (receita + validação)
- `HistoricoPage.tsx`: Thread de mensagens por paciente
- Componentes: `ReceitaReviewPanel.tsx`, `ThreadMensagens.tsx`, `AlertasClinicosCard.tsx`

**Status de receita (badges)**:
- Aguardando revisão → amarelo
- Em análise → azul
- Aprovada → verde
- Ajuste solicitado → laranja
- Rejeitada → vermelho

#### Módulo 5: Recursos Humanos
**Razão**: CRUD simples + calendário, menos interdependências

**Páginas** (`src/app/pages/rh/`):
- `MembrosListPage.tsx`: DataTable com foto, nome, função, status
- `MembroDetailPage.tsx`: Dados + documentos + histórico de atividades
- `MembroFormPage.tsx`: Formulário + upload de documentos
- `EscalaPage.tsx`: Calendário/grade semanal de disponibilidade
- Componentes: `CalendarioEscala.tsx`, `DocumentosUpload.tsx`, `AtividadesLog.tsx`

**Tipos de membro**: Colaborador, Voluntário, Médico, Farmacêutico, Administrador

#### Módulo 6: Configurações
**Razão**: Baixa prioridade funcional, páginas independentes

**Páginas** (`src/app/pages/configuracoes/`):
- `DadosAssociacaoPage.tsx`: Formulário simples (nome, CNPJ, logo, endereço)
- `UsuariosPage.tsx`: CRUD de usuários do sistema
- `PermissoesPage.tsx`: Matriz de permissões (perfil × módulo × ação)
- `NotificacoesPage.tsx`: Preferências de alertas
- `LogsAuditoriaPage.tsx`: Tabela com filtros avançados (usuário, ação, módulo, período)
- `BackupPage.tsx`: Simulação de backup/restore
- `IntegracoesPage.tsx`: Cards de status de integrações

**Matriz de permissões**: Grid onde linhas=módulos, colunas=perfis, células=toggle (sem acesso / leitura / escrita / completo)

---

## Arquivos Críticos

### 1. `/src/styles/theme.css`
Adicionar variáveis CSS da especificação CannaSYS e mapear para tokens shadcn existentes

### 2. `/src/app/App.tsx`
Configurar BrowserRouter com todas as rotas dos 6 módulos usando React Router 7

### 3. `/src/app/components/layout/AppShell.tsx` (criar)
Layout principal com SidebarProvider + Sidebar + Header + Outlet + Toaster

### 4. `/src/app/components/shared/DataTable.tsx` (criar)
Componente reutilizável para listas com ordenação, filtro e paginação (usado em 80% das páginas)

### 5. `/src/app/components/shared/TraceabilityGraph.tsx` (criar)
Visualização crítica de rastreabilidade completa (lote → produção → frascos → dispensações)

### 6. `/src/lib/mock-data/*.ts` (criar)
Dados simulados para todos os módulos com relacionamentos corretos

### 7. `/src/lib/types/*.ts` (criar)
Definições TypeScript para Lote, Producao, Membro, Receita, etc.

---

## Padrões de Código

**Estrutura de página de lista**:
```tsx
export function LotesListPage() {
  const { lotes, loading, error } = useLotes();
  
  if (loading) return <LoadingState type="table" />;
  if (error) return <ErrorState error={error} />;
  
  return (
    <div className="space-y-6">
      <PageHeader title="Lotes" breadcrumbs={[...]} actions={<Button>Novo</Button>} />
      {lotes.length === 0 ? (
        <EmptyState icon={Sprout} title="..." description="..." />
      ) : (
        <DataTable columns={columns} data={lotes} />
      )}
    </div>
  );
}
```

**Validação de formulário** (react-hook-form + zod):
```tsx
const loteSchema = z.object({
  especie: z.string().min(1, 'Espécie obrigatória'),
  dataPlantio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  responsavel: z.string().min(1)
});

const form = useForm({
  resolver: zodResolver(loteSchema),
  defaultValues: { especie: '', dataPlantio: '', responsavel: '' }
});
```

**Navegação na Sidebar** (reutilizar componente Sidebar existente):
```tsx
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link to="/cultivo"><Sprout /> Cultivo</Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
  {/* ... outros módulos */}
</SidebarMenu>
```

---

## Decisões Arquiteturais

### Gerenciamento de Estado
Sem Redux/Zustand inicialmente. React Hook Form para formulários, Context API para auth/tema. Adicionar estado global apenas se necessário.

### Data Fetching
Funções mock assíncronas simulando latência:
```typescript
export const getLotes = async (): Promise<Lote[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLotes;
};
```
Facilita migração futura para API real.

### Ícones
Lucide React (já instalado):
- Cultivo: `Sprout`
- Produção: `Droplets`
- RH: `Users`
- Interação: `Stethoscope`
- Relatórios: `BarChart3`
- Configurações: `Settings`

### Validação
Zod + React Hook Form para validação type-safe e integração nativa.

### Rastreabilidade
Opção simples: componentes customizados com Grid/Flex CSS  
Opção robusta: `@xyflow/react` (React Flow) para grafos interativos  
**Começar com opção simples, expandir se necessário**

---

## Verificação

### Checklist por Módulo
- [ ] Tipos TypeScript criados
- [ ] Mock data criado
- [ ] Rotas configuradas
- [ ] Página de lista com DataTable
- [ ] Página de detalhe
- [ ] Página de formulário (criar/editar)
- [ ] Estados vazios (EmptyState)
- [ ] Estados de carregamento (LoadingState)
- [ ] Estados de erro (ErrorState)
- [ ] Navegação na sidebar
- [ ] Breadcrumbs
- [ ] Filtros funcionais
- [ ] Toasts de feedback
- [ ] Responsividade testada

### Testes de Navegação
1. Navegar de Relatórios → Cultivo → Detalhe de Lote
2. Criar novo lote via formulário
3. Vincular lote a produção de óleo
4. Visualizar rastreabilidade completa
5. Validar receita na fila
6. Ver logs de auditoria

### Estados Obrigatórios
Cada página principal deve ter **4 estados implementados**:
1. **Vazio**: EmptyState com ilustração + CTA
2. **Carregando**: LoadingState com Skeleton
3. **Preenchido**: Dados reais exibidos
4. **Erro**: ErrorState com retry

---

## Dependências Adicionais

Instalar se necessário:
- `zod` - validação de schemas
- `@hookform/resolvers` - integração zod + react-hook-form
- `@xyflow/react` - (opcional) se usar React Flow para rastreabilidade
- `react-window` - (opcional) se precisar virtualização em tabelas grandes

---

## Ordem de Execução

1. **Fundação**: Design system + layout + rotas + componentes compartilhados básicos
2. **Relatórios**: Dashboard + gráficos (valida design rapidamente)
3. **Cultivo**: CRUD completo + timeline
4. **Produção**: Rastreabilidade + estoque
5. **Interação Médico**: Validação + chat
6. **RH**: Calendário + documentos
7. **Configurações**: Permissões + logs
8. **Refinamento**: Responsividade + performance + documentação
