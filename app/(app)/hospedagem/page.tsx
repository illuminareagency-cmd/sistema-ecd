import { prisma } from '@/lib/prisma'
import { HospedagemClient } from './HospedagemClient'

export default async function HospedagemPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar todos os quartos com suas camas e alocações do encontro atual
  const quartos = await prisma.quarto.findMany({
    orderBy: { nome: 'asc' },
    include: {
      camas: {
        include: {
          alocacoes: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: { pessoa: true },
          },
        },
        orderBy: { codigo: 'asc' },
      },
    },
  })

  // Buscar encontristas sem cama
  const inscricoes = await prisma.inscricao.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
          },
        },
      },
    },
  })

  const semCama = inscricoes
    .filter((i) => i.pessoa.alocacoes_cama.length === 0)
    .map((i) => ({
      id: i.id,
      nome: i.pessoa.nome_completo,
      codigo: i.codigo,
    }))

  const formattedQuartos = quartos.map((q) => {
    const totalOcupados = q.camas.filter((c) => c.alocacoes.length > 0).length
    const totalCapacidade = q.numerado ? q.camas.length : q.capacidade_livre || 0

    return {
      id: q.id,
      nome: q.nome,
      tipo: q.tipo,
      numerado: q.numerado,
      capacidade_livre: q.capacidade_livre,
      totalOcupados,
      totalCapacidade,
      camas: q.camas.map((c) => {
        const aloc = c.alocacoes[0]
        return {
          id: c.id,
          codigo: c.codigo,
          indice_par: c.indice_par,
          posicao: c.posicao,
          ocupante: aloc
            ? {
                nome: aloc.pessoa.nome_completo,
                papel: aloc.papel,
              }
            : null,
        }
      }),
    }
  })

  // Reordenação customizada conforme solicitado: Quarto 01, 02, 03, Superior, Casa
  const getOrderWeight = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('quarto 01') || n.includes('quarto 1')) return 1
    if (n.includes('quarto 02') || n.includes('quarto 2')) return 2
    if (n.includes('quarto 03') || n.includes('quarto 3')) return 3
    if (n.includes('superior')) return 4
    if (n.includes('casa')) return 5
    return 99
  }

  const sortedQuartos = formattedQuartos.sort((a, b) => getOrderWeight(a.nome) - getOrderWeight(b.nome))

  return <HospedagemClient quartos={sortedQuartos} semCama={semCama} />
}
