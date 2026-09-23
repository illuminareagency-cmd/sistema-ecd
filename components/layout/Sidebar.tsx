"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Users, CreditCard, FileText, Mail, MessageSquare, HeartHandshake, Component, Shield, MapPin, CheckSquare, Bus, Printer, CalendarDays, Headset, Clock, BarChart3, Settings, Sparkles } from 'lucide-react'

import { navigation } from '@/config/navigation'

export function Sidebar({
  user,
  encontroAtual,
  encontros = [],
}: {
  user: any
  encontroAtual: any
  encontros?: any[]
}) {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-noite-2 border-r border-linha overflow-y-auto pb-4">
      <div className="flex h-16 items-center px-5 border-b border-linha gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-ouro/50 shadow-sm bg-black flex items-center justify-center p-[1px] shrink-0">
          <img
            src="/brand/emblema-ecd.png"
            alt="Emblema Encontro com Deus"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-jost text-base font-semibold text-texto leading-none truncate">
            Encontro com Deus
          </span>
          <span className="text-[10px] text-cobre font-mono tracking-wider uppercase mt-1">
            Get Church Floripa
          </span>
        </div>
      </div>
      
      {encontroAtual && (
        <div className="px-4 py-3">
          <div className="bg-noite-3 rounded-[12px] p-3 border border-linha flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-texto truncate">{encontroAtual.nome}</span>
              <Badge
                variant={encontroAtual.status === 'em_andamento' ? 'salvia' : 'outline'}
                className="text-[9px] px-1.5 py-0 capitalize shrink-0"
              >
                {encontroAtual.status.replaceAll('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-[11px] text-texto-3">
              <span>
                {new Date(encontroAtual.data_inicio).toLocaleDateString('pt-BR')} -{' '}
                {new Date(encontroAtual.data_fim).toLocaleDateString('pt-BR')}
              </span>
              <span className="text-cobre font-mono text-[10px]">Edição Ativa</span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        {navigation.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.name !== 'Visão Geral' && (
              <h3 className="px-2 text-xs font-semibold text-texto-3 mb-2">{group.name}</h3>
            )}
            
            {(group.items || [group]).map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-[8px] transition-colors",
                    isActive
                      ? "bg-noite-3 text-cobre border-l-2 border-cobre"
                      : "text-texto-2 hover:bg-noite-3/50 hover:text-texto"
                  )}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {user && (
        <div className="mt-auto px-4 pt-4 border-t border-linha">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-texto truncate">{user.name}</span>
              <span className="text-xs text-texto-3 truncate">{user.role || 'Usuário'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
