import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/module/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/module/dashboard/ui/components/dashboard-sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
export default layout;
