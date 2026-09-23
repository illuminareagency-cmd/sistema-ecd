import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Mail, CheckCircle2, Heart, Shield, FileText, Bus, Car, HelpCircle, HeartHandshake } from 'lucide-react'
import { formatarData } from '@/lib/utils'

export default async function RelatorioResumoPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const [inscricoes, cartas, servos, anjos, fichasAconselhamento] = await Promise.all([
    prisma.inscricao.findMany({
      where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
      include: { pessoa: true, cartas: true },
    }),
    prisma.carta.count({
      where: {
        inscricao: { encontro_id: encontroAtual ? encontroAtual.id : undefined },
        status: { in: ['aprovada', 'impressa', 'entregue'] },
      },
    }),
    prisma.participacaoServo.count({
      where: {
        encontro_id: encontroAtual ? encontroAtual.id : undefined,
        status: 'confirmado',
      },
    }),
    prisma.participacaoServo.count({
      where: {
        encontro_id: encontroAtual ? encontroAtual.id : undefined,
        eh_anjo: true,
      },
    }),
    prisma.fichaAconselhamento.count({
      where: {
        encontro_id: encontroAtual ? encontroAtual.id : undefined,
      },
    }),
  ])

  const total = inscricoes.length
  const fichasConcluidas = inscricoes.filter((i: any) => i.ficha_status === 'concluida').length
  const checkinsFeitos = inscricoes.filter((i: any) => i.checkin_em !== null).length
  const naMetaCartas = inscricoes.filter((i: any) => i.cartas.length >= 3).length

  // Distribuição por Meio de Transporte
  const transporteMap: Record<string, number> = {
    'Ônibus Oficial (Get Church)': 0,
    'Carro Próprio / Carona Solidária': 0,
  }

  inscricoes.forEach((i: any) => {
    if (i.veiculo_id) transporteMap['Ônibus Oficial (Get Church)']++
    else transporteMap['Carro Próprio / Carona Solidária']++
  })

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Resumo Geral do Encontro</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          {encontroAtual?.nome} &bull; Consolidação de métricas e status operacional
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Encontristas</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-texto">{total}</div>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Servos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-cobre">{servos}</div>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Anjos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-salvia">{anjos}</div>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Cartas Aprovadas</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-ambar">{cartas}</div>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-ceu">
              {total > 0 ? Math.round((checkinsFeitos / total) * 100) : 0}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-xs text-texto-3 uppercase">Aconselhamentos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-terracota">
              {fichasAconselhamento}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Transporte e Logística */}
        <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
          <h2 className="text-xl font-jost font-semibold text-texto flex items-center gap-2">
            <Bus className="w-5 h-5 text-cobre" />
            Logística de Transporte dos Encontristas
          </h2>

          <div className="space-y-4">
            {Object.entries(transporteMap).map(([modo, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={modo} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-texto">{modo}</span>
                    <span className="text-texto-3 tabular-nums font-mono text-xs">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-noite-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cobre rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-texto-3 pt-2 border-t border-linha">
            * Todas as caronas e o ônibus oficial partem da sede da Get Church Floripa às 19:00.
          </p>
        </div>

        {/* Funil de Engajamento e Cuidados */}
        <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
          <h2 className="text-xl font-jost font-semibold text-texto">
            Funil de Conclusão e Cuidados
          </h2>

          <div className="space-y-4 text-sm">
            <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha flex justify-between items-center">
              <div>
                <div className="font-medium text-texto">Inscrições Confirmadas</div>
                <div className="text-xs text-texto-3">Participantes com vaga garantida</div>
              </div>
              <Badge variant="salvia">{total}</Badge>
            </div>

            <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha flex justify-between items-center">
              <div>
                <div className="font-medium text-texto">Fichas Preenchidas</div>
                <div className="text-xs text-texto-3">Saúde e dados de emergência informados</div>
              </div>
              <Badge variant={fichasConcluidas === total ? 'salvia' : 'ambar'}>
                {fichasConcluidas} / {total}
              </Badge>
            </div>

            <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha flex justify-between items-center">
              <div>
                <div className="font-medium text-texto">Na Meta de Cartas</div>
                <div className="text-xs text-texto-3">Pelo menos 3 cartas aprovadas</div>
              </div>
              <Badge variant={naMetaCartas === total ? 'salvia' : 'ambar'}>
                {naMetaCartas} / {total}
              </Badge>
            </div>

            <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha flex justify-between items-center">
              <div>
                <div className="font-medium text-texto">Check-in Realizado</div>
                <div className="text-xs text-texto-3">Chegaram ao local do encontro</div>
              </div>
              <Badge variant="salvia">{checkinsFeitos} / {total}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
