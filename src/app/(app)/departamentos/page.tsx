import { prisma } from '@/lib/prisma'
import { DepartamentosClient } from './DepartamentosClient'

export default async function DepartamentosPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const departamentos = await prisma.departamento.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    orderBy: { nome: 'asc' },
  })

  // Buscar todos os servos do encontro atual para calcular quantos estão em cada departamento
  const servos = await prisma.participacaoServo.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: { pessoa: true },
  })

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Departamentos e Guias Operacionais</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          {departamentos.length} departamentos estruturados com horários de chegada, regras de escala e guia operacional de conduta
        </p>
      </div>

      <DepartamentosClient departamentos={departamentos} servos={servos} />
    </div>
  )
}
