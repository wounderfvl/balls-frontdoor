// FILE: src/components/ui/badge.tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        success: "bg-green-100 text-green-800 hover:bg-green-100/80",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        danger: "bg-red-100 text-red-800 hover:bg-red-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label?: string;
}

const Badge = ({
  className,
  variant,
  label,
  children,
  ...props
}: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {label || children}
    </div>
  );
};

export { Badge, badgeVariants };
