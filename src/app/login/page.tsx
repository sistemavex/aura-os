import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary">AURA OS</CardTitle>
          <CardDescription>Entre com seu e-mail e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-muted">
                E-mail
              </label>
              <Input id="email" name="email" type="email" required autoFocus />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-muted">
                Senha
              </label>
              <Input id="password" name="password" type="password" required />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" className="mt-2 w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
