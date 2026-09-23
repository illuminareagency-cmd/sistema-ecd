import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Mail,
  MessageSquare,
  HeartHandshake,
  Component,
  Shield,
  MapPin,
  CheckSquare,
  Bus,
  Printer,
  CalendarDays,
  Headset,
  Clock,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react'

export const navigation = [
  { name: 'Visão Geral', href: '/', icon: LayoutDashboard },
  {
    name: 'ENCONTRISTAS',
    items: [
      { name: 'Inscrições', href: '/inscricoes', icon: Users },
      { name: 'Financeiro', href: '/financeiro', icon: CreditCard },
      { name: 'Fichas', href: '/fichas', icon: FileText },
      { name: 'Cartas', href: '/cartas', icon: Mail },
      { name: 'Mensagens', href: '/mensagens', icon: MessageSquare },
    ],
  },
  {
    name: 'EQUIPE',
    items: [
      { name: 'Servos', href: '/servos', icon: HeartHandshake },
      { name: 'Departamentos', href: '/departamentos', icon: Component },
      { name: 'Anjos', href: '/anjos', icon: Shield },
      { name: 'Torre de Guerra', href: '/torre', icon: Shield },
      { name: 'Escala de Limpeza', href: '/limpeza', icon: Sparkles },
    ],
  },
  {
    name: 'LOGÍSTICA',
    items: [
      { name: 'Hospedagem', href: '/hospedagem', icon: MapPin },
      { name: 'Check-in', href: '/checkin', icon: CheckSquare },
      { name: 'Transporte', href: '/transporte', icon: Bus },
      { name: 'Impressos', href: '/impressos', icon: Printer },
    ],
  },
  {
    name: 'DURANTE',
    items: [
      { name: 'Cronograma', href: '/cronograma', icon: CalendarDays },
      { name: 'Aconselhamentos', href: '/aconselhamentos', icon: Headset },
    ],
  },
  {
    name: 'RELATÓRIOS',
    items: [
      { name: 'Pontualidade', href: '/relatorios/pontualidade', icon: Clock },
      { name: 'Resumo', href: '/relatorios/resumo', icon: BarChart3 },
    ],
  },
  {
    name: 'SISTEMA',
    items: [
      { name: 'Configurações', href: '/configuracoes', icon: Settings },
    ],
  },
]
