import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarData(data: Date | string | null | undefined, fmt = 'dd/MM/yyyy') {
  if (!data) return ''
  try {
    return format(new Date(data), fmt, { locale: ptBR })
  } catch {
    return ''
  }
}

export function formatarHora(data: Date | string | null | undefined) {
  return formatarData(data, 'HH:mm')
}

export function formatarDataHora(data: Date | string | null | undefined) {
  return formatarData(data, "dd/MM 'às' HH:mm")
}

export function formatarMoeda(valor: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

export function gerarCodigo(num: number) {
  return String(num).padStart(3, '0')
}

export function tempoRelativo(data: Date | string) {
  try {
    return formatDistanceToNow(new Date(data), { locale: ptBR, addSuffix: true })
  } catch {
    return ''
  }
}

export function statusEncontroLabel(status: string) {
  const map: Record<string, string> = {
    planejamento: 'Planejamento',
    inscricoes_abertas: 'Inscrições abertas',
    em_andamento: 'Em andamento',
    encerrado: 'Encerrado',
  }
  return map[status] || status
}

export function statusEncontroColor(status: string) {
  const map: Record<string, string> = {
    planejamento: 'text-texto-2 bg-noite-3 border-linha',
    inscricoes_abertas: 'text-ceu bg-ceu/10 border-ceu/30',
    em_andamento: 'text-salvia bg-salvia/10 border-salvia/30',
    encerrado: 'text-texto-3 bg-noite-3/50 border-linha',
  }
  return map[status] || 'text-texto-2 bg-noite-3 border-linha'
}

export function fichaStatusLabel(status: string) {
  const map: Record<string, string> = {
    pendente: 'Pendente',
    enviada: 'Em andamento',
    concluida: 'Concluída',
  }
  return map[status] || status
}

export function fichaStatusColor(status: string): 'ambar' | 'salvia' | 'terracota' | 'muted' {
  const map: Record<string, 'ambar' | 'salvia' | 'terracota' | 'muted'> = {
    pendente: 'terracota',
    enviada: 'ambar',
    concluida: 'salvia',
  }
  return map[status] || 'muted'
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(' ')
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase()
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
}

export function nomePreferido(nome_completo: string, nome_preferido?: string | null) {
  return nome_preferido || nome_completo.split(' ')[0]
}
