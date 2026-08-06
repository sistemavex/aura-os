import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

// TODO: substituir por dados reais assim que /api/dashboard/stats existir (Fase 1)
const mockStats = {
  revenueToday: 1240,
  appointmentsToday: 8,
  occupancyRate: 0.72,
  newClients: 3,
};

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Visão geral do dia" userName="AURA Beauté">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Faturamento hoje</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(mockStats.revenueToday)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Agendamentos hoje</CardDescription>
            <CardTitle className="text-2xl">{mockStats.appointmentsToday}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Taxa de ocupação</CardDescription>
            <CardTitle className="text-2xl">{Math.round(mockStats.occupancyRate * 100)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Clientes novos</CardDescription>
            <CardTitle className="text-2xl">{mockStats.newClients}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Este dashboard ainda usa dados mockados.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="warning">Aguardando conexão com o banco (Fase 1)</Badge>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
