import { prisma } from '@/lib/prisma'
import { BuscaClient } from './BuscaClient'

export default async function BuscaPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar encontristas
  const inscricoes = await prisma.inscricao.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: { cama: { include: { quarto: true } } },
          },
        },
      },
    },
  })

  // Buscar servos e pastores
  const participacoes = await prisma.participacaoServo.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: { cama: { include: { quarto: true } } },
          },
        },
      },
    },
  })

  const itensBusca = [
    ...inscricoes.map((i) => {
      const cama = i.pessoa.alocacoes_cama[0]?.cama
      return {
        id: `enc-${i.id}`,
        tipo: 'encontrista' as const,
        nome: i.pessoa.nome_completo,
        codigo: i.codigo,
        quarto: cama ? `${cama.quarto.nome} (${cama.codigo})` : undefined,
        telefone: i.pessoa.telefone,
        link: `/inscricoes/${i.id}`,
      }
    }),
    ...participacoes.map((p) => {
      const cama = p.pessoa.alocacoes_cama[0]?.cama
      return {
        id: `srv-${p.id}`,
        tipo: (p.pessoa.eh_pastor ? 'pastor' : 'servo') as 'pastor' | 'servo',
        nome: p.pessoa.nome_completo,
        quarto: cama ? `${cama.quarto.nome} (${cama.codigo})` : undefined,
        telefone: p.pessoa.telefone,
        link: '/servos',
      }
    }),
  ]

  return <BuscaClient itensIniciais={itensBusca} />
}
