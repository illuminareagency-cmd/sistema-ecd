import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Phone, CheckCircle2 } from 'lucide-react'

export default async function ServosPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const participacoes = await prisma.participacaoServo.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: { pessoa: true },
    orderBy: { pessoa: { nome_completo: 'asc' } },
  })

  const totalAnjos = participacoes.filter((p) => p.eh_anjo).length

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">
            Servos da Equipe <span className="text-texto-3 text-xl">({participacoes.length})</span>
          </h1>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">Escalação e distribuição dos voluntários por área</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="salvia" className="px-3 py-1">
            {totalAnjos} anjos
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            {participacoes.length} no total
          </Badge>
        </div>
      </div>

      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-texto text-sm">
            <thead className="bg-noite-3 border-b border-linha text-texto-3 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Departamento(s)</th>
                <th className="p-4">Transporte</th>
                <th className="p-4">Função / Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha/40">
              {participacoes.map((p) => {
                const iniciais = (p.pessoa.nome_preferido || p.pessoa.nome_completo)
                  .substring(0, 2)
                  .toUpperCase()
                return (
                  <tr key={p.id} className="hover:bg-noite-3/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-noite-3 border border-linha flex items-center justify-center font-bold text-cobre text-xs shrink-0">
                        {iniciais}
                      </div>
                      <div>
                        <div className="font-medium text-texto">{p.pessoa.nome_completo}</div>
                        {p.pessoa.telefone && (
                          <div className="text-xs text-texto-3 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            {p.pessoa.telefone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-texto-2">
                      <span className="text-sm">{p.departamentos || 'Geral'}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize text-[11px]">
                        {p.como_vai ? p.como_vai.replace('_', ' ') : 'Ônibus'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.eh_anjo && (
                          <Badge variant="salvia" className="text-[10px]">
                            Anjo
                          </Badge>
                        )}
                        {p.experiente && (
                          <Badge variant="default" className="text-[10px]">
                            Experiente
                          </Badge>
                        )}
                        {p.pessoa.eh_pastor && (
                          <Badge variant="ceu" className="text-[10px]">
                            Pastor
                          </Badge>
                        )}
                      </div>
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
