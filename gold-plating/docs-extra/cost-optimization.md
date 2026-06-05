# Cost Optimization — CannaSYS

## Estimativa mensal por ambiente (USD, sa-east-1)

### Dev — alvo USD 280/mês

| Recurso                         | Config                                      | USD/mês  |
| ------------------------------- | ------------------------------------------- | -------- |
| ECS Fargate Spot                | 1 task · 0.5 vCPU · 1 GB · ~70% spot saving | 12       |
| ALB                             | 1 ALB · baixo tráfego                       | 22       |
| RDS Postgres db.t4g.small       | single-AZ · 20 GB GP3                       | 38       |
| NAT Gateway                     | 1 NAT (não destruído)                       | 38       |
| S3 (SPA + docs)                 | < 5 GB                                      | 1        |
| CloudFront                      | 50 GB transfer                              | 5        |
| SQS                             | baixo volume                                | 1        |
| CloudWatch logs (30d retenção)  | ~3 GB ingest                                | 8        |
| Data transfer                   | misc                                        | 10       |
| Margem / surpresas              |                                             | 145      |
| **Total**                       |                                             | **~280** |

### Prod — alvo USD 850/mês (ano 1)

| Recurso                         | Config                                      | USD/mês  |
| ------------------------------- | ------------------------------------------- | -------- |
| ECS Fargate (on-demand, 2 tasks)| 1 vCPU · 2 GB · 24×7                        | 90       |
| ALB                             | tráfego maior, ~10M req                     | 35       |
| RDS db.t4g.medium Multi-AZ      | 50 GB GP3 + PITR 7d + snapshot CR           | 230      |
| NAT Gateway                     | 1 NAT                                       | 38       |
| S3 (SPA + docs + IA tier)       | ~50 GB                                      | 8        |
| CloudFront                      | 500 GB transfer                             | 45       |
| SQS                             | médio volume                                | 5        |
| CloudWatch (alarmes + logs)     | 30d                                         | 35       |
| SES                             | 50k e-mails                                 | 5        |
| Backup cross-region (snapshots) | semanal                                     | 15       |
| Data transfer egress            | ~200 GB                                     | 35       |
| Reserved instance discount      | RDS 1y no-upfront (-35%)                    | -80      |
| Compute Savings Plan            | Fargate 1y (-20%)                           | -18      |
| Margem / surpresas              |                                             | 207      |
| **Total**                       |                                             | **~850** |

## 5 estratégias aplicadas

### 1. Fargate Spot em dev
Tasks de dev em `FARGATE_SPOT` (até 70% desconto vs on-demand). Aceitável porque dev pode ter interrupção. Em prod fica `FARGATE` puro para SLA.

### 2. RDS Reserved Instance 1 ano (prod)
db.t4g.medium 1y no-upfront ≈ -35%. Em dev fica on-demand para flexibilidade (instance class pode mudar conforme aprendemos a carga).

### 3. S3 Intelligent-Tiering + Lifecycle
Documentos (laudos) movem para STANDARD_IA aos 30 dias, GLACIER aos 180. Reduz custo de storage em ~60% para arquivo morto.

### 4. CloudFront com TTL alto na SPA
SPA é estática (hashes nos assets). `default_ttl = 3600s`, `max_ttl = 86400s`. Reduz origin requests para < 1% do volume total.

### 5. Log retention 30 dias
CloudWatch logs em 30d (vs default infinito). Logs antigos vão para S3 via subscription filter se necessário, ~10x mais barato. Métricas custom limitadas a essenciais.

## Anti-padrões evitados

- ❌ **Multi-AZ em dev** — dobra custo RDS sem ganho operacional
- ❌ **NAT Gateway por AZ** — 1 NAT custa USD 38, 2 custam USD 76. Aceita-se o SPOF em dev/prod ano 1; revisita-se ao atingir 200 usuários ativos
- ❌ **CloudWatch logs sem retention** — cresce indefinidamente; conta de surpresa
- ❌ **Lambda + VPC sem RDS Proxy** — cold start + conexão lenta; usamos Fargate
- ❌ **Métricas custom sem dimensão limitada** — explosão de cardinalidade em CW

## Próximos cortes (quando aplicável)

| Quando atingir            | Cortar                                       | Economia est. |
| ------------------------- | -------------------------------------------- | ------------- |
| 100 usuários ativos       | Compute Savings Plan 3y                      | -30%          |
| 500 usuários ativos       | RDS Reserved 3y all-upfront                  | -55% sobre RDS|
| 1M req/mês CloudFront     | Negociar contrato AWS Enterprise             | -10% geral    |
| Logs > 100 GB/mês         | Migrar logs frios para S3 + Athena            | -70% sobre log|

## Acompanhamento

- Alarm `monthly-budget` em [alarms.tf](../terraform/alarms.tf) avisa em 100%
- Tags `Project`, `Environment`, `ManagedBy` em todos os recursos → Cost Explorer agrupa
- Revisão mensal: primeira segunda do mês, com `aws ce get-cost-and-usage`

## Referências

- AWS Well-Architected — Cost Optimization Pillar
- [AWS Pricing Calculator](https://calculator.aws/)
- [Last Week in AWS — Cost Insights](https://www.lastweekinaws.com/)
