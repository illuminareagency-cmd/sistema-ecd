import { prisma } from '@/lib/prisma'
import { CheckinClient } from './CheckinClient'

export default async function CheckinPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const inscricoes = await prisma.inscricao.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            include: { cama: { include: { quarto: true } } },
          },
          vinculos_anjo_como_encontrista: {
            include: { anjo: true },
          },
        },
      },
    },
    orderBy: { codigo: 'asc' },
  })

  const formattedInscricoes = inscricoes.map((i) => {
    const alocacao = i.pessoa.alocacoes_cama[0]
    const anjoVinculo = i.pessoa.vinculos_anjo_como_encontrista[0]
    return {
      id: i.id,
      codigo: i.codigo,
      nome_completo: i.pessoa.nome_completo,
      nome_preferido: i.pessoa.nome_preferido,
      ficha_status: i.ficha_status,
      checkin_em: i.checkin_em ? i.checkin_em.toISOString() : null,
      quarto: alocacao?.cama?.quarto?.nome || 'Não alocado',
      cama: alocacao?.cama?.codigo || '',
      anjo: anjoVinculo?.anjo?.nome_completo || 'Sem anjo',
    }
  })

  return <CheckinClient initialInscricoes={formattedInscricoes} />
}
