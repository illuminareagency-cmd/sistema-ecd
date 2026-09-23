import { cn } from '@/lib/utils'

interface VineIconProps {
  className?: string
  size?: number
  animated?: boolean
}

export function VineIcon({ className, size = 24, animated = false }: VineIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animated && 'animate-vine-pulse', className)}
      aria-hidden="true"
    >
      {/* Tronco central entrelaçado */}
      <path d="M16 38 C16 38 10 28 10 18 C10 10 13 6 16 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 38 C16 38 22 28 22 18 C22 10 19 6 16 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Entrelaçamentos */}
      <path d="M12 26 C14 23 18 23 20 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 20 C14 17 18 18 20 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 14 C14.5 11 17.5 12 19 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Folhas */}
      <ellipse cx="7" cy="18" rx="3.5" ry="2" transform="rotate(-35 7 18)" fill="currentColor" opacity="0.85" />
      <ellipse cx="25" cy="18" rx="3.5" ry="2" transform="rotate(35 25 18)" fill="currentColor" opacity="0.85" />
      <ellipse cx="8" cy="24" rx="2.5" ry="1.5" transform="rotate(-20 8 24)" fill="currentColor" opacity="0.65" />
      <ellipse cx="24" cy="24" rx="2.5" ry="1.5" transform="rotate(20 24 24)" fill="currentColor" opacity="0.65" />
      <ellipse cx="9" cy="12" rx="2.5" ry="1.5" transform="rotate(-45 9 12)" fill="currentColor" opacity="0.55" />
      <ellipse cx="23" cy="12" rx="2.5" ry="1.5" transform="rotate(45 23 12)" fill="currentColor" opacity="0.55" />
      {/* Folha do topo */}
      <ellipse cx="16" cy="2" rx="2.5" ry="1.5" fill="currentColor" opacity="0.9" />
      <ellipse cx="12" cy="4" rx="2" ry="1.2" transform="rotate(-25 12 4)" fill="currentColor" opacity="0.7" />
      <ellipse cx="20" cy="4" rx="2" ry="1.2" transform="rotate(25 20 4)" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
