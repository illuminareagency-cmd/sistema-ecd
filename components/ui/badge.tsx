import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-cobre text-noite hover:bg-cobre-claro",
        salvia: "border-transparent bg-salvia/20 text-salvia",
        ambar: "border-transparent bg-ambar/20 text-ambar",
        terracota: "border-transparent bg-terracota/20 text-terracota",
        ceu: "border-transparent bg-ceu/20 text-ceu",
        outline: "text-texto border-linha",
        muted: "border-transparent bg-noite-3 text-texto-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
