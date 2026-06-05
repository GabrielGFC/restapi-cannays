import { Outlet } from 'react-router';
import { MainSidebar } from './MainSidebar';
import { Toaster } from '../ui/sonner';
import { SidebarProvider, SidebarInset } from '../ui/sidebar';

export function AppShell() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <MainSidebar />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-background p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
