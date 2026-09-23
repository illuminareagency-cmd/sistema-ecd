import { prisma } from '@/lib/prisma'
import { CronogramaClient } from './CronogramaClient'

export default async function CronogramaPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const atividades = await prisma.atividade.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      ministrador: true,
    },
    orderBy: [{ dia: 'asc' }, { ordem: 'asc' }],
  })

  const formattedAtividades = atividades.map((a) => ({
    id: a.id,
    dia: a.dia,
    ordem: a.ordem,
    titulo: a.titulo,
    tipo: a.tipo,
    inicio_planejado: a.inicio_planejado.toISOString(),
    duracao_planejada_min: a.duracao_planejada_min,
    inicio_real: a.inicio_real ? a.inicio_real.toISOString() : null,
    fim_real: a.fim_real ? a.fim_real.toISOString() : null,
    status: a.status,
    local: a.local,
    ministrador_nome: a.ministrador?.nome_completo || null,
    avisa_cozinha: a.avisa_cozinha,
    toca_chofar: a.toca_chofar,
  }))

  return (
    <CronogramaClient
      atividadesIniciais={formattedAtividades}
      encontroNome={encontroAtual?.nome || 'Encontro com Deus'}
    />
  )
}
