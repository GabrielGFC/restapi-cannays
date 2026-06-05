# ADR 0003 — shadcn-vue (Reka UI) como sistema de componentes

| Campo    | Valor                                                  |
| -------- | ------------------------------------------------------ |
| ID       | 0003                                                   |
| Status   | Aceito                                                 |
| Data     | 2026-06-05                                             |
| Autor    | Equipe CannaSYS                                        |
| Decisão  | Usar **Reka UI** (primitives acessíveis) + padrão **shadcn-vue** (copy-paste) + **Tailwind CSS 3.4** como sistema de componentes. |

## Contexto

O Figma do CannaSYS exige paleta verde institucional, tipografia Inter e conformidade WCAG AA. Como ERP de saúde, **acessibilidade é requisito não-funcional duro**: leitores de tela, navegação por teclado, contraste 4.5:1, foco visível. O time não tem capacidade para implementar primitives acessíveis do zero (combobox, dialog, datepicker são notoriamente difíceis de acertar com ARIA).

Restrição adicional: o sistema visual deve ficar **idêntico em todos os 6 módulos novos e nos 6 já existentes no Figma**. Trocar de design system no meio mata isso.

## Decisão

| Camada              | Tech                     | Modelo                                  | Justificativa                              |
| ------------------- | ------------------------ | --------------------------------------- | ------------------------------------------ |
| Primitives          | reka-ui                  | Headless, sem estilo, WAI-ARIA          | Equivalente Vue do Radix React             |
| Padrão              | shadcn-vue               | Copy-paste para `components/ui/`        | Sem lock-in, customização total            |
| Estilo              | Tailwind 3.4             | Utility-first + tokens em `theme.css`   | Atalho consistente, tree-shake CSS         |
| Ícones              | lucide-vue-next          | SVG injetado como componente            | Mesma família, 0 fonte                     |
| Compositional helper| `cn()` (clsx + twMerge)  | Util `lib/utils.ts`                     | Conflitos de classes resolvidos            |

## Alternativas consideradas

### A. Vuetify 3
- ✅ Material Design pronto, ecossistema rico
- ❌ Tema fechado — clonar paleta verde institucional do Figma exige overrides extensos
- ❌ Bundle ~300 kB gzip
- **Rejeitada**: identidade visual do Figma é prioridade

### B. PrimeVue
- ✅ 90+ componentes prontos
- ❌ Estilo padrão destoa do Figma
- ❌ API menos idiomática Vue 3 (legado PrimeFaces)
- **Rejeitada**

### C. Quasar
- ✅ Componentes + CLI integrada
- ❌ Escopo demais (PWA/Electron/SSR) para projeto SPA puro
- ❌ Aprendizado extra
- **Rejeitada por sobrescopo**

### D. Element Plus / Naive UI / Ant Design Vue
- ✅ Bem-mantidos
- ❌ Estética asiática-corporativa, custo de re-tematização alto
- **Rejeitadas**

## Justificativa

Bass/Clements/Kazman tratam **modificabilidade visual** como atributo tático (cap. 9): encapsular tokens em CSS variables (`theme.css`) e migrar dark-mode/rebranding sem tocar componentes. O padrão shadcn (copy-paste, código entra no repo) elimina **dependência transitiva de breaking changes** em upgrade — Hohpe/Woolf descrevem isso como redução de **shared mutable state** entre app e lib (analogia EIP). Atende ISO 25010 §4.6 (Acessibilidade) e §4.5 (Modificabilidade).

## Consequências

**Positivas:**
- Acessibilidade WCAG AA built-in via Reka UI (ARIA correta)
- Customização sem lutar contra `!important`
- Tree-shaking do Tailwind mantém CSS < 30 kB gzip em prod

**Trade-offs aceitos:**
- Mais código no repo (cada primitive copiado entra em `components/ui/`)
- Updates de shadcn-vue precisam ser re-aplicados manualmente em componentes já customizados
- Time precisa entender Tailwind (curva curta)

## Referências

- Bass, Clements, Kazman. *Software Architecture in Practice*, 4ª ed., cap. 9
- Hohpe, Woolf. *Enterprise Integration Patterns*, Addison-Wesley, 2003, cap. introdutório (sobre acoplamento)
- ISO/IEC 25010:2011 — Acessibilidade, Modificabilidade
- WCAG 2.1 AA — [w3.org/TR/WCAG21](https://www.w3.org/TR/WCAG21/)
- [shadcn-vue](https://www.shadcn-vue.com/) · [reka-ui](https://reka-ui.com/)
