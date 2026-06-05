import { Link, useLocation, useNavigate } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '../ui/sidebar';
import { Sprout, Droplets, Users, Stethoscope, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const menuItems = [
  {
    title: 'Operações',
    items: [
      { title: 'Relatórios', href: '/relatorios', icon: BarChart3 },
      { title: 'Cultivo', href: '/cultivo', icon: Sprout },
      { title: 'Produção', href: '/producao', icon: Droplets },
      { title: 'Interação Médico', href: '/interacao', icon: Stethoscope },
      { title: 'Recursos Humanos', href: '/rh', icon: Users },
    ],
  },
  {
    title: 'Sistema',
    items: [{ title: 'Configurações', href: '/configuracoes', icon: Settings }],
  },
];

export function MainSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cannasys_auth');
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Sprout className="size-6 text-primary" />
          <span className="text-xl font-bold">CannaSYS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.href)}>
                    <Link to={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="size-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
