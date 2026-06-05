# ADR 0001 — Monorepo backend + frontend em `restapi-cannays`

| Campo    | Valor                                                         |
| -------- | ------------------------------------------------------------- |
| ID       | 0001                                                          |
| Status   | Aceito                                                        |
| Data     | 2026-06-05                                                    |
| Autor    | Equipe CannaSYS                                               |
| Decisão  | Manter backend Node/Express e frontend Vue 3 no **mesmo repositório**, em pastas `backend/` (ou `src/` atual) e `frontend/`. |

## Contexto

O CannaSYS é um ERP de cadeia única (cultivo → produção → dispensação → paciente) onde rastreabilidade exige consistência forte entre contratos de API e UI. O time é pequeno (≤5 devs full-stack), ciclos de release semanais, e cada mudança de contrato pede coordenação simultânea entre os dois lados. Não há ainda squad dedicado a frontend nem a backend.

Restrições: budget de infra dev ≤ USD 300/mês; equipe ainda não opera CI matricial; types de domínio (`CultivoLote`, `Receita`, `FrascoOleo`) precisam ser declarados uma vez e consumidos nos dois lados.

## Decisão

**Monorepo** com workspaces pnpm:

| Componente   | Pasta             | Tecnologia              | Modelo                       | Justificativa                                |
| ------------ | ----------------- | ----------------------- | ---------------------------- | -------------------------------------------- |
| API REST     | `backend/` ou `src/` | Node 20 + Express + Sequelize + TS | Monolito modular por bounded context | Stack já em produção, baixa fricção          |
| SPA          | `frontend/`       | Vue 3 + Vite + Pinia + TS | Composition API por contexto | Reuso de types, ciclo de build paralelo      |
| Contratos    | `packages/contracts/` (futuro) | TS puro | Pacote compartilhado         | Garantia de paridade de tipos                |
| Pipelines    | raiz              | GitHub Actions          | Matriz (backend / frontend)  | Trigger seletivo por path                    |

## Alternativas consideradas

### A. Polyrepo (repos separados)
- ✅ Deploy 100% independente
- ✅ Ownership claro quando há squads dedicadas
- ❌ Coordenação manual de contratos → fonte de bugs de rastreabilidade
- ❌ Setup local em 2 passos (clonar 2 repos)
- **Rejeitada**: o ganho de independência não compensa o custo de sincronização em time pequeno

### B. Monolito clássico (frontend servido pelo Express)
- ✅ Um único deploy
- ❌ Frontend acoplado a release backend
- ❌ Build do Vite preso ao ciclo Node
- **Rejeitada**: anula a vantagem da SPA com CDN

### C. Monorepo com Nx/Turborepo
- ✅ Cache de build, grafo de dependências, generators
- ❌ Ferramenta extra para o time aprender
- ❌ Overhead em projeto < 5 pacotes
- **Rejeitada agora**, reavaliar quando passar de 4 pacotes

## Justificativa

Atende ao atributo de qualidade **manutenibilidade** (ISO 25010 §4.5.2 — modificabilidade e reusabilidade): types compartilhados eliminam classes inteiras de bug de contrato. Martin (*Clean Architecture*, cap. 16) defende que o limite arquitetural relevante é entre regras de negócio e detalhes — backend e frontend são "detalhes" e podem coabitar sem violar limites. Newman (*Building Microservices*, cap. 5) aceita monorepo para times pequenos como precursor saudável de microsserviços futuros.

## Consequências

**Positivas:**
- Refactor cross-stack em um PR
- Onboarding em 1 `pnpm install` na raiz
- Setup uniforme de lint/format

**Trade-offs aceitos:**
- Pipeline raiz precisa filtrar por path (`paths-filter`) para não rodar build do frontend em PR só-backend
- Repositório cresce mais rápido (≈2x); imposto leve até passar de 200k LOC

## Referências

- Martin, R. *Clean Architecture*, Pearson, 2017, cap. 16
- Newman, S. *Building Microservices*, 2ª ed., O'Reilly, 2021, cap. 5
- ISO/IEC 25010:2011 — atributo de qualidade Manutenibilidade
- [Monorepo.tools](https://monorepo.tools/) — comparação de ferramentas
