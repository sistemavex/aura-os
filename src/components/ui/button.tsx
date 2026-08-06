import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "ghost" | "outline" | "destructive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-background hover:bg-primary-light",
  secondary: "bg-surface text-foreground hover:bg-white/10",
  ghost: "bg-transparent text-foreground hover:bg-white/5",
  outline: "bg-transparent border border-border text-foreground hover:bg-white/5",
  destructive: "bg-danger text-background hover:opacity-90",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
