import { Bell, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

interface TopBarProps {
  title: string;
  subtitle?: string;
  userName?: string;
}

export function TopBar({ title, subtitle, userName = "?" }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input placeholder="Buscar..." className="pl-9" />
        </div>

        <button
          aria-label="Notificações"
          className="rounded p-2 text-muted hover:bg-white/5 hover:text-foreground"
        >
          <Bell size={18} />
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
          {getInitials(userName)}
        </div>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Sair"
            className="rounded p-2 text-muted hover:bg-white/5 hover:text-danger"
          >
            <LogOut size={18} />
          </button>
        </form>
      </div>
    </header>
  );
}
