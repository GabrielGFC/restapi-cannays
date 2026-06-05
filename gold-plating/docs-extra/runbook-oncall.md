# Runbook — On-call CannaSYS

Para cada alarm de [alarms.tf](../terraform/alarms.tf): ação imediata, comando shell, escalação, pós-incidente.

---

## 🚨 `cannasys-*-alb-5xx-rate` — 5xx > 1% por 5 min

**Causa provável**: erro de aplicação recente, esgotamento de conexões DB, dependência externa caída.

**Ação imediata (≤ 5 min):**

```bash
# 1. Ver erros recentes
aws logs tail /ecs/cannasys-prod-api --since 5m --follow | grep -E "ERROR|FATAL"

# 2. Status do serviço
aws ecs describe-services --cluster cannasys-prod-cluster --services cannasys-prod-api \
  --query 'services[0].{desired:desiredCount,running:runningCount,events:events[:3]}'

# 3. Verificar dependências
aws rds describe-db-instances --db-instance-identifier cannasys-prod-postgres \
  --query 'DBInstances[0].DBInstanceStatus'
```

**Comunicar:** canal `#cannasys-incidents` no Slack com `INCIDENT: 5xx high (sev2)`.

**Escalação:** se > 15 min sem causa identificada → on-call backend lead.

**Pós-incidente:** abrir post-mortem em `docs-extra/postmortems/`.

---

## 🚨 `cannasys-*-alb-latency-p99` — p99 > 1s por 10 min

**Causa provável**: query lenta, índice faltando, fila DB cheia, GC pause.

```bash
# 1. Top queries lentas (Performance Insights)
aws rds describe-db-instances --db-instance-identifier cannasys-prod-postgres \
  --query 'DBInstances[0].PerformanceInsightsEnabled'
# Abrir console RDS → Performance Insights → top SQL

# 2. CPU/memória ECS
aws cloudwatch get-metric-statistics --namespace AWS/ECS --metric-name CPUUtilization \
  --dimensions Name=ClusterName,Value=cannasys-prod-cluster Name=ServiceName,Value=cannasys-prod-api \
  --start-time $(date -u -d '15 min ago' +%FT%T) --end-time $(date -u +%FT%T) \
  --period 60 --statistics Average
```

**Mitigação:** se DB saturado → scale RDS instance class via Terraform. Se ECS → `desired_count++`.

---

## 🚨 `cannasys-*-rds-cpu-high` — CPU > 80% por 15 min

```bash
aws rds describe-db-log-files --db-instance-identifier cannasys-prod-postgres \
  --query 'DescribeDBLogFiles[?contains(LogFileName, `postgresql`)] | sort_by(@, &LastWritten)[-1]'
```

**Ação:** identificar query top via Performance Insights; aplicar índice; rate-limit endpoint culpado se for da SPA.

**Escalação:** lead de backend + DBA se sustentar > 30 min.

---

## 🚨 `cannasys-*-sqs-dlq-not-empty` — mensagens caíram na DLQ

**Causa**: worker falhou 5x em uma mensagem (provavelmente bug ou payload inválido).

```bash
aws sqs receive-message --queue-url $(terraform output -raw sqs_dlq_url) --max-number-of-messages 5 \
  --message-attribute-names All
```

**Ação:** inspecionar payload, abrir issue, decidir se reprocessa (move de volta) ou descarta.

```bash
# Reprocessar:
aws sqs send-message --queue-url $(terraform output -raw sqs_events_url) --message-body "$PAYLOAD"
aws sqs delete-message --queue-url $(terraform output -raw sqs_dlq_url) --receipt-handle "$RH"
```

---

## 🚨 `cannasys-*-ecs-running-low` — tasks rodando < 1

**Causa**: deploy falhou, healthcheck failing, OOM kill.

```bash
aws ecs describe-services --cluster cannasys-prod-cluster --services cannasys-prod-api \
  --query 'services[0].events[:10]'
```

**Ação:** se rollback de deploy recente resolve → executar; senão, escalar e abrir incidente sev1.

---

## 🚨 Budget `cannasys-*-monthly-budget` — 100% do orçamento

**Não é emergência**, mas demanda investigação em ≤ 24h.

```bash
aws ce get-cost-and-usage --time-period Start=$(date -d '7 days ago' +%F),End=$(date +%F) \
  --granularity DAILY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
```

**Ação:** verificar `cost-optimization.md`, aplicar estratégias correspondentes.

---

## Contatos

| Papel              | Slack             | Telefone (emergência sev1) |
| ------------------ | ----------------- | -------------------------- |
| On-call primary    | `#cannasys-oncall` | DEFINIR                    |
| Backend lead       | `@backend-lead`   | DEFINIR                    |
| DBA                | `@dba`            | DEFINIR                    |
| Gerente do produto | `@pm-cannasys`    | DEFINIR                    |
