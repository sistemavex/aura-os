import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user
    ? await prisma.profile.findUnique({ where: { userId: user.id } })
    : null;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [revenueTodayAgg, appointmentsToday, newClientsToday, totalServices] = await Promise.all([
    prisma.financialRecord.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME", date: { gte: startOfDay, lte: endOfDay } },
    }),
    prisma.appointment.count({
      where: { startTime: { gte: startOfDay, lte: endOfDay } },
    }),
    prisma.client.count({
      where: { createdAt: { gte: startOfDay, lte: endOfDay } },
    }),
    prisma.service.count({ where: { active: true } }),
  ]);

  const revenueToday = Number(revenueTodayAgg._sum.amount ?? 0);

  return (
    <AppShell title="Dashboard" subtitle="Visão geral do dia" userName={profile?.name ?? "AURA"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Faturamento hoje</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(revenueToday)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Agendamentos hoje</CardDescription>
            <CardTitle className="text-2xl">{appointmentsToday}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Clientes novos hoje</CardDescription>
            <CardTitle className="text-2xl">{newClientsToday}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Serviços ativos</CardDescription>
            <CardTitle className="text-2xl">{totalServices}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Conectado ao banco real via Prisma.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Dados reais — Fase 1 em andamento</Badge>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
