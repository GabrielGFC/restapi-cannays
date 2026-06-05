# Chaos Engineering — Cenários CannaSYS

Filosofia: experimentos pequenos, hipóteses explícitas, métricas pré-acordadas. Inspirado em Netflix Chaos Engineering e Nygard (*Release It!*, cap. 5).

**Política**: rodar mensalmente em ambiente `staging`; nunca em `prod` sem game-day formal e aprovação do oncall.

---

## Cenário 1 — Failover de AZ no RDS

| Campo            | Valor                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| Hipótese         | A API continua respondendo com p95 < 1s durante e após o failover Multi-AZ |
| Falha injetada   | `aws rds reboot-db-instance --db-instance-identifier cannasys-prod-postgres --force-failover` |
| Métrica          | `TargetResponseTime` (p95) e `5XX_Count` no ALB durante janela de 5min  |
| Critério sucesso | p95 ≤ 1.5s no pico; 5xx-rate < 5%; retorno ao baseline em ≤ 90s         |
| Critério falha   | Indisponibilidade > 90s OU 5xx > 10%                                    |
| Mitigação        | Adicionar retry com backoff no Sequelize pool                            |
| Plano de rollback| Failover automático já restaura; manual: instance reboot                |

---

## Cenário 2 — Kill aleatório de task ECS

| Campo            | Valor                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| Hipótese         | A perda de 1 das 2 tasks Fargate não causa downtime visível ao usuário  |
| Falha injetada   | `aws ecs stop-task --cluster cannasys-prod-cluster --task <task-id>`    |
| Métrica          | `RunningTaskCount` + `HealthyHostCount` no target group                  |
| Critério sucesso | Task substituta `RUNNING` em ≤ 60s; 0 requests perdidas (drainage OK)   |
| Critério falha   | Nova task demora > 120s OU > 0.1% das requests caem com 5xx             |
| Mitigação        | Aumentar `desired_count` para 3 em prod                                  |
| Plano de rollback| ECS auto-recovery; manual: `update-service --desired-count`              |

---

## Cenário 3 — Latência na fila SQS (eventos rastreabilidade)

| Campo            | Valor                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| Hipótese         | Atraso de 5 min no processamento de `LoteColhido` não bloqueia operações síncronas (cultivo continua salvando) |
| Falha injetada   | Pausa do consumer worker (`aws ecs update-service --desired-count 0` no worker) |
| Métrica          | `ApproximateAgeOfOldestMessage` na fila + latência `/cultivo` síncrono  |
| Critério sucesso | API síncrona p95 inalterada; ao religar worker, drenagem em < 2min      |
| Critério falha   | Mensagens vão para DLQ OU operação síncrona degrada                     |
| Mitigação        | Aumentar `visibility_timeout` e validar `maxReceiveCount = 5`           |
| Plano de rollback| `update-service --desired-count 1`                                       |

---

## Pós-experimento

Cada game-day fecha com:
1. **Relatório** em `docs-extra/chaos-reports/YYYY-MM-DD-<cenário>.md` — hipótese vs realidade, métricas observadas, surpresas
2. **Issues** abertas para violações de critério de sucesso
3. **ADR** se decisão arquitetural muda
