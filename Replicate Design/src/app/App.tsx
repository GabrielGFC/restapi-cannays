import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/relatorios/DashboardPage';
import { LotesListPage } from './pages/cultivo/LotesListPage';
import { LoteDetailPage } from './pages/cultivo/LoteDetailPage';
import { LoteFormPage } from './pages/cultivo/LoteFormPage';
import { ProducoesListPage } from './pages/producao/ProducoesListPage';
import { ProducaoDetailPage } from './pages/producao/ProducaoDetailPage';
import { EstoqueOleoPage } from './pages/producao/EstoqueOleoPage';
import { MembrosListPage } from './pages/rh/MembrosListPage';
import { MembroDetailPage } from './pages/rh/MembroDetailPage';
import { MembroFormPage } from './pages/rh/MembroFormPage';
import { FilaValidacaoPage } from './pages/interacao/FilaValidacaoPage';
import { ReceitaDetailPage } from './pages/interacao/ReceitaDetailPage';
import { HistoricoPage } from './pages/interacao/HistoricoPage';
import { ConfiguracoesPage } from './pages/configuracoes/ConfiguracoesPage';

// Componente para proteger rotas
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('cannasys_auth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppShell />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/relatorios" replace />} />

          {/* Redirect /home to dashboard */}
          <Route path="home" element={<Navigate to="/relatorios" replace />} />

          {/* Relatórios */}
          <Route path="relatorios" element={<DashboardPage />} />

          {/* Cultivo */}
          <Route path="cultivo" element={<LotesListPage />} />
          <Route path="cultivo/novo" element={<LoteFormPage />} />
          <Route path="cultivo/:id" element={<LoteDetailPage />} />
          <Route path="cultivo/:id/editar" element={<LoteFormPage />} />

          {/* Produção */}
          <Route path="producao" element={<ProducoesListPage />} />
          <Route path="producao/estoque" element={<EstoqueOleoPage />} />
          <Route path="producao/:id" element={<ProducaoDetailPage />} />

          {/* Interação */}
          <Route path="interacao" element={<FilaValidacaoPage />} />
          <Route path="interacao/historico" element={<HistoricoPage />} />
          <Route path="interacao/:id" element={<ReceitaDetailPage />} />

          {/* RH */}
          <Route path="rh" element={<MembrosListPage />} />
          <Route path="rh/novo" element={<MembroFormPage />} />
          <Route path="rh/:id" element={<MembroDetailPage />} />
          <Route path="rh/:id/editar" element={<MembroFormPage />} />

          {/* Configurações */}
          <Route path="configuracoes" element={<ConfiguracoesPage />} />

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/relatorios" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}