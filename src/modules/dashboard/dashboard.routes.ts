import express from 'express';
import { Op, fn, col } from 'sequelize';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const dashboardRouter = express.Router();
dashboardRouter.use(authMiddleware);

const PENDENTE_STATUS = ['aguardando', 'em_analise', 'ajuste_solicitado'];

const ACTION_LABELS: { method: string; pattern: RegExp; label: (path: string) => string }[] = [
    { method: 'POST', pattern: /^\/api\/cultivo$/, label: () => 'Novo lote de cultivo cadastrado' },
    { method: 'POST', pattern: /^\/api\/producao$/, label: () => 'Nova produção de óleo registrada' },
    { method: 'POST', pattern: /^\/api\/interacao$/, label: () => 'Nova receita enviada para validação' },
    { method: 'PATCH', pattern: /^\/api\/interacao\/.+\/status$/, label: () => 'Status de receita atualizado' },
    { method: 'POST', pattern: /^\/api\/rh\/membros$/, label: () => 'Novo membro cadastrado no RH' },
    { method: 'PATCH', pattern: /^\/api\/cultivo\/.+\/etapa$/, label: () => 'Lote de cultivo mudou de etapa' },
];

const MODULE_LABELS: Record<string, string> = {
    associacao: 'Dados da associação',
    permissoes: 'Permissões',
    notificacoes: 'Notificações',
    integracoes: 'Integrações',
    rh: 'RH',
};

const ACTION_VERBS: Record<string, string> = {
    POST: 'atualizado (criação)',
    PUT: 'atualizado',
    PATCH: 'atualizado',
    DELETE: 'removido',
};

function describeLog(method: string, path: string): string {
    const match = ACTION_LABELS.find((a) => a.method === method && a.pattern.test(path));
    if (match) return match.label(path);

    const moduleName = path.split('/')[2];
    const label = MODULE_LABELS[moduleName];
    if (label) return `${label} ${ACTION_VERBS[method] ?? 'modificado'}`;
    return null as unknown as string;
}

dashboardRouter.get('/summary', async (_req, res, next) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const [
            pacientesAtivos,
            novasReceitasMes,
            receitasPendentes,
            estoqueOleo,
            dispensacoesMes,
            lotesAtivos,
            atividades,
        ] = await Promise.all([
            DB.Receitas.count({ distinct: true, col: 'paciente_nome' }),
            DB.Receitas.count({ where: { created_at: { [Op.gte]: startOfMonth } } }),
            DB.Receitas.count({ where: { status: { [Op.in]: PENDENTE_STATUS } } }),
            DB.Frascos.sum('volume_ml', { where: { status: { [Op.in]: ['disponivel', 'reservado'] } } }),
            DB.Frascos.count({ where: { status: 'dispensado', updated_at: { [Op.gte]: startOfMonth } } }),
            DB.CultivoLotes.count({ where: { etapa: { [Op.ne]: 'concluido' } } }),
            DB.AuditLogs.findAll({
                where: {
                    method: { [Op.in]: ['POST', 'PATCH', 'PUT', 'DELETE'] },
                    path: { [Op.notLike]: '/api/auth%' },
                    status_code: { [Op.lt]: 400 },
                },
                order: [['created_at', 'DESC']],
                limit: 20,
            }),
        ]);

        const pacientesPorMes = await DB.Receitas.findAll({
            attributes: [
                [fn('to_char', col('created_at'), 'YYYY-MM'), 'mes'],
                [fn('count', fn('distinct', col('paciente_nome'))), 'total'],
            ],
            group: ['mes'],
            order: [[col('mes'), 'ASC']],
            raw: true,
        });

        res.status(200).json({
            data: {
                pacientes_ativos: pacientesAtivos,
                novas_adesoes: novasReceitasMes,
                receitas_pendentes: receitasPendentes,
                estoque_oleo_ml: estoqueOleo ?? 0,
                dispensacoes_mes: dispensacoesMes,
                lotes_ativos: lotesAtivos,
                evolucao_pacientes: pacientesPorMes,
                atividades: atividades
                    .map((a: any) => ({ quando: a.created_at, acao: describeLog(a.method, a.path) }))
                    .filter((a: any) => a.acao)
                    .slice(0, 5),
            },
        });
    } catch (e) { next(e); }
});

export default dashboardRouter;
