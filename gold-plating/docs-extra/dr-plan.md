# Disaster Recovery Plan — CannaSYS

## Objetivos por serviço

| Serviço                   | RTO          | RPO        | Estratégia                                |
| ------------------------- | ------------ | ---------- | ----------------------------------------- |
| API Express (ECS)         | 30 min       | 0          | Stateless — re-deploy de imagem ECR        |
| Postgres (dados clínicos) | 1 hora       | 1 min      | RDS Multi-AZ + PITR 7 dias + snapshot diário cross-region |
| S3 docs (laudos)          | 4 horas      | 24 h       | Replicação cross-region (CRR)              |
| SPA estática (S3+CF)      | 15 min       | 0          | Re-deploy `pnpm build && aws s3 sync`     |
| SQS                       | 0 (efêmero)  | até 14 dias| DLQ retém 14 dias                          |
| Configurações (Parameter Store) | 30 min | 0          | Versionado no Git                          |

## Cenários cobertos

### 1. Falha de instância única (ECS task / RDS primary)
- **Detecção**: alarms `ecs-running-low` / RDS event
- **Resposta**: automática (ECS auto-heal; RDS Multi-AZ failover ~60–120s)
- **RTO**: < 5 min
- **Ação humana**: monitorar; pós-mortem se sustentar > 5 min

### 2. Falha de AZ completa
- **Detecção**: alarms múltiplos; AWS Health Dashboard
- **Resposta**: ALB roteia para tasks na AZ saudável; RDS standby promovido
- **RTO**: 5–15 min
- **Ação humana**: validar carga; aumentar `desired_count` se necessário

### 3. Falha regional (sa-east-1 indisponível)
- **Detecção**: AWS Health Dashboard
- **Resposta**: manual — promover snapshot RDS em us-east-1; deploy de ECS em região DR pré-configurada (Terraform workspace `dr`)
- **RTO**: 4 horas (com runbook executado)
- **RPO**: 1 hora (snapshot diário cross-region)
- **Ação humana**: declarar incidente sev1; seguir [runbook regional](#procedimento-regional)

### 4. Corrupção lógica de dados (DELETE acidental, bug que apaga registros)
- **Detecção**: relato de usuário; alarm em queda anômala de COUNT
- **Resposta**: restaurar PITR para instante imediatamente anterior à corrupção; reconciliar
- **RTO**: 1 hora
- **RPO**: até 5 min de perda recuperável via auditoria + reaplicação manual
- **Ação humana**: congelar writes na tabela afetada, restaurar para instância nova, comparar, swap

### 5. Compromisso de credencial
- **Detecção**: GuardDuty, CloudTrail
- **Resposta**: rotar segredo via Secrets Manager; revogar JWT existentes; auditoria
- **RTO**: 30 min para conter; 4 horas para auditoria completa
- **Ação humana**: notificar DPO (LGPD art. 48 — comunicação à ANPD em casos qualificáveis)

## Procedimento regional (cenário 3)

1. Declarar incidente sev1, ativar war-room
2. Confirmar indisponibilidade via AWS Health
3. `cd gold-plating/terraform && terraform workspace select dr-us-east-1`
4. Restaurar snapshot RDS mais recente: `aws rds restore-db-instance-from-db-snapshot --region us-east-1 ...`
5. Atualizar registros Route 53 para apontar ALB da região DR
6. Validar logins, leituras, escritas
7. Comunicar usuários (banner + e-mail SES)

## Testes obrigatórios

| Cenário              | Cadência       | Responsável         |
| -------------------- | -------------- | ------------------- |
| Failover Multi-AZ    | Trimestral     | SRE on-call         |
| Restore PITR         | Trimestral     | DBA                 |
| Restore cross-region | Semestral      | SRE + Backend lead  |
| Rotação de segredo   | Trimestral     | Security            |

Cada teste fecha com relatório em `docs-extra/dr-reports/YYYY-MM-DD-<cenário>.md`.

## Comunicação durante incidente

Template para `#cannasys-incidents` e e-mail SES a usuários:

> [STATUS] CannaSYS — [titulo curto]
> O sistema apresenta [sintoma]. Equipe técnica atuando. Próximo update em 30 min.
> Última atualização: [timestamp BRT]

## Referências

- Nygard, M. *Release It!*, 2ª ed., cap. 5 e 12
- AWS Well-Architected — Reliability Pillar
- ISO/IEC 25010:2011 §4.7 — Recuperabilidade
