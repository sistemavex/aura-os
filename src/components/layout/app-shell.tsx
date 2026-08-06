import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";

interface AppShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  userName?: string;
}

export function AppShell({ children, title, subtitle, userName }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar title={title} subtitle={subtitle} userName={userName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
