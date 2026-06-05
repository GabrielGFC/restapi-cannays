# Cloudflare Tunnel (TryCloudflare) — CannaSYS

Expõe backend (`:3000`) e frontend (`:5173`) via dois quick tunnels descartáveis. Sem domínio, sem login Cloudflare.

## Pré-requisitos

- Docker Desktop rodando (Windows/macOS/Linux)
- Backend rodando em `:3000` (`npm run dev` na raiz)
- Frontend rodando em `:5173` (`pnpm dev` em `frontend/`) — `vite.config.ts` já está com `host: true` e `allowedHosts: ['.trycloudflare.com']`

## Subir os túneis

```bash
docker compose -f docker-compose.cloudflared.yml up -d
```

## Pegar as URLs geradas

Quick tunnels geram URLs aleatórias tipo `https://<random>.trycloudflare.com`. As URLs aparecem nos logs:

```bash
docker logs cannasys-tunnel-api    | findstr trycloudflare.com
docker logs cannasys-tunnel-frontend | findstr trycloudflare.com
```

(em bash/macOS/Linux trocar `findstr` por `grep`.)

Ou ver tudo:

```bash
docker compose -f docker-compose.cloudflared.yml logs -f
```

## Parar

```bash
docker compose -f docker-compose.cloudflared.yml down
```

## Limitações do TryCloudflare

- **URL muda a cada `up`** — não persiste. Se você reinicia, a URL antiga morre.
- **Sem subdomínio personalizado** — só `*.trycloudflare.com`.
- **Sem autenticação Zero Trust** — qualquer um com a URL acessa.
- **Sem SLA** — pensado para demo/teste, não produção.

## Quando migrar para named tunnel

Quando precisar de URL fixa, subdomínio próprio (`api.suaassoc.org`), Access policies ou métricas:

1. Domínio no Cloudflare (gratuito; trocar nameservers)
2. `cloudflared tunnel login`
3. `cloudflared tunnel create cannasys`
4. Criar `~/.cloudflared/config.yml` com `ingress` mapeando `api.dominio.com → :3000` e `app.dominio.com → :5173` (1 tunnel, vários hostnames)
5. `cloudflared tunnel route dns cannasys api.dominio.com` (e idem para `app`)
6. Trocar o `docker-compose.cloudflared.yml`:
   - 1 service só
   - Volume com `~/.cloudflared`
   - Command: `tunnel run cannasys`

Quando chegar essa hora, sinaliza que eu monto a versão named.

## Troubleshooting

| Sintoma                                   | Causa                          | Fix                                                  |
| ----------------------------------------- | ------------------------------ | ---------------------------------------------------- |
| `Blocked request. This host is not allowed` no Vite | URL trycloudflare não no allowlist | já incluso `.trycloudflare.com` no `vite.config.ts`  |
| Container sobe mas nada na URL            | Backend/Front não escutam em 0.0.0.0 | Backend Express já escuta tudo; Vite com `host: true` |
| `connection refused` no log do tunnel     | Porta no host não está aberta  | Subir `npm run dev` / `pnpm dev` antes do compose    |
| URL gerada não responde do celular        | Cache CF edge ~30s             | Aguardar e recarregar                                |
