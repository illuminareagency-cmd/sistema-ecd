import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[12px] text-sm font-medium font-figtree transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobre focus-visible:ring-offset-2 focus-visible:ring-offset-noite disabled:pointer-events-none disabled:opacity-50 min-h-[44px]',
  {
    variants: {
      variant: {
        default: 'bg-cobre text-noite hover:bg-cobre-claro font-semibold',
        secondary: 'bg-noite-3 text-texto border border-linha hover:bg-noite-2',
        outline: 'border border-linha text-texto-2 hover:bg-noite-3 hover:text-texto',
        ghost: 'text-texto-2 hover:bg-noite-3 hover:text-texto',
        destructive: 'bg-terracota/10 text-terracota border border-terracota/30 hover:bg-terracota/20',
        link: 'text-cobre underline-offset-4 hover:underline p-0 min-h-0 h-auto',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-3 text-xs rounded-[10px] min-h-[36px]',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 p-0 rounded-[10px] min-h-[40px]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
