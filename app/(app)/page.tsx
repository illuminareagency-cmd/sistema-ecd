import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Users, FileText, Component, Mail, CheckSquare, AlertTriangle, ArrowRight, DollarSign, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { formatarData, formatarMoeda } from '@/lib/utils'

export default async function DashboardPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  if (!encontroAtual) {
    return (
      <div className="p-8 text-center text-texto-2">
        Nenhum encontro ativo no momento. Acesse Configurações para criar um encontro.
      </div>
    )
  }

  const [total, fichasPreenchidas, noGrupo, checkinFeito, pagamentos, pendenciasFicha, cartas, servos, anjos] = await Promise.all([
    prisma.inscricao.count({ where: { encontro_id: encontroAtual.id } }),
    prisma.inscricao.count({ where: { encontro_id: encontroAtual.id, ficha_status: 'concluida' } }),
    prisma.inscricao.count({ where: { encontro_id: encontroAtual.id, entrou_no_grupo: true } }),
    prisma.inscricao.count({ where: { encontro_id: encontroAtual.id, checkin_em: { not: null } } }),
    prisma.pagamento.aggregate({ where: { inscricao: { encontro_id: encontroAtual.id } }, _sum: { valor: true } }),
    prisma.inscricao.findMany({
      where: { encontro_id: encontroAtual.id, ficha_status: { not: 'concluida' } },
      include: { pessoa: true },
      take: 5,
    }),
    prisma.carta.count({
      where: { inscricao: { encontro_id: encontroAtual.id }, status: { in: ['aprovada', 'impressa', 'entregue'] } },
    }),
    prisma.participacaoServo.count({
      where: { encontro_id: encontroAtual.id, status: 'confirmado' },
    }),
    prisma.participacaoServo.count({
      where: { encontro_id: encontroAtual.id, eh_anjo: true },
    }),
  ])

  const naMetaCartas = 0 // Simplificado para evitar query excessiva no dashboard
  const totalArrecadado = pagamentos._sum.valor || 0
  const totalPrevisto = total * (encontroAtual.valor_inscricao || 0)
  const totalPendenciasFicha = total - fichasPreenchidas

  const cards = [
    { title: 'Confirmados', value: total, total: encontroAtual.capacidade, icon: Users, color: 'cobre' },
    { title: 'Ficha preenchida', value: fichasPreenchidas, total: total, icon: FileText, color: 'salvia' },
    { title: 'No grupo', value: noGrupo, total: total, icon: Component, color: 'ceu' },
    { title: 'Meta de cartas', value: naMetaCartas, total: total, icon: Mail, color: 'ambar' },
    { title: 'Check-in feito', value: checkinFeito, total: total, icon: CheckSquare, color: 'terracota' },
  ]

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-noite-3 to-noite border border-linha p-6 md:p-8 flex items-center shadow-lg">
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-cobre/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-salvia/5 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-1.5 items-center md:items-start text-center md:text-left w-full">
          <Badge variant="outline" className="w-fit text-[10px] text-cobre border-cobre/30 bg-cobre/5 mb-1 uppercase tracking-widest">
            {encontroAtual.status.replaceAll('_', ' ')}
          </Badge>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-jost font-semibold text-texto drop-shadow-sm">
            {(() => {
              const parts = encontroAtual.nome.split(/ [-—] /)
              if (parts.length > 1) {
                return (
                  <>
                    <span className="block md:inline">{parts[0]}</span>
                    <span className="hidden md:inline"> — </span>
                    <span className="block md:inline mt-0.5 md:mt-0">{parts[1]}</span>
                  </>
                )
              }
              return encontroAtual.nome
            })()}
          </h1>
          <p className="text-texto-2 text-sm flex items-center gap-2 mt-1 justify-center md:justify-start">
            <CalendarDays className="w-4 h-4 text-cobre" />
            {formatarData(encontroAtual.data_inicio)} até {formatarData(encontroAtual.data_fim)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const pct = card.total > 0 ? Math.round((card.value / card.total) * 100) : 0
          return (
            <Card key={idx} className="bg-noite-2 border-linha">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-texto-2">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-texto-3" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-jost font-semibold text-texto mb-2">{card.value}</div>
                <Progress value={pct} className="mb-1 h-1.5" />
                <p className="text-[10px] text-texto-3 text-right">{pct}% de {card.total}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-noite-2 border-linha">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-ambar" />
              Fichas Pendentes ({totalPendenciasFicha})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendenciasFicha.length === 0 ? (
              <p className="text-sm text-salvia">Todas as fichas foram preenchidas!</p>
            ) : (
              pendenciasFicha.map((insc) => (
                <Link
                  key={insc.id}
                  href={`/inscricoes/${insc.id}`}
                  className="flex items-center justify-between p-3 rounded-[12px] bg-noite-3 border border-linha hover:border-cobre/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="terracota">Ficha {insc.ficha_status}</Badge>
                    <span className="text-sm font-medium text-texto">{insc.pessoa.nome_completo}</span>
                    <span className="text-xs text-texto-3">Cód: {insc.codigo}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-texto-3" />
                </Link>
              ))
            )}
            {totalPendenciasFicha > 5 && (
              <Link href="/inscricoes?filtro=sem_ficha" className="text-xs text-cobre hover:underline block pt-2">
                Ver todas as fichas pendentes &rarr;
              </Link>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-noite-2 border-linha">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-salvia" />
                Financeiro
              </CardTitle>
              <CardDescription>Resumo de pagamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-jost font-semibold text-salvia mb-1">
                {formatarMoeda(totalArrecadado)}
              </div>
              <p className="text-xs text-texto-2 mb-4">
                de {formatarMoeda(totalPrevisto)} previstos ({total} confirmados)
              </p>
              <Progress
                value={totalPrevisto > 0 ? (totalArrecadado / totalPrevisto) * 100 : 0}
                className="h-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-noite-2 border-linha">
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-texto-2">Servos Confirmados</span>
                <span className="font-semibold text-texto">{servos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-texto-2">Anjos Alocados</span>
                <span className="font-semibold text-texto">{anjos}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
