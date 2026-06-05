# Bibliotecas integradas

Curadoria das bibliotecas mais úteis do ecossistema Vue 3 instaladas neste projeto.

## Já presentes (core)

| Lib                          | Uso                                       |
| ---------------------------- | ----------------------------------------- |
| `vue` 3.5                    | Framework                                 |
| `vue-router` 4               | SPA routing (15 rotas + guards de auth)   |
| `pinia` + `persistedstate`   | State (6 stores: auth/cultivo/...)        |
| `@vueuse/core`               | Composition utilities                     |
| `axios`                      | HTTP client com interceptor JWT           |
| `vue-chartjs` + `chart.js`   | Gráficos (Dashboard)                      |
| `vee-validate` + `zod`       | Validação de formulários                  |
| `vue-sonner`                 | Toast notifications                       |
| `reka-ui`                    | Primitives acessíveis (base shadcn-vue)   |
| `lucide-vue-next`            | Ícones                                    |
| `tailwindcss` 3.4            | Estilo                                    |
| `vitest` + `@vue/test-utils` | Unit / component tests                    |

## Adicionadas nesta rodada

| Lib                            | Por quê                                                             |
| ------------------------------ | ------------------------------------------------------------------- |
| `@tanstack/vue-query`          | Server-state com cache, invalidação e mutations — substitui o loading/error manual dos stores em chamadas de API. Stores Pinia ficam para estado local de UI. |
| `vue-i18n` 10                  | Internacionalização pt-BR como default; extensível para EN futuro. Strings em `src/plugins/i18n.ts`. |
| `vite-plugin-vue-devtools`     | DX em dev — inspector inline de componentes, router, pinia.         |
| `vue-virtual-scroller`         | Listas grandes (Rastreabilidade, fila de validação com muitos itens). |
| `@playwright/test`             | E2E. Config em `playwright.config.ts`, smoke test em `tests/e2e/`.  |

## Rejeitadas (e por quê)

- **Headless UI Vue** — redundante com `reka-ui` (mesma proposta de primitives sem estilo).
- **Vue ECharts** — `chart.js` já cobre os tipos de gráfico do dashboard.
- **Vuetify / Element Plus / PrimeVue / Quasar / Ant Design Vue / Naive UI / Vant** — frameworks completos de UI conflitariam com o sistema visual Tailwind + shadcn-vue exigido pelo CannaSYS.
- **Storybook** — overhead alto; usar dev server + DevTools cobre o caso.
- **VitePress** — docs arquiteturais já vivem em `docs/` markdown; não precisa de site estático.
- **Swiper / Tiptap / Ionic / TanStack Query React-only / VueFire** — fora do escopo (mobile/editor/Firebase/carousel não fazem parte do produto).
