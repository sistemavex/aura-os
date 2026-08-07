import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Cílios", color: "#D4A574" },
  { name: "Corporal", color: "#7FB3D5" },
  { name: "Pele", color: "#A8D5BA" },
  { name: "Sobrancelhas", color: "#C9A0DC" },
  { name: "Unhas", color: "#F4B8A3" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-primary">AURA</span> Beauté
        </span>
        <Link href="/login">
          <Button variant="outline">Entrar no sistema</Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Cuidado e beleza, com a técnica que você merece
        </h1>
        <p className="max-w-xl text-muted">
          Cílios, sobrancelhas, pele, corporal e unhas — tudo em um só lugar,
          com profissionais especializadas em cada procedimento.
        </p>
        <Link href="/login">
          <Button className="mt-2 px-6 py-3 text-base">Acessar área do sistema</Button>
        </Link>
      </section>

      {/* Categorias */}
      <section className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-6 pb-24 sm:grid-cols-5">
        {categories.map((c) => (
          <div
            key={c.name}
            className="flex flex-col items-center gap-2 rounded border border-border bg-surface p-4 text-center"
          >
            <span
              className="h-8 w-8 rounded-full"
              style={{ backgroundColor: c.color }}
              aria-hidden
            />
            <span className="text-sm text-foreground">{c.name}</span>
          </div>
        ))}
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} AURA Beauté
      </footer>
    </div>
  );
}
