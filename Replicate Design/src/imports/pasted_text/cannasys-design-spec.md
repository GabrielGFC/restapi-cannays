🌿 CannaSYS
Especificação de Design para Novos Módulos
Sistema ERP para Associações de Cannabis Medicinal

Documento destinado ao Designer Sênior responsável pela criação
dos 6 módulos ausentes no Figma.

Versão 1.0  |  Junho 2026
 
Sumário
•	1. Visão Geral do Projeto
•	2. Design System — Referência Obrigatória
•	3. Módulo 1 · Cultivo
•	4. Módulo 2 · Produção de Óleo
•	5. Módulo 3 · Recursos Humanos
•	6. Módulo 4 · Interação Médico-Farmacêutico
•	7. Módulo 5 · Relatórios / Analytics
•	8. Módulo 6 · Configurações do Sistema
•	9. Requisitos Transversais
•	10. Entregáveis Esperados
 
1. Visão Geral do Projeto
O CannaSYS é um sistema ERP web desenvolvido em Vue.js, voltado para associações sem fins lucrativos que gerenciam terapias com cannabis medicinal no Brasil. O sistema cobre toda a cadeia operacional — do cultivo da planta até a dispensação ao paciente — garantindo rastreabilidade completa e integração entre os setores médico, farmacêutico e administrativo.

Perfis de Usuário
Perfil	Responsabilidades principais
Paciente	Acessa prontuário, histórico de receitas e dispensações
Médico	Prescreve, acompanha prontuário, interage com farmacêutico
Farmacêutico	Valida receitas, controla produção e dispensação
Administrador	Gestão financeira, RH, relatórios e configurações

Módulos Existentes no Figma (referência)
Os módulos abaixo já possuem design aprovado. Todos os novos módulos devem ser INDISTINGUÍVEIS visualmente destes:
•	Login / Autenticação
•	Dashboard
•	Prontuário do Paciente
•	Receituário
•	Dispensação
•	Financeiro
Módulos a Criar (escopo deste documento)
•	Cultivo
•	Produção de Óleo
•	Recursos Humanos
•	Interação Médico-Farmacêutico
•	Relatórios / Analytics
•	Configurações do Sistema
 
2. Design System — Referência Obrigatória
Antes de criar qualquer tela nova, analise os módulos existentes no Figma e extraia formalmente o design system implícito. Os itens abaixo são diretrizes esperadas — confirme e ajuste a partir das telas reais.
Paleta de Cores Sugerida
Nome	Hex	Uso
Primária Escura	#1A5C38	Cabeçalhos, botões primários, ícones principais
Primária Média	#2E7D4F	Links, bordas de destaque, badges
Primária Clara	#D6EAD8	Fundos de seção, linhas de tabela alternadas
Cinza Texto	#333333	Corpo de texto principal
Cinza Linha	#E8E8E8	Divisores, bordas de tabela
Branco	#FFFFFF	Fundo geral, cards
Alerta / Atenção	#F59E0B	Badges de pendência, alertas
Erro	#DC2626	Erros de validação, alertas críticos
Sucesso	#16A34A	Confirmações, status ativo

Tipografia
Família: Inter ou similar (sans-serif humanista)
Título H1: 24px / Bold
Título H2: 18px / Semibold
Título H3: 14px / Semibold
Corpo: 14px / Regular
Caption / Label: 12px / Regular ou Medium

Componentes Base Obrigatórios
Estes componentes devem estar documentados no design system e ser reutilizados em todos os módulos:
•	Sidebar de navegação (com ícone + label, estado ativo/hover/colapsado)
•	Header global (breadcrumb, avatar, notificações)
•	Botão primário, secundário, ghost e destrutivo
•	Input de texto, select, datepicker, textarea
•	Modal de confirmação (ação irreversível)
•	Toast de feedback (sucesso, erro, aviso, informação)
•	Tabela com paginação, ordenação e filtro
•	Card de resumo (KPI / métrica)
•	Badge de status (ativo, pendente, inativo, erro)
•	Skeleton loader (estado de carregamento)
•	Estado vazio (ilustração + texto + CTA)
•	Formulário de cadastro com validação inline
 
3. Módulo 1 · Cultivo 🌱
Gerencia o ciclo de vida dos lotes de cultivo desde o plantio até a colheita. A rastreabilidade de cada lote é crítica: cada lote originará um ou mais lotes de produção de óleo.
Telas do Módulo
Tela	Descrição	Perfis
Lista de Lotes	Tabela com todos os lotes ativos e históricos, filtros por status e data	Admin, Farmacêutico
Detalhe do Lote	Linha do tempo do lote, insumos utilizados, responsável, etapa atual	Admin, Farmacêutico
Cadastro de Lote	Formulário: espécie, data de plantio, responsável, observações	Admin
Registro de Etapa	Modal: informar transição de etapa (vegetativo → floração → colheita)	Admin, Farmacêutico
Controle de Insumos	Sub-tela dentro do detalhe: registro de substrato, nutrientes, EPIs	Admin

Fluxo Principal
•	1. Administrador acessa Lista de Lotes
•	2. Clica em 'Novo Lote' → abre modal/formulário de Cadastro
•	3. Lote criado aparece na lista com status 'Plantio'
•	4. Ao longo do tempo, responsável registra transições de etapa
•	5. Ao atingir 'Colheita', lote fica disponível para o Módulo de Produção
•	6. Lote concluído passa para histórico
Estados Obrigatórios — Lista de Lotes
Estado	Comportamento esperado
Vazio	Ilustração + mensagem orientativa + botão de ação principal
Carregando	Skeleton loader no lugar das linhas/cards
Preenchido	Dados reais com todas as interações habilitadas
Erro	Banner de erro + botão 'Tentar novamente'

Campos do Formulário de Cadastro
Campo	Tipo	Validação
Espécie / Cultivar	Text	Obrigatório
Data de Plantio	DatePicker	Obrigatório
Responsável	Select (usuários)	Obrigatório
Quantidade de Plantas	Number	Obrigatório
Local de Cultivo	Text / Select	Obrigatório
Observações	Textarea	Opcional

 
4. Módulo 2 · Produção de Óleo 🧪
Registra o processo de extração do óleo a partir dos lotes colhidos. Controla o estoque de óleo produzido e mantém rastreabilidade completa do frasco até o lote de cultivo de origem.
Telas do Módulo
Tela	Descrição	Perfis
Lista de Produções	Tabela de todas as produções com lote vinculado, data, volume e status	Admin, Farmacêutico
Detalhe da Produção	Informações completas: lote origem, método, rendimento, frascos gerados	Admin, Farmacêutico
Cadastro de Produção	Formulário vinculado a lote colhido; método de extração, data, responsável	Admin, Farmacêutico
Estoque de Óleo	Visão consolidada de frascos disponíveis, validade, rastreabilidade	Admin, Farmacêutico
Rastreabilidade	Visualização em linha do tempo: lote → produção → frascos → dispensações	Admin

Rastreabilidade — Elemento Crítico de UX
A tela de rastreabilidade é um diferencial do sistema. O designer deve propor uma visualização clara que mostre a cadeia completa:
•	Lote de Cultivo (espécie, data, responsável)
•	↓  Produção (método, rendimento, data)
•	↓  Frascos gerados (código, volume, validade)
•	↓  Dispensações (paciente, data, quantidade)
Sugestão: timeline vertical ou diagrama de fluxo horizontal com cards clicáveis que expandem detalhes.
Estados Obrigatórios — Estoque de Óleo
Estado	Comportamento esperado
Vazio	Ilustração + mensagem orientativa + botão de ação principal
Carregando	Skeleton loader no lugar das linhas/cards
Preenchido	Dados reais com todas as interações habilitadas
Erro	Banner de erro + botão 'Tentar novamente'
Estoque crítico	Banner de alerta amarelo quando volume total cai abaixo do threshold configurável

 
5. Módulo 3 · Recursos Humanos 👥
Gerencia colaboradores e voluntários da associação. Controla funções, escalas de disponibilidade e registro de atividades realizadas.
Telas do Módulo
Tela	Descrição	Perfis
Lista de Membros	Tabela com foto, nome, função, status (ativo/inativo) e ações rápidas	Admin
Perfil do Membro	Dados pessoais, função, documentos, histórico de atividades	Admin
Cadastro de Membro	Formulário completo com upload de documentos	Admin
Escala / Disponibilidade	Calendário ou grade semanal com disponibilidade por membro	Admin
Registro de Atividade	Modal para lançar atividade realizada: tipo, data, duração, observação	Admin

Tipos de Membro
•	Colaborador remunerado
•	Voluntário
•	Médico conveniado
•	Farmacêutico
•	Administrador
Estados Obrigatórios — Lista de Membros
Estado	Comportamento esperado
Vazio	Ilustração + mensagem orientativa + botão de ação principal
Carregando	Skeleton loader no lugar das linhas/cards
Preenchido	Dados reais com todas as interações habilitadas
Erro	Banner de erro + botão 'Tentar novamente'

 
6. Módulo 4 · Interação Médico-Farmacêutico 🩺
Central de comunicação e validação entre médicos prescritores e farmacêuticos. Garante que cada receita seja revisada, aprovada ou questionada antes da dispensação.
Telas do Módulo
Tela	Descrição	Perfis
Fila de Validação	Lista de receitas aguardando revisão farmacêutica, ordenadas por urgência	Farmacêutico
Revisão de Receita	Visão lado a lado: receita do médico + campo de validação farmacêutica	Farmacêutico, Médico
Histórico de Interações	Thread de mensagens entre médico e farmacêutico por paciente	Médico, Farmacêutico
Alertas Clínicos	Lista de contraindicações e interações detectadas automaticamente	Médico, Farmacêutico
Detalhes do Paciente	Resumo do prontuário acessível durante a revisão (read-only)	Médico, Farmacêutico

Fluxo de Validação
•	1. Médico emite receita → aparece na fila do farmacêutico
•	2. Farmacêutico abre a receita → sistema verifica contraindicações automaticamente
•	3. Se houver alerta → badge vermelho + notificação ao médico
•	4. Farmacêutico pode Aprovar, Solicitar ajuste ou Rejeitar com justificativa
•	5. Médico recebe notificação e pode responder na thread
•	6. Receita aprovada → disponível para dispensação
Estados da Receita (badges)
Status	Cor	Significado
Aguardando revisão	Amarelo	Receita enviada, não revisada
Em análise	Azul	Farmacêutico abriu a receita
Aprovada	Verde	Pronta para dispensação
Ajuste solicitado	Laranja	Farmacêutico pediu revisão ao médico
Rejeitada	Vermelho	Não será dispensada — requer nova prescrição

 
7. Módulo 5 · Relatórios / Analytics 📊
Painel de indicadores estratégicos e relatórios operacionais. Permite ao gestor visualizar o desempenho geral da associação e exportar dados para prestação de contas.
Telas do Módulo
Tela	Descrição	Perfis
Dashboard de Indicadores	Cards KPI + gráficos com filtros por período e módulo	Admin
Relatório de Pacientes	Ativos, novos no período, por condição médica, por status	Admin, Médico
Relatório de Produção	Volume produzido por mês, por espécie, rendimento médio	Admin, Farmacêutico
Relatório de Dispensação	Quantidade dispensada, por paciente, por produto, por período	Admin, Farmacêutico
Relatório Financeiro	Receitas x despesas, inadimplência, projeções	Admin
Rastreabilidade Completa	Relatório de cadeia: cultivo → produção → dispensação → paciente	Admin
Exportação	Modal de configuração de exportação em PDF ou Excel	Admin

KPIs do Dashboard Principal
•	Total de pacientes ativos
•	Novas adesões no mês
•	Receitas pendentes de validação
•	Volume de óleo disponível em estoque (mg)
•	Dispensações realizadas no mês
•	Lotes em cultivo ativos
•	Receita financeira do mês vs meta
•	Inadimplência (%)
Tipos de Gráfico Esperados
Tipo	Uso
Linha	Evolução de pacientes ativos ao longo do tempo
Barras	Comparativo de dispensações por mês
Pizza / Donut	Distribuição de pacientes por condição médica
Barras empilhadas	Volume de produção por espécie ao longo dos meses
Tabela detalhada	Rastreabilidade completa com drill-down

 
8. Módulo 6 · Configurações do Sistema ⚙️
Área restrita ao Administrador para gerenciar usuários, permissões, dados da associação e parâmetros globais do sistema.
Telas do Módulo
Tela	Descrição	Perfis
Dados da Associação	Nome, CNPJ, endereço, logo, contatos oficiais	Admin
Gestão de Usuários	Lista de todos os usuários do sistema com perfil e status	Admin
Permissões por Perfil	Matriz de permissões: perfil × funcionalidade (leitura/escrita/negar)	Admin
Notificações	Configuração de alertas por e-mail/in-app: quais eventos geram alerta	Admin
Integrações	Configuração de APIs externas (ex.: pagamento, fornecedores)	Admin
Logs de Auditoria	Tabela de todas as ações do sistema com usuário, data e ação	Admin
Backup e Segurança	Configurações de backup, autenticação 2FA, sessões ativas	Admin

Matriz de Permissões — Estrutura Esperada
A tela de permissões deve apresentar uma grade/tabela onde as linhas são os módulos do sistema e as colunas são os perfis de usuário. Cada célula deve conter um controle toggle ou select com as opções:
•	Sem acesso
•	Somente leitura
•	Leitura e escrita
•	Acesso completo (incluindo exclusão)
Log de Auditoria — Campos
Campo	Descrição
Data/Hora	Timestamp preciso da ação
Usuário	Nome + perfil de quem executou
Ação	Tipo: criação, edição, exclusão, login, exportação
Módulo	Qual módulo foi afetado
Registro afetado	ID do registro (quando aplicável)
IP	Endereço IP da sessão

 
9. Requisitos Transversais
Responsividade
Desktop: Layout principal — sidebar fixa, conteúdo ocupa o restante
Tablet (≥768px): Sidebar colapsável para ícones, tabelas com scroll horizontal
Mobile: Fora do escopo desta versão

Acessibilidade
•	Contraste mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
•	Foco visível em todos os elementos interativos
•	Labels explícitas em todos os campos de formulário
•	Mensagens de erro descritivas (não apenas cor)
Navegação e Consistência
•	Sidebar com ícone + label para cada módulo; estado ativo claramente indicado
•	Breadcrumb em todas as telas de detalhe
•	Ações destrutivas (excluir, rejeitar) exigem modal de confirmação
•	Feedback de ação sempre via toast (não alert do browser)
Fluxos Críticos que exigem atenção especial
•	Emissão → validação → dispensação de receita (envolve 3 perfis e 3 módulos)
•	Cultivo → produção → estoque → dispensação (rastreabilidade completa)
•	Cadastro de paciente com associação automática a médico prescritor
•	Alteração de permissões de usuário (deve pedir confirmação e logar na auditoria)
 
10. Entregáveis Esperados
Entregável	Descrição
Design System atualizado	Tokens de cor, tipografia, espaçamento e biblioteca de componentes documentada no Figma
Telas dos 6 módulos	Todas as telas listadas neste documento, com todos os estados (vazio, carregando, preenchido, erro)
Protótipo navegável	Links entre telas cobrindo os fluxos principais de cada módulo
Anotações de handoff	Comportamentos interativos, regras de validação, transições e responsividade anotados no Figma para o dev Vue.js

Critérios de Aceite
•	Todos os módulos visualmente indistinguíveis dos existentes no Figma
•	Design system formal exportado com tokens nomeados
•	Prototipagem navegável cobre 100% dos fluxos principais
•	Nenhuma tela principal sem todos os 4 estados (vazio / carregando / preenchido / erro)
•	Handoff com anotações suficientes para o dev implementar sem perguntas de design
•	Acessibilidade WCAG AA verificada

CannaSYS · Documento de Especificação de Design · v1.0 · Junho 2026
