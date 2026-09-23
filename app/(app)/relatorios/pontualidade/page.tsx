import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default async function RelatorioPontualidadePage() {
  // Buscar todas as ministrações concluídas com ministrador de todas as edições
  const atividades = await prisma.atividade.findMany({
    where: {
      tipo: 'ministracao',
      status: 'concluida',
      ministrador_id: { not: null },
      inicio_real: { not: null },
      fim_real: { not: null },
    },
    include: {
      ministrador: true,
      encontro: true,
    },
  })

  // Agrupar por ministrador
  const ministradoresMap: Record<
    string,
    {
      nome: string
      totalMinistracoes: number
      tempoPlanejadoTotal: number
      tempoRealTotal: number
      excessoTotalMin: number
    }
  > = {}

  atividades.forEach((a) => {
    if (!a.ministrador) return
    const id = a.ministrador.id
    if (!ministradoresMap[id]) {
      ministradoresMap[id] = {
        nome: a.ministrador.nome_completo,
        totalMinistracoes: 0,
        tempoPlanejadoTotal: 0,
        tempoRealTotal: 0,
        excessoTotalMin: 0,
      }
    }

    const item = ministradoresMap[id]
    item.totalMinistracoes += 1
    item.tempoPlanejadoTotal += a.duracao_planejada_min

    if (a.inicio_real && a.fim_real) {
      const duracaoReal = Math.round(
        (new Date(a.fim_real).getTime() - new Date(a.inicio_real).getTime()) / 60000
      )
      item.tempoRealTotal += duracaoReal
      const excesso = duracaoReal - a.duracao_planejada_min
      item.excessoTotalMin += excesso
    }
  })

  const relatorio = Object.values(ministradoresMap).sort(
    (a, b) => b.excessoTotalMin / (b.totalMinistracoes || 1) - a.excessoTotalMin / (a.totalMinistracoes || 1)
  )

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-cobre" />
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Relatório de Pontualidade</h1>
        </div>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Histórico comparativo de tempo planejado vs. real nas ministrações de todas as edições
        </p>
      </div>

      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="p-6 border-b border-linha">
          <h2 className="text-xl font-jost font-semibold text-texto">
            Pontualidade por Ministrador
          </h2>
          <p className="text-xs text-texto-3 mt-0.5">
            Dados agregados das ministrações concluídas
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-texto text-sm">
            <thead className="bg-noite-3 border-b border-linha text-texto-3 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Ministrador</th>
                <th className="p-4">Ministrações</th>
                <th className="p-4">Tempo Planejado</th>
                <th className="p-4">Tempo Real</th>
                <th className="p-4">Excesso Total</th>
                <th className="p-4">Média / Ministração</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha/40">
              {relatorio.map((r) => {
                const mediaExcesso = Math.round(r.excessoTotalMin / (r.totalMinistracoes || 1))
                const ehPontual = mediaExcesso <= 5

                return (
                  <tr key={r.nome} className="hover:bg-noite-3/40 transition-colors">
                    <td className="p-4 font-medium text-texto">{r.nome}</td>
                    <td className="p-4 tabular-nums">{r.totalMinistracoes}</td>
                    <td className="p-4 text-texto-3 tabular-nums">{r.tempoPlanejadoTotal} min</td>
                    <td className="p-4 text-texto-2 tabular-nums">{r.tempoRealTotal} min</td>
                    <td className="p-4">
                      <span
                        className={`font-semibold tabular-nums ${
                          r.excessoTotalMin > 15 ? 'text-terracota' : 'text-salvia'
                        }`}
                      >
                        {r.excessoTotalMin > 0 ? `+${r.excessoTotalMin}` : r.excessoTotalMin} min
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={ehPontual ? 'salvia' : 'terracota'}
                        className="tabular-nums"
                      >
                        {mediaExcesso > 0 ? `+${mediaExcesso} min` : `${mediaExcesso} min`}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
