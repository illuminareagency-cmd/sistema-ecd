"use client"

import * as React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Search, Bell, LogOut, User as UserIcon, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useNavigation } from './NavigationContext'

export function Topbar({
  user,
  encontroAtual,
}: {
  user: any
  encontroAtual: any
}) {
  const { setDrawerOpen } = useNavigation()

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-linha bg-noite-2 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-3 self-stretch lg:gap-x-6">
          {/* Mobile Header com Emblema Real do ECD e Botão Menu */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 rounded-lg text-texto-2 hover:text-texto hover:bg-noite-3 transition-colors"
              title="Abrir navegação completa"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-ouro/50 shadow-sm bg-black flex items-center justify-center p-[1px] shrink-0">
                <img
                  src="/brand/emblema-ecd.png"
                  alt="Emblema Encontro com Deus"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-jost text-sm font-semibold text-texto leading-none">
                  Encontro com Deus
                </span>
                <span className="text-[9px] text-cobre font-mono tracking-wider uppercase mt-0.5">
                  Get Church Floripa
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-3">
            <h1 className="text-base font-semibold text-texto font-jost">
              {encontroAtual?.nome || 'Encontro com Deus'}
            </h1>
            <Badge variant="salvia" className="text-[10px] px-2 py-0.5">
              Edição Oficial
            </Badge>
          </div>

          {/* Ações da Direita */}
          <div className="flex items-center gap-x-3 lg:gap-x-5 ml-auto">
            <Link
              href="/busca"
              className="text-texto-2 hover:text-texto p-2 rounded-full hover:bg-noite-3 transition-colors"
              title="Buscar no sistema"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-linha" aria-hidden="true" />

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <Avatar className="h-8 w-8 ring-1 ring-linha">
                  <AvatarImage src={user?.image} alt={user?.name || ''} />
                  <AvatarFallback className="bg-cobre/20 text-cobre text-xs font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-noite-2 border-linha">
                <DropdownMenuLabel className="font-figtree">
                  <div className="font-medium text-texto">{user?.name}</div>
                  <div className="text-xs text-texto-3 font-normal">{user?.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-linha" />
                <DropdownMenuItem asChild>
                  <Link href="/configuracoes" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-linha" />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-terracota focus:text-terracota focus:bg-terracota/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

    </>
  )
}
