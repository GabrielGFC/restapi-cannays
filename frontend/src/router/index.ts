import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { public: true },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { public: true },
    },
    {
        path: '/',
        component: () => import('@/components/layout/AppShell.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/dashboard/DashboardView.vue'),
            },
            {
                path: 'cultivo',
                name: 'cultivo.list',
                component: () => import('@/views/cultivo/LotesListView.vue'),
            },
            {
                path: 'cultivo/novo',
                name: 'cultivo.new',
                component: () => import('@/views/cultivo/LoteFormView.vue'),
            },
            {
                path: 'cultivo/:id',
                name: 'cultivo.detail',
                component: () => import('@/views/cultivo/LoteDetailView.vue'),
            },
            {
                path: 'producao',
                name: 'producao.list',
                component: () => import('@/views/producao/ProducoesView.vue'),
            },
            {
                path: 'producao/nova',
                name: 'producao.new',
                component: () => import('@/views/producao/ProducaoFormView.vue'),
            },
            {
                path: 'producao/estoque',
                name: 'producao.estoque',
                component: () => import('@/views/producao/EstoqueOleoView.vue'),
            },
            {
                path: 'producao/rastreabilidade',
                name: 'producao.rastreabilidade',
                component: () => import('@/views/producao/RastreabilidadeView.vue'),
            },
            {
                path: 'interacao',
                name: 'interacao.fila',
                component: () => import('@/views/interacao/FilaValidacaoView.vue'),
            },
            {
                path: 'interacao/nova',
                name: 'interacao.new',
                component: () => import('@/views/interacao/ReceitaFormView.vue'),
            },
            {
                path: 'interacao/receita/:id',
                name: 'interacao.receita',
                component: () => import('@/views/interacao/RevisaoReceitaView.vue'),
            },
            {
                path: 'interacao/historico',
                name: 'interacao.historico',
                component: () => import('@/views/interacao/HistoricoView.vue'),
            },
            {
                path: 'rh',
                name: 'rh.list',
                component: () => import('@/views/rh/MembrosListView.vue'),
            },
            {
                path: 'rh/novo',
                name: 'rh.new',
                component: () => import('@/views/rh/MembroFormView.vue'),
            },
            {
                path: 'rh/:id',
                name: 'rh.detail',
                component: () => import('@/views/rh/MembroDetailView.vue'),
            },
            {
                path: 'configuracoes',
                name: 'configuracoes',
                component: () => import('@/views/configuracoes/ConfiguracoesView.vue'),
            },
            {
                path: 'configuracoes/associacao',
                name: 'configuracoes.associacao',
                component: () => import('@/views/configuracoes/AssociacaoView.vue'),
            },
            {
                path: 'configuracoes/usuarios',
                name: 'configuracoes.usuarios',
                component: () => import('@/views/configuracoes/UsuariosView.vue'),
            },
            {
                path: 'configuracoes/permissoes',
                name: 'configuracoes.permissoes',
                component: () => import('@/views/configuracoes/PermissoesView.vue'),
            },
            {
                path: 'configuracoes/notificacoes',
                name: 'configuracoes.notificacoes',
                component: () => import('@/views/configuracoes/NotificacoesView.vue'),
            },
            {
                path: 'configuracoes/integracoes',
                name: 'configuracoes.integracoes',
                component: () => import('@/views/configuracoes/IntegracoesView.vue'),
            },
            {
                path: 'configuracoes/auditoria',
                name: 'configuracoes.auditoria',
                component: () => import('@/views/configuracoes/LogsAuditoriaView.vue'),
            },
            {
                path: 'configuracoes/seguranca',
                name: 'configuracoes.seguranca',
                component: () => import('@/views/configuracoes/SegurancaView.vue'),
            },
        ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (!to.meta.public && !auth.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
    if (to.name === 'login' && auth.isAuthenticated) {
        return { name: 'dashboard' };
    }
});

export default router;
