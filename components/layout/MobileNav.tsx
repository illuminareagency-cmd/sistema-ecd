"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Users, LayoutDashboard, Menu, Home, CheckSquare, FileText } from "lucide-react"
import { useNavigation } from './NavigationContext'
import { cn } from "@/lib/utils"

export function MobileNav({
  user,
  encontroAtual,
}: {
  user?: any
  encontroAtual?: any
}) {
  const pathname = usePathname()
  const { setDrawerOpen } = useNavigation()

  const quickNav = [
    { name: "Início", href: "/", icon: Home },
    { name: "Inscrições", href: "/inscricoes", icon: Users },
    { name: "Fichas", href: "/fichas", icon: FileText },
    { name: "Cronograma", href: "/cronograma", icon: CalendarDays },
  ]

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-noite-2 border-t border-linha px-3 safe-area-bottom pt-1.5 shadow-lg">
        <nav className="flex items-center justify-around h-14">
          {quickNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                  isActive ? "text-cobre" : "text-texto-3 hover:text-texto"
                )}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-cobre hover:text-cobre-claro transition-colors"
          >
            <Menu size={22} strokeWidth={2} />
            <span className="text-[10px] font-bold">Mais</span>
          </button>
        </nav>
      </div>

    </>
  )
}
