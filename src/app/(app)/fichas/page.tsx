import { prisma } from '@/lib/prisma'
import { FichasClient } from './FichasClient'

export default async function FichasPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const inscricoes = await prisma.inscricao.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: {
        include: {
          vinculos_anjo_como_encontrista: {
            include: { anjo: true },
          },
        },
      },
      ficha_respostas: true,
      contatos_emergencia: true,
    },
    orderBy: { codigo: 'asc' },
  })

  const fichas = inscricoes.map((i) => {
    let alergias = null
    let medicamentos = null
    let restricoes = null

    if (i.ficha_respostas?.respostas) {
      try {
        const parsed = JSON.parse(i.ficha_respostas.respostas)
        alergias = parsed.alergia || null
        medicamentos = parsed.medicacao || null
        restricoes = parsed.restricao_alimentar || null
      } catch {}
    }

    const contato = i.contatos_emergencia[0]
    const anjo = i.pessoa.vinculos_anjo_como_encontrista[0]?.anjo

    return {
      id: i.id,
      codigo: i.codigo,
      nome_completo: i.pessoa.nome_completo,
      nome_preferido: i.pessoa.nome_preferido,
      status: i.ficha_status,
      alergias,
      medicamentos,
      restricoes,
      contato_emergencia: contato
        ? {
            nome: contato.nome,
            telefone: contato.telefone,
            parentesco: contato.parentesco,
          }
        : null,
      anjo_nome: anjo?.nome_completo || null,
    }
  })

  return <FichasClient fichas={fichas} />
}
