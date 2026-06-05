# ADR 0005 — Monolito modular por bounded contexts

| Campo    | Valor                                                                  |
| -------- | ---------------------------------------------------------------------- |
| ID       | 0005                                                                   |
| Status   | Aceito                                                                 |
| Data     | 2026-06-05                                                             |
| Autor    | Equipe CannaSYS                                                        |
| Decisão  | Adotar **monolito modular** com 6 bounded contexts (Cultivo, Produção, RH, Interação Médico-Farmacêutico, Configurações, Autenticação). Adiar microsserviços até dor real (>1 squad ou >1 ciclo de deploy diário). |

## Contexto

O CannaSYS é uma cadeia de rastreabilidade end-to-end: cada frasco dispensado precisa ser rastreável até o lote de cultivo de origem, em conformidade com ANVISA. Essa propriedade é uma **invariante cross-contexto** — Cultivo, Produção, Estoque e Dispensação são contextos diferentes, mas precisam falar uma língua comum.

Time: ≤5 devs. Carga inicial: ≤500 pacientes ativos, ≤50 RPS, ≤100 GB de dados. Não há equipe de plataforma para operar 6 deploys independentes.

Não-funcionais:
- Disponibilidade ≥ 99.5%
- p95 < 300ms na fila de validação
- Rastreabilidade auditável (LGPD/ANVISA)

## Decisão

| Bounded Context     | Pasta backend                  | Pasta frontend            | Comunicação                |
| ------------------- | ------------------------------ | ------------------------- | -------------------------- |
| Autenticação        | `backend/src/modules/auth/`    | `views/auth/`             | REST síncrono              |
| Cultivo             | `backend/src/modules/cultivo/` | `views/cultivo/`          | REST síncrono              |
| Produção            | `modules/producao/` *(a criar)* | `views/producao/`        | REST síncrono + evento     |
| RH                  | `modules/rh/`                  | `views/rh/`               | REST síncrono              |
| Interação Med-Farm  | `modules/interacao/`           | `views/interacao/`        | REST síncrono              |
| Configurações       | `modules/configuracoes/`       | `views/configuracoes/`    | REST síncrono              |

**Regras de contorno:**
- Cada módulo expõe seu router em `modules/<x>/<x>.routes.ts` e nada mais
- Nenhum módulo importa diretamente o `repo` de outro — comunicação via service público ou evento
- Eventos cross-contexto (`LoteColhido` → cria `Producao` rascunho) usam fila in-memory hoje, migrável para SQS sem reescrita

## Alternativas consideradas

### A. Microsserviços desde o dia 1
- ✅ Escala independente por contexto
- ❌ Operação fica inviável com 5 devs (6 deploys, 6 dashboards, distributed tracing obrigatório)
- ❌ Latência de rede entre serviços > ganho de modularidade nessa escala
- **Rejeitada**: complexidade prematura. Newman (*Building Microservices*, cap. 3): "se você não consegue manter um monolito modular, não vai conseguir manter microsserviços"

### B. Monolito não-modular (tudo em controllers planos)
- ✅ Simplicidade extrema
- ❌ Em 6 meses vira big ball of mud — impossível mover Produção para fora depois
- **Rejeitada**

### C. Serverless por endpoint (Lambda function-per-route)
- ✅ Cobrança por uso
- ❌ Cold start prejudica p95
- ❌ Sequelize + connection pooling sofre em Lambda sem RDS Proxy
- **Rejeitada** para esta fase

## Justificativa

Newman (*Building Microservices*, cap. 3) defende monolito modular como **etapa zero saudável** antes de microsserviços. Martin (*Clean Architecture*, cap. 15) diferencia limites arquiteturais de processos: módulos com fronteira bem-desenhada são **microsserviços em potencial**, prontos para extração quando o custo de coordenação superar o ganho de isolamento. Bass/Clements/Kazman (cap. 13) tratam **performance + custo operacional** como atributos antagônicos a serem balanceados — escolhemos a métrica certa para a fase.

Atende ISO 25010 §4.5 (Manutenibilidade — Modularidade), §4.7 (Confiabilidade — Disponibilidade 99.5%), §4.8 (Eficiência de desempenho — p95 < 300ms factível em monolito Node + RDS).

## Consequências

**Positivas:**
- 1 deploy, 1 dashboard, 1 pool de logs — operável por um único dev oncall
- Transações ACID entre contextos quando necessário (lote → produção)
- Path-to-microservices preservado: cada módulo já tem fronteira clara

**Trade-offs aceitos:**
- Picos em um contexto afetam outros (mitigação: queues internas + circuit breakers)
- Banco compartilhado — refactor de schema exige coordenação (Sequelize migrations resolvem)
- Sem isolamento de runtime; um memory leak em um módulo derruba o resto (mitigação: ECS auto-heal + alarms)

## Referências

- Newman, S. *Building Microservices*, 2ª ed., cap. 3 e 5
- Martin, R. *Clean Architecture*, cap. 15
- Bass, Clements, Kazman. *Software Architecture in Practice*, 4ª ed., cap. 13
- Fowler, M. — [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)
- ISO/IEC 25010:2011 — Manutenibilidade, Confiabilidade, Eficiência
