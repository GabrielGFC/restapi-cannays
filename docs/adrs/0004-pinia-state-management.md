# ADR 0004 — Pinia + persistedstate para estado local; TanStack Query para server-state

| Campo    | Valor                                                                  |
| -------- | ---------------------------------------------------------------------- |
| ID       | 0004                                                                   |
| Status   | Aceito                                                                 |
| Data     | 2026-06-05                                                             |
| Autor    | Equipe CannaSYS                                                        |
| Decisão  | **Pinia** para estado local de UI/sessão (com `persistedstate` para auth/preferências); **@tanstack/vue-query** para estado de servidor (cache, mutations, invalidação). |

## Contexto

O CannaSYS tem dois tipos distintos de estado:

1. **Local (UI/sessão)**: token JWT, perfil do usuário, sidebar colapsada, filtros temporários. Vive entre páginas, precisa de persistência seletiva.
2. **Servidor (lista de lotes, fila de receitas, estoque)**: pertence ao backend, precisa de cache, invalidação coordenada, refetch após mutação, optimistic updates.

Misturar os dois em uma única store gera bugs clássicos (stale data, loading espalhado, refetches em cascata) e foi a origem do anti-padrão "Redux gigante" em projetos React no time.

## Decisão

| Tipo de estado            | Tech                       | Modelo                            | Persistência         |
| ------------------------- | -------------------------- | --------------------------------- | -------------------- |
| Auth (token, user)        | Pinia + persistedstate     | `defineStore('auth', setup)`      | localStorage          |
| Preferências UI           | Pinia + persistedstate     | `defineStore('config', setup)`    | localStorage          |
| Lista lotes/produções/etc | TanStack Vue Query         | `useQuery` + `useMutation`        | Memory cache + stale  |
| Fila de validação         | TanStack Vue Query         | `useQuery` com `refetchInterval`  | Memory cache          |
| Forms temporários         | `ref()` local + vee-validate | Composition API direta            | Nenhuma               |

Stores Pinia ficam **finos** — só estado local. Composables `useXxxQuery.ts` cuidam de I/O.

## Alternativas consideradas

### A. Pinia para tudo (server-state inclusive)
- ✅ Uma única abstração
- ❌ Reinventa cache (TTL, invalidação, deduplicação manual)
- ❌ Cada store carrega loading/error duplicados
- **Rejeitada**: é o que estávamos fazendo nos stores iniciais; refatoramos para vue-query

### B. Vuex 4
- ❌ Em modo manutenção, recomendação oficial é Pinia
- **Rejeitada**

### C. TanStack Query para tudo (sem Pinia)
- ✅ Menos abstrações
- ❌ Token/user-session em queryClient é forçado
- ❌ Persistência de sessão fica artesanal
- **Rejeitada**: ferramenta errada para sessão

### D. URL como estado (nuqs equivalente)
- ✅ Shareable state
- ❌ Insuficiente para auth e cache de listas grandes
- **Não substitui Pinia/vue-query**, complementar; adotar oportunisticamente em filtros

## Justificativa

Bass/Clements/Kazman tratam **separação de concerns** como tática para modificabilidade (cap. 9). Server-state e client-state têm ciclos de vida e invariantes distintos — misturá-los viola **single responsibility**. Martin (*Clean Architecture*, cap. 8 — SRP) reforça. ISO 25010 §4.5.2 (Modificabilidade) e §4.5.3 (Reusabilidade) são atendidos: trocar o backend exige tocar só os composables `useXxxQuery`, não cada componente.

## Consequências

**Positivas:**
- Loading/error/refetch automático nas tabelas (Cultivo, Produção, Fila)
- Optimistic updates triviais nas mutações
- DevTools Pinia + DevTools vue-query coexistem

**Trade-offs aceitos:**
- Dois mental models em vez de um — onboarding pede 30 min de leitura
- vue-query adiciona ~14 kB gzip ao bundle
- Migrar stores iniciais (que faziam tudo) para o novo padrão é trabalho contínuo

## Referências

- Martin, R. *Clean Architecture*, cap. 8 (SRP)
- Bass, Clements, Kazman. *Software Architecture in Practice*, cap. 9
- ISO/IEC 25010:2011 — Manutenibilidade (Modificabilidade, Reusabilidade)
- [Pinia docs](https://pinia.vuejs.org/) · [TanStack Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview)
- TkDodo, "Practical React Query" — princípios aplicáveis 1:1 ao Vue
