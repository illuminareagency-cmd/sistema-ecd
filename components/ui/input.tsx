import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[12px] border border-linha bg-noite-3 px-3 py-2 text-sm text-texto ring-offset-noite file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-texto-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobre focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
