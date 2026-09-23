import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react'

export default async function CartasPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const inscricoes = await prisma.inscricao.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: true,
      cartas: true,
      indicacoes_carta: true,
    },
    orderBy: { codigo: 'asc' },
  })

  const metaMinima = encontroAtual?.meta_minima_cartas || 3
  const totalCartasGeral = inscricoes.reduce((sum, i) => sum + i.cartas.length, 0)
  const naMeta = inscricoes.filter((i) => i.cartas.length >= metaMinima).length
  const abaixoDaMeta = inscricoes.filter((i) => i.cartas.length < metaMinima).length
  const semNenhuma = inscricoes.filter((i) => i.cartas.length === 0).length

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Termômetro de Cartas</h1>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
            Meta mínima: <strong className="text-cobre">{metaMinima} cartas</strong> por encontrista
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="salvia" className="px-3 py-1 text-sm">
            {naMeta} na meta ({Math.round((naMeta / (inscricoes.length || 1)) * 100)}%)
          </Badge>
          <Badge variant="terracota" className="px-3 py-1 text-sm">
            {abaixoDaMeta} abaixo ({semNenhuma} zerados)
          </Badge>
          <Badge variant="default" className="px-3 py-1 text-sm">
            {totalCartasGeral} cartas totais
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inscricoes.map((insc) => {
          const count = insc.cartas.length
          const atingiuMeta = count >= metaMinima
          const zerado = count === 0

          let corBorda = 'border-salvia/40 hover:border-salvia'
          let corBg = 'bg-salvia/5'
          let corTexto = 'text-salvia'

          if (zerado) {
            corBorda = 'border-terracota/50 hover:border-terracota'
            corBg = 'bg-terracota/10'
            corTexto = 'text-terracota'
          } else if (!atingiuMeta) {
            corBorda = 'border-ambar/50 hover:border-ambar'
            corBg = 'bg-ambar/10'
            corTexto = 'text-ambar'
          }

          return (
            <Link
              href={`/inscricoes/${insc.id}`}
              key={insc.id}
              className={`block rounded-[16px] p-5 border ${corBorda} ${corBg} transition-all duration-200 hover:-translate-y-0.5 shadow-sm`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-noite-3 text-texto-2">
                  #{insc.codigo}
                </span>
                {atingiuMeta ? (
                  <CheckCircle2 className="w-4 h-4 text-salvia" />
                ) : (
                  <AlertCircle className={`w-4 h-4 ${zerado ? 'text-terracota' : 'text-ambar'}`} />
                )}
              </div>

              <div className="font-jost text-texto font-medium text-base truncate mb-1" title={insc.pessoa.nome_completo}>
                {insc.pessoa.nome_preferido || insc.pessoa.nome_completo}
              </div>
              <div className="text-xs text-texto-3 truncate mb-4">
                {insc.pessoa.nome_completo}
              </div>

              <div className="flex items-end justify-between border-t border-linha/40 pt-3">
                <div>
                  <span className={`text-2xl font-jost font-semibold tabular-nums ${corTexto}`}>
                    {count}
                  </span>
                  <span className="text-xs text-texto-3 ml-1">/ {metaMinima} mín</span>
                </div>
                <span className="text-xs text-texto-3">
                  {insc.indicacoes_carta.length} indicados
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
