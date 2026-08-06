// AURA OS — Seed
// Dados extraídos literalmente da seção 4 do documento AURA-OS-Prompt-Completo.md
// commissionRate e commissionPaymentPeriod das parceiras: fonte é o próprio documento (seção 4).

import { PrismaClient, ServiceCategory, Role, CommissionPeriod } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------- TENANT ----------
  const tenant = await prisma.tenant.upsert({
    where: { slug: "aura-beaute-001" },
    update: {},
    create: {
      name: "AURA Beauté",
      slug: "aura-beaute-001",
      plan: "standard",
      active: true,
    },
  });

  // ---------- SERVIÇOS ----------
  // duration em minutos, price em reais (Decimal aceita number/string)
  const services: {
    category: ServiceCategory;
    name: string;
    duration: number;
    price: number;
    color: string;
    isMaintenance?: boolean;
    maintenanceOf?: string;
    maintenanceDays?: number;
    isPackage?: boolean;
    packageSessions?: number;
    requiresAnamnesis?: boolean;
  }[] = [
    // Cílios — #D4A574
    { category: "cilios", name: "Aplicação de extensão de cílios", duration: 120, price: 280, color: "#D4A574" },
    { category: "cilios", name: "Combo Brow e Lash", duration: 150, price: 350, color: "#D4A574" },
    { category: "cilios", name: "Lash Lifting", duration: 60, price: 120, color: "#D4A574" },
    { category: "cilios", name: "Manutenção de cílios 20 dias", duration: 60, price: 140, color: "#D4A574", isMaintenance: true, maintenanceOf: "Aplicação de extensão de cílios", maintenanceDays: 20 },
    { category: "cilios", name: "Manutenção de cílios 30 dias", duration: 75, price: 160, color: "#D4A574", isMaintenance: true, maintenanceOf: "Aplicação de extensão de cílios", maintenanceDays: 30 },

    // Corporal — #7FB3D5
    { category: "corporal", name: "Cone Hindu", duration: 45, price: 80, color: "#7FB3D5" },
    { category: "corporal", name: "Massagem Drenagem Linfática", duration: 60, price: 150, color: "#7FB3D5" },
    { category: "corporal", name: "Massagem Modeladora", duration: 60, price: 150, color: "#7FB3D5" },
    { category: "corporal", name: "Massagem – Pacote 5 Sessões", duration: 60, price: 600, color: "#7FB3D5", isPackage: true, packageSessions: 5 },
    { category: "corporal", name: "Massagem Relaxante", duration: 60, price: 130, color: "#7FB3D5" },
    { category: "corporal", name: "Ventosaterapia", duration: 30, price: 90, color: "#7FB3D5" },

    // Pele — #A8D5BA
    { category: "pele", name: "Consulta Avaliativa com a Biomédica", duration: 30, price: 0, color: "#A8D5BA", requiresAnamnesis: true },
    { category: "pele", name: "Depilação a Laser", duration: 45, price: 120, color: "#A8D5BA", requiresAnamnesis: true },
    { category: "pele", name: "Dermaglow", duration: 60, price: 200, color: "#A8D5BA", requiresAnamnesis: true },
    { category: "pele", name: "Dermaplaning", duration: 45, price: 180, color: "#A8D5BA", requiresAnamnesis: true },
    { category: "pele", name: "Hidra Color 2 em 1", duration: 60, price: 150, color: "#A8D5BA" },
    { category: "pele", name: "Hidragloss", duration: 60, price: 140, color: "#A8D5BA" },
    { category: "pele", name: "Limpeza de Pele", duration: 75, price: 180, color: "#A8D5BA", requiresAnamnesis: true },

    // Sobrancelhas — #C9A0DC
    { category: "sobrancelhas", name: "Brow Lamination (com tintura)", duration: 45, price: 120, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Brow Lamination + Lash Lifting", duration: 90, price: 200, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Brow Lamination (sem tintura)", duration: 45, price: 100, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Design de Sobrancelhas", duration: 30, price: 50, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Design + Aplicação de Henna", duration: 45, price: 80, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Epilação de Buço", duration: 15, price: 25, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Protocolo de Crescimento – 1 Sessão", duration: 30, price: 90, color: "#C9A0DC" },
    { category: "sobrancelhas", name: "Protocolo de Crescimento – 3 Sessões + Sérum", duration: 30, price: 240, color: "#C9A0DC", isPackage: true, packageSessions: 3 },

    // Unhas — #F4B8A3
    { category: "unhas", name: "Aplicação de Unhas em Fibra de Vidro – Esmaltação Comum", duration: 90, price: 180, color: "#F4B8A3" },
    { category: "unhas", name: "Aplicação de Unhas em Fibra de Vidro – Esmaltação em Gel", duration: 105, price: 200, color: "#F4B8A3" },
    { category: "unhas", name: "Banho de Gel (Esmaltação Comum)", duration: 60, price: 80, color: "#F4B8A3" },
    { category: "unhas", name: "Banho de Gel (Esmaltação em Gel)", duration: 75, price: 100, color: "#F4B8A3" },
    { category: "unhas", name: "Blindagem", duration: 45, price: 70, color: "#F4B8A3" },
    { category: "unhas", name: "Esmaltação em Gel", duration: 45, price: 60, color: "#F4B8A3" },
    { category: "unhas", name: "Manicure", duration: 45, price: 40, color: "#F4B8A3" },
    { category: "unhas", name: "Manicure e Pedicure", duration: 75, price: 70, color: "#F4B8A3" },
    { category: "unhas", name: "Manutenção de Unhas – Esmaltação Comum (até 30 dias)", duration: 60, price: 100, color: "#F4B8A3", isMaintenance: true, maintenanceOf: "Aplicação de Unhas em Fibra de Vidro – Esmaltação Comum", maintenanceDays: 30 },
    { category: "unhas", name: "Manutenção de Unhas – Esmaltação em Gel (até 30 dias)", duration: 75, price: 120, color: "#F4B8A3", isMaintenance: true, maintenanceOf: "Aplicação de Unhas em Fibra de Vidro – Esmaltação em Gel", maintenanceDays: 30 },
    { category: "unhas", name: "Pedicure", duration: 45, price: 45, color: "#F4B8A3" },
    { category: "unhas", name: "Reposição de Unha Quebrada", duration: 30, price: 30, color: "#F4B8A3" },
    { category: "unhas", name: "Spa dos Pés", duration: 45, price: 85, color: "#F4B8A3" },
  ];

  // conta: 5 cílios + 6 corporal + 7 pele + 8 sobrancelhas + 13 unhas = 39 ✔️ bate com o documento
  const createdServices: Record<string, string> = {};
  for (const s of services) {
    const created = await prisma.service.create({
      data: {
        tenantId: tenant.id,
        category: s.category,
        name: s.name,
        duration: s.duration,
        price: s.price,
        color: s.color,
        isMaintenance: s.isMaintenance ?? false,
        maintenanceDays: s.maintenanceDays,
        isPackage: s.isPackage ?? false,
        packageSessions: s.packageSessions,
        requiresAnamnesis: s.requiresAnamnesis ?? false,
      },
    });
    createdServices[s.name] = created.id;
  }

  // Resolve maintenanceOf (nome -> id) numa segunda passada
  for (const s of services) {
    if (s.isMaintenance && s.maintenanceOf && createdServices[s.maintenanceOf]) {
      await prisma.service.updateMany({
        where: { tenantId: tenant.id, name: s.name },
        data: { maintenanceOf: createdServices[s.maintenanceOf] },
      });
    }
  }

  // ---------- PARCEIRAS ----------
  // ATENÇÃO: userId abaixo é um placeholder — precisa ser substituído pelo
  // id real do usuário no Supabase Auth depois que as contas forem criadas.
  const partners: {
    name: string;
    commissionRate: number;
    commissionPaymentPeriod: CommissionPeriod;
    specialtyCategories: ServiceCategory[];
    role: Role;
  }[] = [
    { name: "Juliana", commissionRate: 70, commissionPaymentPeriod: "biweekly", specialtyCategories: ["pele", "sobrancelhas"], role: "PROFESSIONAL" },
    { name: "Fernanda", commissionRate: 85, commissionPaymentPeriod: "weekly", specialtyCategories: ["cilios"], role: "PROFESSIONAL" },
    { name: "Amanda", commissionRate: 75, commissionPaymentPeriod: "monthly", specialtyCategories: ["unhas"], role: "PROFESSIONAL" },
    { name: "Larissa", commissionRate: 70, commissionPaymentPeriod: "monthly", specialtyCategories: ["corporal"], role: "PROFESSIONAL" },
  ];

  for (const p of partners) {
    const specialtyIds = services
      .filter((s) => p.specialtyCategories.includes(s.category))
      .map((s) => createdServices[s.name]);

    await prisma.profile.create({
      data: {
        tenantId: tenant.id,
        userId: `PLACEHOLDER_${p.name.toUpperCase()}`, // substituir pelo id real do Supabase Auth
        name: p.name,
        email: `${p.name.toLowerCase()}@aurabeaute.com`, // placeholder — confirmar email real
        role: p.role,
        commissionRate: p.commissionRate,
        commissionPaymentPeriod: p.commissionPaymentPeriod,
        specialties: specialtyIds,
      },
    });
  }

  console.log(`Seed concluído: 1 tenant, ${services.length} serviços, ${partners.length} parceiras.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
