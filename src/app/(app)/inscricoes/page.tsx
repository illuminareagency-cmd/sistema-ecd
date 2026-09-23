import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Search } from 'lucide-react'

export default async function InscricoesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const query = params.q || ''

  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const inscricoes = await prisma.inscricao.findMany({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
      ...(query ? { pessoa: { nome_completo: { contains: query } } } : {}),
    },
    include: {
      pessoa: true,
      pagamentos: true,
      cartas: true,
    },
    orderBy: { codigo: 'asc' },
  })

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">
            Inscrições <span className="text-texto-3 text-xl">({inscricoes.length})</span>
          </h1>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">Lista completa de participantes confirmados</p>
        </div>
      </div>

      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-texto font-figtree text-sm">
            <thead className="bg-noite-3 border-b border-linha text-texto-3 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Cód / Nome</th>
                <th className="p-4">Ficha</th>
                <th className="p-4">Cartas</th>
                <th className="p-4">Check-in</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha/40">
              {inscricoes.map((inscricao) => {
                const iniciais = (inscricao.pessoa.nome_preferido || inscricao.pessoa.nome_completo)
                  .substring(0, 2)
                  .toUpperCase()
                return (
                  <tr key={inscricao.id} className="hover:bg-noite-3/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-noite-3 border border-linha flex items-center justify-center font-bold text-cobre text-xs shrink-0">
                        {iniciais}
                      </div>
                      <div>
                        <div className="font-medium text-texto">{inscricao.pessoa.nome_completo}</div>
                        <div className="text-xs text-texto-3 font-mono">#{inscricao.codigo}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={inscricao.ficha_status === 'concluida' ? 'salvia' : 'terracota'}
                        className="text-[11px]"
                      >
                        {inscricao.ficha_status === 'concluida' ? 'Concluída' : `Pendente (${inscricao.ficha_status})`}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold tabular-nums text-texto">
                        {inscricao.cartas.length}
                      </span>
                      <span className="text-xs text-texto-3 ml-1">cartas</span>
                    </td>
                    <td className="p-4">
                      {inscricao.checkin_em ? (
                        <span className="inline-flex items-center gap-1.5 text-salvia text-xs font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Feito
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-texto-3 text-xs">
                          <XCircle className="w-3.5 h-3.5" />
                          Não realizado
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/inscricoes/${inscricao.id}`}
                        className="text-cobre hover:text-cobre-claro text-xs font-semibold px-3 py-1.5 rounded-[8px] bg-cobre/10 hover:bg-cobre/20 transition-colors"
                      >
                        Detalhes &rarr;
                      </Link>
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
