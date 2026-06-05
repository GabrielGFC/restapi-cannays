import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Sprout, Mail, Lock } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cannasys_auth', 'true');
    navigate('/relatorios');
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] relative overflow-hidden flex items-center justify-center">
      {/* Formas decorativas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Roxo superior direito */}
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#4C1041] rounded-full opacity-80 blur-3xl" />

        {/* Verde médio superior esquerdo */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[550px] bg-[#75A38C] rounded-full opacity-70 blur-3xl" />

        {/* Verde escuro inferior esquerdo */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[650px] h-[600px] bg-[#0F3534] rounded-full opacity-80 blur-3xl" />

        {/* Azul petróleo inferior direito */}
        <div className="absolute bottom-[5%] right-[-5%] w-[700px] h-[600px] bg-[#026874] rounded-full opacity-70 blur-3xl" />

        {/* Verde médio superior centro */}
        <div className="absolute top-[-15%] left-[20%] w-[580px] h-[530px] bg-[#75A38C] rounded-full opacity-60 blur-3xl" />
      </div>

      {/* Logo no canto superior esquerdo */}
      <div className="absolute top-[50px] left-[80px] flex items-center gap-3 z-10">
        <div className="p-3 bg-primary rounded-xl shadow-lg">
          <Sprout className="size-10 text-white" />
        </div>
        <h1 className="text-[60px] font-bold text-primary leading-none tracking-wide">
          CANNASYS
        </h1>
      </div>

      {/* Card de Login */}
      <Card className="w-full max-w-[597px] bg-white rounded-[40px] shadow-2xl p-12 relative z-20 mx-4">
        <div className="space-y-8">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-[37px] font-bold text-primary mb-2">Bem vindo!</h2>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail className="size-6 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[77px] pl-14 pr-6 text-[21px] bg-[rgba(0,0,0,0.02)] border-0 rounded-xl shadow-md placeholder:text-[rgba(0,0,0,0.45)]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock className="size-6 text-gray-400" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[77px] pl-14 pr-6 text-[21px] bg-[rgba(0,0,0,0.02)] border-0 rounded-xl shadow-md placeholder:text-[rgba(0,0,0,0.45)]"
                required
              />
            </div>

            {/* Esqueci minha senha */}
            <div className="text-right">
              <a href="#" className="text-[21px] text-[rgba(0,0,0,0.45)] hover:text-primary transition-colors">
                Esqueci minha senha
              </a>
            </div>

            {/* Login com Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-[77px] text-[21px] bg-[#f7f7f7] border-0 rounded-[40px] shadow-md text-[rgba(0,0,0,0.45)] hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login com Google
            </Button>

            {/* Botão Entrar */}
            <Button
              type="submit"
              className="w-full h-[77px] text-[25px] bg-[#026874] hover:bg-[#025a64] text-white rounded-[40px] shadow-md font-medium transition-colors"
            >
              Entrar
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
