# ADR 0002 — Migração React → Vue 3 (Composition API)

| Campo    | Valor                                                                |
| -------- | -------------------------------------------------------------------- |
| ID       | 0002                                                                 |
| Status   | Aceito                                                               |
| Data     | 2026-06-05                                                           |
| Autor    | Equipe CannaSYS                                                      |
| Decisão  | Reescrever a SPA do CannaSYS de **React 18 + TSX** para **Vue 3 + Composition API + `<script setup lang="ts">`**, preservando módulos e UX. |

## Contexto

A versão atual da SPA (em `Replicate Design/`) foi entregue por um designer em React, mas o stack interno declarado (e o roadmap de contratação) é Vue. Manter dois stacks de UI fragmentaria o time e dobraria o custo cognitivo. Os módulos de UI já foram modelados (Login, Dashboard, Cultivo, Produção, Interação, RH, Configurações) e a parte difícil — paleta, fluxos, estados — está validada; só falta o framework.

Métricas alvo:
- Tempo de migração ≤ 5 dias de 1 dev
- 100% das telas com 4 estados (vazio/loading/preenchido/erro)
- Zero regressões visuais perceptíveis (paridade Figma)
- `vue-tsc --noEmit` com 0 erros

## Decisão

| Componente React        | Substituto Vue                              | Modelo                          | Justificativa                            |
| ----------------------- | ------------------------------------------- | ------------------------------- | ---------------------------------------- |
| TSX + hooks             | SFC `.vue` com `<script setup lang="ts">`   | Composition API                 | Reatividade fina, melhor TS              |
| React Router 7          | Vue Router 4                                | History mode + guards Pinia     | Oficial, idiomas similares               |
| Context + useState      | Pinia 2                                     | Store por bounded context       | DevTools, persistência, oficial          |
| react-hook-form         | vee-validate 4 + zod                        | Schema-based                    | Compartilha zod com backend futuro       |
| Recharts                | vue-chartjs + chart.js                      | Wrapper Vue de chart.js          | Cobre 100% dos gráficos do dashboard     |
| shadcn/ui (Radix React) | shadcn-vue (Reka UI)                        | Copy-paste primitives           | Mesma filosofia, acessibilidade WCAG AA  |
| Sonner                  | vue-sonner                                  | Port direto                     | API quase idêntica                       |
| Lucide React            | lucide-vue-next                             | Port direto                     | Mesmos ícones                            |

## Alternativas consideradas

### A. Manter React 18
- ✅ Zero retrabalho de UI
- ❌ Conflito com stack do time (custo de contratação ↑)
- ❌ Ecossistema interno de skills (i18n, padrões) é Vue
- **Rejeitada**: o ganho de curto prazo perde no horizonte de 6 meses

### B. Migrar para Vue 2 + Options API
- ✅ Mais conhecido por devs juniores
- ❌ Vue 2 em modo manutenção desde dez/2023
- ❌ TS DX inferior, sem `<script setup>`
- **Rejeitada**: começar com tecnologia em EOL é dívida técnica fundada

### C. SvelteKit / SolidJS
- ✅ Performance superior em métricas micro
- ❌ Ecossistema imaturo para ERP (forms, charts, tabelas)
- ❌ Recrutamento ainda mais difícil
- **Rejeitada**: troca-se um problema por outro

## Justificativa

Martin (*Clean Architecture*, cap. 27) ensina que **a UI é detalhe** — trocar o framework não exige tocar regras de negócio. Bass/Clements/Kazman (*Software Architecture in Practice*, 4ª ed., cap. 12) tratam **portabilidade** e **manutenibilidade** como atributos de qualidade táticos: encapsular a UI atrás de stores e contratos permite essa troca a custo limitado. Atende ISO 25010 §4.5 (Manutenibilidade — Modificabilidade) e §4.4 (Compatibilidade — Interoperabilidade com o backend Node existente, intocado).

## Consequências

**Positivas:**
- Stack unificado para o time
- `<script setup>` reduz LOC em ~30% vs hooks React equivalentes
- DevTools com inspeção de stores Pinia + Vue Router out-of-the-box

**Trade-offs aceitos:**
- 3–5 dias de migração com possíveis pequenas regressões visuais
- Necessidade de portar manualmente componentes não cobertos por shadcn-vue (mapeado em `LIBRARIES.md`)
- Time precisa reaprender padrões idiomáticos Vue (slot, defineProps/Emits)

## Referências

- Martin, R. *Clean Architecture*, Pearson, 2017, cap. 27
- Bass, Clements, Kazman. *Software Architecture in Practice*, 4ª ed., Addison-Wesley, 2021, cap. 12
- ISO/IEC 25010:2011 — Manutenibilidade
- [Vue 3 docs — Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [shadcn-vue](https://www.shadcn-vue.com/)
