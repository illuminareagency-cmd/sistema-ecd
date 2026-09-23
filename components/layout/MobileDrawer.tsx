"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, LogOut } from "lucide-react"
import { navigation } from "@/config/navigation"
import { useNavigation } from "./NavigationContext"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { signOut } from "next-auth/react"

interface MobileDrawerProps {
  user?: any
  encontroAtual?: any
}

export function MobileDrawer({
  user,
  encontroAtual,
}: MobileDrawerProps) {
  const pathname = usePathname()
  const { drawerOpen, setDrawerOpen } = useNavigation()

  return (
    <DialogPrimitive.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-noite/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs bg-noite-2 border-r border-linha p-0 shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left duration-200">
          {/* Cabeçalho */}
          <div className="flex h-16 items-center justify-between px-5 border-b border-linha bg-noite-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-ouro/50 shadow-sm bg-black flex items-center justify-center p-[1px] shrink-0">
                <img
                  src="/brand/emblema-ecd.png"
                  alt="Emblema Encontro com Deus"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-jost text-base font-semibold text-texto leading-none">
                  Encontro com Deus
                </span>
                <span className="text-[10px] text-cobre font-mono tracking-wider uppercase mt-1">
                  Menu Completo
                </span>
              </div>
            </div>
            <DialogPrimitive.Close className="rounded-lg p-1.5 text-texto-2 hover:text-texto hover:bg-noite-3 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </DialogPrimitive.Close>
          </div>

          {/* Edição Atual */}
          {encontroAtual && (
            <div className="p-3 border-b border-linha/60 bg-noite-3/40">
              <div className="bg-noite-3 rounded-[12px] p-2.5 border border-linha flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-texto truncate">
                    {encontroAtual.nome}
                  </span>
                  <Badge
                    variant={
                      encontroAtual.status === "em_andamento"
                        ? "salvia"
                        : "outline"
                    }
                    className="text-[9px] px-1.5 py-0 capitalize"
                  >
                    {encontroAtual.status.replaceAll("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Links de Navegação */}
          <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
            {navigation.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {group.name !== "Visão Geral" && (
                  <h3 className="px-2 text-[11px] font-semibold text-texto-3 mb-1.5 uppercase tracking-wider">
                    {group.name}
                  </h3>
                )}

                {(group.items || [group]).map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (pathname.startsWith(item.href) && item.href !== "/")
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-[10px] transition-colors",
                        isActive
                          ? "bg-cobre/15 text-cobre font-medium border-l-2 border-cobre"
                          : "text-texto-2 hover:bg-noite-3 hover:text-texto"
                      )}
                    >
                      <item.icon size={18} strokeWidth={1.5} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Rodapé com Usuário e Logout */}
          <div className="p-3 border-t border-linha bg-noite-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-cobre/20 text-cobre flex items-center justify-center font-semibold text-xs shrink-0">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-texto truncate">
                  {user?.name || "Usuário"}
                </span>
                <span className="text-[10px] text-texto-3 truncate">
                  {user?.role || "Servidor"}
                </span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 rounded-lg text-terracota hover:bg-terracota/10 transition-colors"
              title="Sair do sistema"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
